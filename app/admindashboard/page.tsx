"use client";
import { useEffect, useState } from "react";
import { db, auth } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

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

  if (!user) return <div className="p-10 font-black text-center">Checking Admin Access...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black italic">FIXMYSTAY <span className="text-blue-600">CONTROL</span></h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold text-xs uppercase">Logout</button>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-200">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest font-black">
              <tr>
                <th className="p-6">Property Details</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {properties.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={item.imageUrl} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                      <div>
                        <p className="font-black text-slate-800 text-sm">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">📍 {item.area} | ₹{item.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-50 text-red-500 w-12 h-12 rounded-2xl hover:bg-red-500 hover:text-white transition-all flex items-center justify-center mx-auto shadow-sm"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}