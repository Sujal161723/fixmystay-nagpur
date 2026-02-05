"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase"; 
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const propertyList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProperties(propertyList);
      setFilteredProperties(propertyList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Search Logic
  useEffect(() => {
    const results = properties.filter(p => 
      p.area?.toLowerCase().includes(search.toLowerCase()) ||
      p.title?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProperties(results);
  }, [search, properties]);

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24 text-black font-sans">
      {/* Navbar */}
      <nav className="p-4 bg-white sticky top-0 z-50 flex justify-between items-center shadow-sm border-b">
        <div>
          <h1 className="text-2xl font-black text-blue-600 italic tracking-tighter">FixMyStay</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nagpur Real Estate</p>
        </div>
        <Link href="/post" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md active:scale-95 transition-all">
          + Post Ad
        </Link>
      </nav>

      <div className="max-w-xl mx-auto p-4">
        {/* Search Bar Section */}
        <div className="relative mt-2 mb-8">
          <input 
            type="text" 
            placeholder="Search Area (e.g. Dharampeth, Ramdaspeth)" 
            className="w-full p-5 pl-14 rounded-[2rem] border-none bg-white shadow-xl text-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute left-6 top-5 text-2xl">🔍</span>
        </div>

        <h2 className="text-xl font-extrabold text-gray-800 mb-6">
          {search ? `Searching for "${search}"...` : "Recommended Properties"}
        </h2>

        {loading ? (
          <div className="flex justify-center mt-20 italic text-gray-400">Loading Nagpur's best homes...</div>
        ) : (
          <div className="grid gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((item) => (
                <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group transition-all">
                  {/* Image */}
                  <div className="relative h-64 w-full bg-gray-100">
                    <img 
                      src={item.imageUrl || "https://via.placeholder.com/400x300?text=No+Photo"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
                      <p className="text-[11px] font-black text-blue-700 uppercase tracking-tighter">📍 {item.area || 'Nagpur'}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight">{item.title}</h3>
                      <p className="text-2xl font-black text-blue-600 ml-2">₹{item.price}</p>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <a href={`tel:${item.phone}`} className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 active:scale-95 transition-all">
                        Call Owner
                      </a>
                      <a href={`https://wa.me/${item.phone}`} className="w-14 bg-gray-900 text-white py-4 rounded-2xl flex items-center justify-center active:scale-95 transition-all">
                        <span className="text-xl">💬</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">Bhai, is area mein abhi koi ghar nahi mila. 😅</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}