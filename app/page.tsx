"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
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
    <main className="min-h-screen bg-[#f1f5f9] pb-24 text-black font-sans">
      {/* Navbar */}
      <nav className="p-4 bg-white border-b sticky top-0 z-50 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-blue-600 italic tracking-tighter">FixMyStay</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nagpur Real Estate</p>
        </div>
        <Link href="/post" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md hover:bg-blue-700 transition-all">
          + Post
        </Link>
      </nav>

      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-xl font-extrabold text-gray-800 mb-6 mt-2">Latest in Nagpur 📍</h2>

        {loading ? (
          <div className="flex flex-col items-center mt-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            {properties.map((item) => (
              <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all group">
                
                {/* Image Section */}
                <div className="relative h-64 w-full bg-gray-200">
                  {item.imageUrl ? (
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-bold italic">
                      No Photo Available
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <p className="text-[10px] font-black text-blue-700 uppercase">{item.area || 'Nagpur'}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">Rent / Month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-600">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-4">
                    <a 
                      href={`tel:${item.phone}`} 
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95"
                    >
                       Call Owner
                    </a>
                    <a 
                      href={`https://wa.me/${item.phone}?text=Hi, I'm interested in: ${item.title}`}
                      target="_blank"
                      className="w-14 bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center hover:bg-black transition-all"
                    >
                      <span className="text-xl">💬</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}