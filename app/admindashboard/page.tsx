"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, LogOut, Trash2, MapPin, IndianRupee, 
  Home, Search, PlusCircle, Users, Activity, Eye, Clock, X 
} from "lucide-react";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'inventory' | 'leads'>('inventory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Property Form State
  const [newProp, setNewProp] = useState({
    title: "", price: "", area: "", landmark: "", 
    description: "", amenities: "", imageUrl: "", category: "Flat", phone: ""
  });

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/adminlogin");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "properties"), {
        ...newProp,
        createdAt: serverTimestamp(),
      });
      setIsModalOpen(false);
      setNewProp({ title: "", price: "", area: "", landmark: "", description: "", amenities: "", imageUrl: "", category: "Flat", phone: "" });
      alert("Property Add Ho Gayi Bhai!");
    } catch (err) {
      console.error(err);
      alert("Kuch lafda hua add karne mein!");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Property delete karni hai?")) {
      await deleteDoc(doc(db, "properties", id));
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => router.push("/"));
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400 italic">Verifying Admin Access...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans relative">
      
      {/* --- ADD PROPERTY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black italic text-slate-800 uppercase tracking-tighter">Add New Property</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X size={24}/></button>
            </div>
            
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Property Title (e.g. 2BHK Luxury Flat)" className="md:col-span-2 p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} required />
              <input type="number" placeholder="Price (Monthly)" className="p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.price} onChange={e => setNewProp({...newProp, price: e.target.value})} required />
              <input type="text" placeholder="Area (e.g. Manish Nagar)" className="p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.area} onChange={e => setNewProp({...newProp, area: e.target.value})} required />
              <input type="text" placeholder="Landmark (Near Haldirams)" className="p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.landmark} onChange={e => setNewProp({...newProp, landmark: e.target.value})} />
              <input type="text" placeholder="Phone Number" className="p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.phone} onChange={e => setNewProp({...newProp, phone: e.target.value})} required />
              <select className="p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold text-slate-500" value={newProp.category} onChange={e => setNewProp({...newProp, category: e.target.value})}>
                <option value="Flat">Flat</option>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Shop">Shop</option>
              </select>
              <input type="text" placeholder="Image URL" className="md:col-span-2 p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold text-blue-500" value={newProp.imageUrl} onChange={e => setNewProp({...newProp, imageUrl: e.target.value})} required />
              <textarea placeholder="Detailed Description (Tell users about the property...)" className="md:col-span-2 p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold h-32" value={newProp.description} onChange={e => setNewProp({...newProp, description: e.target.value})}></textarea>
              <input type="text" placeholder="Amenities (WiFi, AC, Lift, Parking...)" className="md:col-span-2 p-4 bg-slate-50 rounded-2xl outline-none ring-blue-100 focus:ring-2 font-bold" value={newProp.amenities} onChange={e => setNewProp({...newProp, amenities: e.target.value})} />
              <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-100 hover:scale-[1.02] active:scale-95 transition-all mt-4">LIST PROPERTY LIVE 🚀</button>
            </form>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-2xl text-white shadow-lg shadow-blue-200"><Home size={24} /></div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 italic">FIXMYSTAY</h1>
        </div>
        <nav className="space-y-4 flex-1">
          <button onClick={() => setView('inventory')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${view === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:bg-slate-50'}`}><LayoutDashboard size={22} /> Dashboard</button>
          <button onClick={() => setView('leads')} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${view === 'leads' ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:bg-slate-50'}`}><Users size={22} /> User Leads</button>
        </nav>
        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 text-red-500 font-bold p-4 hover:bg-red-50 rounded-2xl transition-all"><LogOut size={22} /> Logout</button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{view === 'inventory' ? 'Inventory Control' : 'User Leads'}</h2>
            <p className="text-slate-500 font-medium">Managing properties in Nagpur, Maharashtra</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-slate-200"
          >
            <PlusCircle size={20} /> Add Property
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Home size={24}/>} label="Properties" value={properties.length} color="blue" />
          <StatCard icon={<Users size={24}/>} label="User Leads" value="0" color="orange" />
          <StatCard icon={<Eye size={24}/>} label="Site Views" value="1.4k" color="green" />
          <StatCard icon={<Clock size={24}/>} label="Pending" value="3" color="purple" />
        </div>

        {/* Dynamic Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden mb-10">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter italic">{view === 'inventory' ? 'Live Inventory' : 'Interested Clients'}</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search..." className="pl-12 pr-6 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-blue-100 w-full md:w-80 text-sm font-medium" />
            </div>
          </div>

          <div className="overflow-x-auto text-left">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-5">Details</th>
                  <th className="px-8 py-5">Location</th>
                  <th className="px-8 py-5">Price</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img src={item.imageUrl} className="w-16 h-16 rounded-2xl object-cover shadow-md" />
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">{item.title}</p>
                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-semibold text-slate-600"><div className="flex items-center gap-2"><MapPin size={14} className="text-blue-500"/>{item.area}</div></td>
                    <td className="px-8 py-6 font-black text-slate-800 text-lg italic">₹{item.price}</td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                         <button onClick={() => handleDelete(item.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  const colors: any = { blue: "bg-blue-50 text-blue-500", orange: "bg-orange-50 text-orange-500", green: "bg-green-50 text-green-500", purple: "bg-purple-50 text-purple-500" };
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest">{label}</p>
        <h4 className="text-2xl font-black text-slate-800 tracking-tighter">{value}</h4>
      </div>
    </div>
  );
}