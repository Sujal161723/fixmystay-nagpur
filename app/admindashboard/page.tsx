"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { 
  collection, getDocs, orderBy, query, deleteDoc, doc, addDoc, updateDoc, serverTimestamp 
} from "firebase/firestore";
import { 
  MessageCircle, Phone, Trash2, Calendar, MapPin, Plus, Users, Home, X, 
  Search, LayoutGrid, Building2, Landmark, UserCheck, Edit3, ChevronRight, ArrowLeft
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties"); // properties, leads, owners, users
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [leads, setLeads] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "", price: "", area: "", landmark: "", category: "Flat", 
    description: "", imageUrl: "", phone: "91"
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const leadsSnap = await getDocs(query(collection(db, "leads"), orderBy("timestamp", "desc")));
      setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      const propsSnap = await getDocs(collection(db, "properties"));
      setProperties(propsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, "properties", editingId), formData);
      } else {
        await addDoc(collection(db, "properties"), { ...formData, createdAt: serverTimestamp() });
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({ title: "", price: "", area: "", landmark: "", category: "Flat", description: "", imageUrl: "", phone: "91" });
      fetchData();
    } catch (err) { console.error(err); }
  };

  const openEdit = (p: any) => {
    setFormData(p);
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  // Filtering Logic
  const filteredProperties = properties.filter(p => 
    (!selectedCategory || p.category === selectedCategory) &&
    (p.area.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      
      {/* --- SIDEBAR --- */}
      <div className="w-72 bg-slate-900 text-white p-8 hidden lg:block sticky top-0 h-screen border-r border-slate-800">
        <h1 className="text-2xl font-black italic tracking-tighter mb-12 text-blue-500">FIXMYSTAY <span className="text-[10px] not-italic text-slate-500 ml-1">PRO</span></h1>
        <nav className="space-y-3">
          <NavItem active={activeTab === "properties"} icon={<LayoutGrid size={20}/>} label="Inventory" onClick={() => {setActiveTab("properties"); setSelectedCategory(null);}} />
          <NavItem active={activeTab === "leads"} icon={<Users size={20}/>} label="Leads" onClick={() => setActiveTab("leads")} />
          <NavItem active={activeTab === "owners"} icon={<UserCheck size={20}/>} label="Owners" onClick={() => setActiveTab("owners")} />
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
              {activeTab} Management
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Nagpur Central Dashboard</p>
          </div>
          <button onClick={() => {setEditingId(null); setIsModalOpen(true);}} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-2xl">
            <Plus size={18}/> ADD LISTING
          </button>
        </div>

        {/* --- PROPERTIES VIEW --- */}
        {activeTab === "properties" && (
          <div className="space-y-8">
            {/* Category Selection */}
            {!selectedCategory ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {['Flat', 'PG', 'Plot', 'House'].map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col items-center group hover:border-blue-500 transition-all shadow-sm">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 mb-4 transition-colors">
                      {cat === 'Flat' && <Building2 size={32}/>}
                      {cat === 'Plot' && <Landmark size={32}/>}
                      {cat === 'PG' && <Users size={32}/>}
                      {cat === 'House' && <Home size={32}/>}
                    </div>
                    <span className="font-black italic text-lg">{cat}s</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                  <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 font-black text-xs text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowLeft size={16}/> BACK
                  </button>
                  <div className="flex items-center bg-slate-50 px-6 py-2 rounded-2xl flex-1 max-w-md mx-8">
                    <Search size={16} className="text-slate-400 mr-3"/>
                    <input placeholder={`Search Area in ${selectedCategory}s...`} className="bg-transparent border-none outline-none font-bold text-sm w-full" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
                  </div>
                  <span className="font-black text-xs text-blue-600 bg-blue-50 px-4 py-2 rounded-full italic">{selectedCategory} Section</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProperties.map((p) => {
                    const propertyLeads = leads.filter(l => l.propertyId === p.id);
                    return (
                      <div key={p.id} className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                        <div className="relative overflow-hidden rounded-[2rem] mb-6">
                          <img src={p.imageUrl} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black italic tracking-tighter">₹{p.price}/mo</div>
                        </div>
                        <h3 className="font-black text-xl text-slate-900 mb-2 truncate">{p.title}</h3>
                        <p className="text-slate-400 font-bold text-xs flex items-center gap-1 mb-6 italic"><MapPin size={14}/> {p.area}</p>
                        
                        {/* Lead Mapping - Kisne contact kiya */}
                        <div className="bg-slate-50 p-4 rounded-[1.5rem] mb-6 flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiries</span>
                          <div className="flex -space-x-3">
                            {propertyLeads.slice(0, 5).map((l, i) => (
                              <div key={i} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white ${l.action === 'WhatsApp' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                {l.action[0]}
                              </div>
                            ))}
                            {propertyLeads.length > 5 && <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-black">+{propertyLeads.length - 5}</div>}
                          </div>
                        </div>

                        <div className="flex gap-3 border-t pt-5">
                          <button onClick={() => openEdit(p)} className="flex-1 bg-slate-50 text-slate-900 py-3 rounded-xl font-black text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                            <Edit3 size={14}/> EDIT
                          </button>
                          <button onClick={async () => { if(confirm("Delete?")) { await deleteDoc(doc(db, "properties", p.id)); fetchData(); } }} className="bg-slate-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- LEADS TABLE --- */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <tr><th className="p-8">Property / Area</th><th className="p-8">Method</th><th className="p-8">Timestamp</th><th className="p-8">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50 font-bold text-sm">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/50 transition">
                    <td className="p-8"><p className="text-slate-900">{l.propertyTitle}</p><p className="text-[10px] text-slate-400 mt-1 italic">{l.area}</p></td>
                    <td className="p-8"><span className={`px-3 py-1.5 rounded-lg text-[9px] font-black tracking-widest ${l.action === 'WhatsApp' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{l.action}</span></td>
                    <td className="p-8 text-slate-400 text-xs">{l.timestamp?.toDate().toLocaleString()}</td>
                    <td className="p-8"><button onClick={async () => { await deleteDoc(doc(db, "leads", l.id)); fetchData(); }} className="text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={18}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-[3rem] p-12 shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition"><X size={24}/></button>
              <h2 className="text-3xl font-black italic tracking-tighter mb-10 uppercase">{editingId ? 'Edit Listing' : 'New Listing'}</h2>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Property Title" value={formData.title} onChange={(v)=>setFormData({...formData, title:v})} />
                <InputGroup label="Price (Monthly)" type="number" value={formData.price} onChange={(v)=>setFormData({...formData, price:v})} />
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</label>
                  <select className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border-none focus:ring-2 focus:ring-blue-500" value={formData.category} onChange={(e)=>setFormData({...formData, category:e.target.value})}>
                    {['Flat', 'PG', 'Plot', 'House'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <InputGroup label="Area Name" value={formData.area} onChange={(v)=>setFormData({...formData, area:v})} />
                <div className="md:col-span-2"><InputGroup label="Image URL" value={formData.imageUrl} onChange={(v)=>setFormData({...formData, imageUrl:v})} /></div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block">Full Description</label>
                  <textarea className="w-full bg-slate-50 p-6 rounded-3xl font-bold outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]" value={formData.description} onChange={(e)=>setFormData({...formData, description:e.target.value})} />
                </div>
                <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-6 rounded-3xl font-black tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
                  {editingId ? 'UPDATE CHANGES' : 'PUBLISH TO SITE'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ active, icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'}`}>
      {icon} {label}
    </button>
  );
}

function InputGroup({ label, type="text", value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</label>
      <input required type={type} className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border-none focus:ring-2 focus:ring-blue-500 transition-all" value={value} onChange={(e)=>onChange(e.target.value)} />
    </div>
  );
}