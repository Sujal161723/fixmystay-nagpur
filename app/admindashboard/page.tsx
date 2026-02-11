"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
// Lucide Icons import kar rahe hain (Outline style ke liye)
import { LayoutDashboard, LogOut, Trash2, MapPin, IndianRupee, Home, Search, PlusCircle } from "lucide-react";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
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

  const handleDelete = async (id: string) => {
    if (confirm("Nagpur ki ye property delete karni hai?")) {
      await deleteDoc(doc(db, "properties", id));
    }
  };

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
      <div className="animate-pulse font-bold text-[#2B3674]">Checking Admin Access...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex">
      {/* Sidebar - Optional but makes it look like a real dashboard */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Home size={20} />
          </div>
          <h1 className="text-xl font-bold text-[#2B3674]">FIXMYSTAY</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 bg-[#F7F9FF] text-blue-600 p-3 rounded-xl font-semibold cursor-pointer">
            <LayoutDashboard size={20} strokeWidth={2} />
            Dashboard
          </div>
          <div className="flex items-center gap-3 text-slate-400 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition">
            <PlusCircle size={20} strokeWidth={2} />
            Add Property
          </div>
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center gap-3 text-red-500 font-semibold p-3 hover:bg-red-50 rounded-xl transition">
          <LogOut size={20} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#2B3674]">Property Control</h2>
            <p className="text-slate-400 text-sm font-medium">Manage your Nagpur listings effectively</p>
          </div>
          
          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
             <div className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl">
               {properties.length} Total Units
             </div>
          </div>
        </header>

        {/* Property Table Card */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-[#2B3674]">All Properties</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search property..." 
                className="pl-10 pr-4 py-2 bg-[#F4F7FE] rounded-xl text-sm outline-none focus:ring-1 ring-blue-400"
              />
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-gray-50">
                <th className="px-8 py-4 font-bold">Property Details</th>
                <th className="px-8 py-4 font-bold">Price & Area</th>
                <th className="px-8 py-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {properties.map((item) => (
                <tr key={item.id} className="hover:bg-[#FBFBFF] transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative overflow-hidden w-14 h-14 rounded-2xl shadow-inner bg-gray-100">
                        <img src={item.imageUrl} className="w-full h-full object-cover transition transform group-hover:scale-110" />
                      </div>
                      <div>
                        <p className="font-bold text-[#2B3674] text-base">{item.title}</p>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                          <MapPin size={12} className="text-blue-500" /> {item.area}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="flex items-center gap-1 text-[#2B3674] font-bold">
                        <IndianRupee size={14} className="text-green-500" /> {item.price}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold uppercase">Per Month</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      title="Delete Listing"
                    >
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {properties.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium">
              No properties found. Add some to get started!
            </div>
          )}
        </div>
      </main>
    </div>
  );
}