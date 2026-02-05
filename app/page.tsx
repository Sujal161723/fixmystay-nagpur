"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Database se properties fetch karne ka query (Latest first)
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));

    // Real-time listener
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertyList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertyList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-20 text-black">
      {/* Premium Navbar */}
      <nav className="p-5 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-blue-700 tracking-tighter italic leading-none">FixMyStay</h1>
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Nagpur Edition</p>
        </div>
        <Link href="/post" className="bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 active:scale-95 transition-all">
          + Post Ad
        </Link>
      </nav>

      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6 mt-2">
          <h2 className="text-xl font-black text-gray-800">Fresh Recommendations</h2>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{properties.length} Properties</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center mt-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium italic">Finding homes in Nagpur...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white p-12 rounded-[2.5rem] text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold text-lg">No properties found yet.</p>
            <p className="text-gray-400 text-sm mb-6">Be the first one to post in your area!</p>
            <Link href="/post" className="text-blue-600 font-black underline">Start Posting →</Link>
          </div>
        ) : (
          <div className="grid gap-5">
            {properties.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-50 transition-all group">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md uppercase mb-2 inline-block">
                      {item.area || 'Nagpur'}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{item.title}</h3>
                    <p className="text-gray-400 text-sm font-medium mt-1">📍 Nagpur, Maharashtra</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">₹{item.price}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Rent / Month</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {/* Real Call Button */}
                  <a 
                    href={`tel:${item.phone}`} 
                    className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-black text-center flex items-center justify-center gap-2 hover:bg-green-600 shadow-lg shadow-green-100 transition-all active:scale-95"
                  >
                    <span>📞</span> CALL OWNER
                  </a>
                  
                  {/* WhatsApp Button (Bonus) */}
                  <a 
                    href={`https://wa.me/${item.phone}?text=Hi, I am interested in your property: ${item.title}`}
                    target="_blank"
                    className="w-14 bg-gray-900 text-white py-4 rounded-2xl font-black text-center flex items-center justify-center hover:bg-black transition-all active:scale-95"
                  >
                    💬
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}