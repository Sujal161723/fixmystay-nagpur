"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
// Lucide Outline Icons
import { 
  LayoutDashboard, LogOut, Trash2, MapPin, IndianRupee, 
  Home, Search, PlusCircle, Users, Activity, CheckCircle, Clock, Eye 
} from "lucide-react";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'inventory' | 'leads'>('inventory'); // Toggle between sections
  const router = useRouter();

  // Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/adminlogin");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  // Real-time Property Fetch
  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Property delete karni hai?")) {
      await deleteDoc(doc(db, "properties", id));
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => router.push("/"));
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold text-slate-400">Verifying Admin Access...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-blue-600 p-2 rounded-2xl text-white shadow-lg shadow-blue-200">
            <Home size={24} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800 italic">FIXMYSTAY</h1>
        </div>
        
        <nav className="space-y-4 flex-1">
          <button 
            onClick={() => setView('inventory')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${view === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={22} /> Dashboard
          </button>
          <button 
            onClick={() => setView('leads')}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${view === 'leads' ? 'bg-blue-50 text-blue-700' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <Users size={22} /> User Leads
          </button>
          <div className="flex items-center gap-4 text-slate-400 p-4 rounded-2xl hover:bg-slate-50 font-semibold cursor-pointer">
            <Activity size={22} /> Analytics
          </div>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-4 text-red-500 font-bold p-4 hover:bg-red-50 rounded-2xl transition-all">
          <LogOut size={22} /> Logout
        </button>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-6 md:p-12 overflow-x-hidden">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900">{view === 'inventory' ? 'Inventory Control' : 'User Leads'}</h2>
            <p className="text-slate-500 font-medium tracking-tight">Managing properties in Nagpur, Maharashtra</p>
          </div>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-slate-200">
            <PlusCircle size={20} /> Add Property
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon={<Home size={24}/>} label="Properties" value={properties.length} color="blue" />
          <StatCard icon={<Users size={24}/>} label="Cart Leads" value="12" color="orange" />
          <StatCard icon={<Eye size={24}/>} label="Site Views" value="1.4k" color="green" />
          <StatCard icon={<Clock size={24}/>} label="Pending" value="3" color="purple" />
        </div>

        {/* Dynamic Table Section */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tighter italic">
              {view === 'inventory' ? 'Live Inventory' : 'Interested Clients'}
            </h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-12 pr-6 py-3 bg-slate-50 rounded-xl outline-none focus:ring-2 ring-blue-100 w-full md:w-80 text-sm font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50">
                <tr className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="px-8 py-5 text-left">Details</th>
                  <th className="px-8 py-5 text-left">Location / Info</th>
                  <th className="px-8 py-5 text-left">Price / Status</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {properties.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-5">
                        <img src={item.imageUrl} className="w-20 h-20 rounded-[1.5rem] object-cover shadow-md group-hover:rotate-2 transition-transform duration-300" />
                        <div>
                          <p className="font-bold text-slate-800 text-lg leading-tight">{item.title}</p>
                          <span className="text-[10px] text-slate-400 font-black">REF: {item.id.slice(-6).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-600 font-semibold">
                        <MapPin size={16} className="text-blue-500" />
                        {item.area}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-black text-slate-800 text-lg flex items-center gap-1 italic">
                        <IndianRupee size={16} /> {item.price}
                      </div>
                      <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded font-black uppercase tracking-wider">Available</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                         <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition-colors"><Eye size={20}/></button>
                         <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
                         >
                            <Trash2 size={20} />
                         </button>
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

// Reusable Stat Card Component
function StatCard({ icon, label, value, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    green: "bg-green-50 text-green-500",
    purple: "bg-purple-50 text-purple-500",
  };
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