"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, deleteDoc, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { MessageCircle, Phone, Trash2, Calendar, MapPin, Plus, Users, Home, X, Tag, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties"); 
  const [leads, setLeads] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State (Tera purana data structure)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    area: "",
    landmark: "",
    category: "Flat",
    description: "",
    imageUrl: "",
    phone: "91" 
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const leadsQ = query(collection(db, "leads"), orderBy("timestamp", "desc"));
      const leadsSnap = await getDocs(leadsQ);
      setLeads(leadsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const propsSnap = await getDocs(collection(db, "properties"));
      setProperties(propsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "properties"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      setFormData({ title: "", price: "", area: "", landmark: "", category: "Flat", description: "", imageUrl: "", phone: "91" });
      fetchData();
      alert("Property Add Ho Gayi! 🚀");
    } catch (err) { alert("Error: " + err); }
  };

  return (
    <div className="flex min-h-screen bg-[#f1f5f9]">
      
      {/* --- SIDEBAR --- */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden lg:block sticky top-0 h-screen">
        <h1 className="text-2xl font-black italic tracking-tighter mb-10 text-blue-400">FIXMYSTAY</h1>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab("properties")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "properties" ? "bg-blue-600 shadow-lg shadow-blue-900/50" : "hover:bg-slate-800 text-slate-400"}`}>
            <Home size={20}/> Properties
          </button>
          <button onClick={() => setActiveTab("leads")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === "leads" ? "bg-blue-600 shadow-lg shadow-blue-900/50" : "hover:bg-slate-800 text-slate-400"}`}>
            <Users size={20}/> Customer Leads
          </button>
        </nav>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 p-4 md:p-10">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {activeTab === "properties" ? "MANAGE LISTINGS" : "LIVE LEADS"}
            </h2>
            <p className="text-slate-500 font-medium text-sm">Nagpur Real Estate Admin</p>
          </div>
          {activeTab === "properties" && (
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-blue-700 transition shadow-xl shadow-blue-200">
              <Plus size={18}/> ADD NEW PROPERTY
            </button>
          )}
        </div>

        {/* --- PROPERTIES TAB --- */}
        {activeTab === "properties" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-[2.5rem] p-4 shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img src={p.imageUrl} className="w-full h-48 object-cover rounded-[2rem] mb-4" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-blue-600">{p.category}</span>
                </div>
                <h3 className="font-black text-slate-800 px-2 text-lg line-clamp-1">{p.title}</h3>
                <p className="text-slate-400 text-xs px-2 font-bold flex items-center gap-1 mb-4"><MapPin size={12}/> {p.area}</p>
                <div className="flex justify-between items-center mt-auto border-t pt-4 px-2">
                  <span className="text-slate-900 font-black text-xl italic tracking-tighter">₹{p.price}</span>
                  <button onClick={async () => { if(confirm("Delete?")) { await deleteDoc(doc(db, "properties", p.id)); fetchData(); } }} className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-500 hover:text-white transition">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- LEADS TAB --- */}
        {activeTab === "leads" && (
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                  <tr>
                    <th className="p-6">Property Details</th>
                    <th className="p-6">User Action</th>
                    <th className="p-6">Time & Date</th>
                    <th className="p-6">Remove</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-bold">
                  {leads.map((l) => (
                    <tr key={l.id} className="hover:bg-blue-50/40 transition">
                      <td className="p-6">
                        <p className="text-slate-800 text-sm">{l.propertyTitle}</p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">{l.area}</p>
                      </td>
                      <td className="p-6">
                        <span className={`flex items-center gap-1 w-fit px-3 py-1.5 rounded-lg text-[10px] font-black ${l.action === 'WhatsApp' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                          {l.action === 'WhatsApp' ? <MessageCircle size={14}/> : <Phone size={14}/>} {l.action}
                        </span>
                      </td>
                      <td className="p-6 text-xs text-slate-400">{l.timestamp?.toDate().toLocaleString()}</td>
                      <td className="p-6">
                        <button onClick={async () => { await deleteDoc(doc(db, "leads", l.id)); fetchData(); }} className="text-slate-300 hover:text-red-500"><Trash2 size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ADD MODAL (Purana Form) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl relative overflow-y-auto max-h-[90vh]">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition"><X size={24}/></button>
              <h2 className="text-2xl font-black italic tracking-tighter mb-8">LIST NEW PROPERTY</h2>
              
              <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Property Title</label>
                  <input required className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={(e)=>setFormData({...formData, title:e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Price (₹)</label>
                  <input required type="number" className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.price} onChange={(e)=>setFormData({...formData, price:e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Area</label>
                  <input required className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.area} onChange={(e)=>setFormData({...formData, area:e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Image URL (Abhi ke liye)</label>
                  <input required className="w-full bg-slate-50 p-4 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-blue-500" value={formData.imageUrl} onChange={(e)=>setFormData({...formData, imageUrl:e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm tracking-widest hover:bg-black transition-all shadow-xl">PUBLISH LISTING</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}