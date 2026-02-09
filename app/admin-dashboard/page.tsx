"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // 1. Check if Admin is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/admin-login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Fetch all properties
  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 3. Delete Function
  const handleDelete = async (id: string) => {
    if (confirm("Bhai, pakka delete karna hai? Ye wapas nahi aayega!")) {
      await deleteDoc(doc(db, "properties", id));
    }
  };

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  if (!user) return <div className="p-10 font-black text-center">Checking Permission...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900">Admin <span className="text-blue-600">Control</span></h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2">Manage Nagpur Listings</p>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black text-xs hover:bg-red-600 hover:text-white transition">LOGOUT</button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
              <tr>
                <th className="p-6">Property</th>
                <th className="p-6">Area</th>
                <th className="p-6">Price</th>
                <th className="p-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {properties.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="font-black text-slate-800 text-sm truncate max-w-[200px]">{item.title}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{item.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-bold text-slate-500">{item.area}</td>
                  <td className="p-6 text-sm font-black text-blue-600">₹{item.price}</td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-50 text-red-500 w-10 h-10 rounded-xl hover:bg-red-500 hover:text-white transition flex items-center justify-center mx-auto"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {properties.length === 0 && <p className="p-20 text-center font-bold text-slate-400 italic">No properties to manage. Nagpur is quiet today...</p>}
        </div>
      </div>
    </div>
  );
}