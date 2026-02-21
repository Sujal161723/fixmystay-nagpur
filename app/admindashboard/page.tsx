"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { 
  collection, getDocs, orderBy, query, deleteDoc, doc, addDoc, updateDoc, serverTimestamp 
} from "firebase/firestore";
import { 
  MessageCircle, Phone, Trash2, MapPin, Plus, Users, Home, X, 
  Search, LayoutGrid, Building2, Landmark, UserCheck, Edit3, ArrowLeft
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties"); 
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
    setFormData({
      title: p.title || "",
      price: p.price || "",
      area: p.area || "",
      landmark: p.landmark || "",
      category: p.category || "Flat",
      description: p.description || "",
      imageUrl: p.imageUrl || "",
      phone: p.phone || "91"
    });
    setEditingId(p.id);
    setIsModalOpen(true);
  };

  const filteredProperties = properties.filter(p => 
    (!selectedCategory || p.category === selectedCategory) &&
    (p.area?.toLowerCase().includes(searchQuery.toLowerCase()) || p.title?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <div className="w-72 bg-slate-900 text-white p-8 hidden lg:block sticky top-0 h-screen border-r border-slate-800">
        <h1 className="text-2xl font-black italic tracking-tighter mb-12 text-blue-500">FIXMYSTAY PRO</h1>
        <nav className="space-y-3">
          <NavItem active={activeTab === "properties"} icon={<LayoutGrid size={20}/>} label="Inventory" onClick={() => {setActiveTab("properties"); setSelectedCategory(null);}} />
          <NavItem active={activeTab === "leads"} icon={<Users size={20}/>} label="Leads" onClick={() => setActiveTab("leads")} />
          <NavItem active={activeTab === "owners"} icon={<UserCheck size={20}/>} label="Owners" onClick={() => setActiveTab("owners")} />
        </nav>
      </div>

      <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">{activeTab}</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Nagpur Central</p>
          </div>
          <button onClick={() => {setEditingId(null); setIsModalOpen(true);}} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-2xl">
            <Plus size={18}/> ADD LISTING
          </button>
        </div>

        {activeTab === "properties" && (
          <div className="space-y-8">
            {!selectedCategory ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {['Flat', 'PG', 'Plot', 'House'].map((cat) => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className="bg-white p-10 rounded-[3rem] border border-slate-100 flex flex-col items-center group hover:border-blue-500 transition shadow-sm">
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
                  <div className="flex items-center bg-slate-50 px-6 py-2 rounded-2xl flex-1 mx-8">
                    <Search size={16} className="text-slate-400 mr-3"/>
                    <input placeholder={`Search Area...`} className="bg-transparent border-none outline-none font-bold text-sm w-full" value={searchQuery} onChange={(e: any)=>setSearchQuery(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProperties.map((p) => (
                    <div key={p.id} className="bg-white rounded-[2.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
                      <img src={p.imageUrl} className="w-full h-52 object-cover rounded-[2rem] mb-6" alt="" />
                      <h3 className="font-black text-xl text-slate-900 truncate">{p.title}</h3>
                      <p className="text-slate-400 font-bold text-xs mb-6 italic"><MapPin size={14}/> {p.area}</p>
                      <div className="flex gap-3 border-t pt-5">
                        <button onClick={() => openEdit(p)} className="flex-1 bg-slate-50 text-slate-900 py-3 rounded-xl font-black text-[10px] tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                          <Edit3 size={14}/> EDIT
                        </button>
                        <button onClick={async () => { if(confirm("Delete?")) { await deleteDoc(doc(db, "properties", p.id)); fetchData(); } }} className="bg-slate-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-3xl rounded-[3rem] p-12 shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 text-slate-300 hover:text-slate-900 transition"><X size={24}/></button>
              <h2 className="text-3xl font-black italic mb-10 uppercase">{editingId ? 'Edit Listing' : 'New Listing'}</h2>
              <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="Property Title" value={formData.title} onChange={(v: any)=>setFormData({...formData, title:v})} />
                <InputGroup label="Price" type="number" value={formData.price} onChange={(v: any)=>setFormData({...formData, price:v})} />
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                  <select className="w-full bg-slate-50 p-5 rounded-2xl font-bold border-none outline-none" value={formData.category} onChange={(e: any)=>setFormData({...formData, category:e.target.value})}>
                    {['Flat', 'PG', 'Plot', 'House'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <InputGroup label="Area Name" value={formData.area} onChange={(v: any)=>setFormData({...formData, area:v})} />
                <div className="md:col-span-2"><InputGroup label="Image URL" value={formData.imageUrl} onChange={(v: any)=>setFormData({...formData, imageUrl:v})} /></div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 mb-3 block">Description</label>
                  <textarea className="w-full bg-slate-50 p-6 rounded-3xl font-bold min-h-[150px] outline-none" value={formData.description} onChange={(e: any)=>setFormData({...formData, description:e.target.value})} />
                </div>
                <button type="submit" className="md:col-span-2 bg-slate-900 text-white py-6 rounded-3xl font-black tracking-widest text-xs hover:bg-blue-600 transition shadow-xl">
                  {editingId ? 'UPDATE' : 'PUBLISH'}
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
    <button onClick={onClick} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-xs tracking-widest uppercase transition-all ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'}`}>
      {icon} {label}
    </button>
  );
}

function InputGroup({ label, type="text", value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-slate-400">{label}</label>
      <input required type={type} className="w-full bg-slate-50 p-5 rounded-2xl font-bold outline-none border-none transition-all" value={value} onChange={(e: any)=>onChange(e.target.value)} />
    </div>
  );
}