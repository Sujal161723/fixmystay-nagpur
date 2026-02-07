"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase"; 
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
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

  useEffect(() => {
    const results = properties.filter(p => 
      p.area?.toLowerCase().includes(search.toLowerCase()) ||
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProperties(results);
  }, [search, properties]);

  const handleDelete = async (id: string) => {
    const password = prompt("Admin Password:");
    if (password === "nagpur123") {
      await deleteDoc(doc(db, "properties", id));
      alert("Removed successfully!");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-black">
      
      {/* HEADER WITH INTEGRATED SEARCH */}
      <header className="bg-white border-b sticky top-0 z-[100] px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <h1 className="text-2xl font-black text-blue-600 italic tracking-tighter">FixMyStay</h1>
            <Link href="/post" className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs">
              + Post
            </Link>
          </div>
          
          <div className="relative w-full md:max-w-md">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search Area, Flat, or PG in Nagpur..." 
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Link href="/post" className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all">
            Post Property Free
          </Link>
        </div>
      </header>

      {/* HERO SECTION WITH BACKGROUND IMAGE FEEL */}
      <section className="relative h-[400px] flex items-center justify-center text-center px-4 overflow-hidden bg-blue-900">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200" alt="House background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">Nagpur Mein Ghar Dhundna Ab Asaan</h2>
          <p className="text-white/90 text-lg md:text-xl font-medium">Verified PGs, Flats, and Shops in Nagpur's Best Localities</p>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black text-gray-900">Fresh Recommendations</h3>
            <div className="h-1 w-20 bg-blue-600 mt-2"></div>
          </div>
          <p className="text-gray-500 font-bold">{filteredProperties.length} Properties found</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 group relative">
                
                <button onClick={() => handleDelete(item.id)} className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all text-red-600 shadow-sm">🗑️</button>

                <div className="relative h-56 overflow-hidden">
                  <img src={item.imageUrl || "https://via.placeholder.com/400x300"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category || 'Property'}</span>
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">📍 {item.area}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-bold truncate pr-2">{item.title}</h4>
                    <span className="text-2xl font-black text-blue-600">₹{item.price}</span>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <a href={`tel:${item.phone}`} className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95">
                      📞 Call Owner
                    </a>
                    <a href={`https://wa.me/${item.phone}`} className="w-14 bg-gray-900 hover:bg-black text-white py-4 rounded-2xl flex items-center justify-center transition-all active:scale-95">
                      <span className="text-xl">💬</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PROFESSIONAL BLACK FOOTER (Inspired by 99acres image) */}
      <footer className="bg-[#1a1a1a] text-gray-400 pt-16 pb-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-white font-black text-2xl mb-6 italic">FixMyStay</h4>
            <p className="text-sm leading-relaxed">Nagpur's fastest growing property portal. We connect owners and seekers directly, without any middleman or brokerage fees.</p>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Explore Nagpur</h5>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">Dharampeth Rentals</li>
              <li className="hover:text-blue-400 cursor-pointer">Sadar Office Spaces</li>
              <li className="hover:text-blue-400 cursor-pointer">VNIT Area PGs</li>
              <li className="hover:text-blue-400 cursor-pointer">Sitabuldi Shops</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Company</h5>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-blue-400 cursor-pointer">About us</li>
              <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-400 cursor-pointer">Safety Guide</li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Contact Us</h5>
            <p className="text-sm mb-4 italic text-blue-400 underline cursor-pointer">feedback@fixmystay.nagpur</p>
            <div className="flex gap-4 text-xl">
              <span className="cursor-pointer hover:text-white transition-all">FB</span>
              <span className="cursor-pointer hover:text-white transition-all">IG</span>
              <span className="cursor-pointer hover:text-white transition-all">TW</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-xs">
          <p>© 2026 FixMyStay Nagpur - A Sujal Chiwande Startup. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}