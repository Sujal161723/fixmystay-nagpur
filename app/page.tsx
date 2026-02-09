"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All"); 

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = 
      p.area.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.landmark && p.landmark.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-black font-sans">
      
      {/* --- 99ACRES STYLE PROFESSIONAL HEADER --- */}
      <nav className="bg-[#2d3e50] text-white py-3 px-4 md:px-10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col group cursor-pointer">
            <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter leading-none">
              FIXMYSTAY
            </Link>
            <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1 hidden md:block">
              Nagpur's No Broker Hub
            </span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-gray-200">
              <Link href="#" className="hover:text-white transition">For Buyers</Link>
              <Link href="#" className="hover:text-white transition">For Tenants</Link>
              <Link href="#" className="hover:text-white transition">For Owners</Link>
              <Link href="#" className="hover:text-white transition">For Dealers</Link>
            </div>

            <div className="flex items-center gap-3 md:gap-4 border-l border-gray-600 pl-4 md:pl-8">
              <Link href="/post" className="bg-white text-[#2d3e50] px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-gray-100 transition shadow-lg">
                Post Property <span className="bg-green-500 text-white px-1 rounded ml-1 text-[9px]">FREE</span>
              </Link>
              <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 transition border border-gray-500 shadow-inner group">
                <span className="text-lg group-hover:scale-110 transition">👤</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div 
        className="relative bg-cover bg-center py-20 px-6 shadow-md" 
        style={{ backgroundImage: "url('https://res.cloudinary.com/dtarhelmc/image/upload/v1770627386/banner-bg_mmg2jp.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 drop-shadow-lg">
            Find your perfect stay in <span className="text-blue-300">Nagpur</span>
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8 drop-shadow-md">
             Nagpur ki Garmi se bacho 🍦 Direct. Verified.
          </p>
          
          <div className="relative max-w-2xl mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center p-2 shadow-2xl focus-within:border-blue-500 transition-all">
            <span className="ml-4 text-xl text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search by Locality (e.g. Manish Nagar, Dharampeth)" 
              className="w-full p-4 outline-none font-medium text-slate-700 bg-transparent"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all hidden md:block">
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['All', 'Flat', 'PG', 'Shop', 'Plot'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md
                  ${selectedCategory === cat 
                    ? 'bg-blue-600 text-white scale-110 shadow-blue-500/30' 
                    : 'bg-white/90 text-slate-700 hover:bg-white hover:text-blue-600'}
                `}
              >
                {cat === "All" ? "All Properties" : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PROPERTY LISTINGS (NOW CLICKABLE) --- */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-wider">
              {searchTerm || selectedCategory !== "All" ? "Filtered Results" : "Newly Added Properties"}
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-1"></div>
          </div>
          <span className="text-sm font-bold text-slate-400">{filteredProperties.length} Properties found</span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((item) => (
              /* --- CLICKABLE LINK WRAPPER START --- */
              <Link href={`/property/${item.id}`} key={item.id} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 flex flex-col h-full transform hover:-translate-y-2">
                  
                  {/* Image Section */}
                  <div className="relative h-56">
                    <img src={item.imageUrl || "https://via.placeholder.com/400x300"} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-md">
                      {item.category}
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-2xl font-black text-slate-900">₹{item.price}</span>
                      <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                        <span>Verified</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-700 mb-1 truncate group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-sm font-bold text-slate-400 mb-4 flex items-center gap-1">
                      📍 {item.area} {item.landmark && <span className="text-blue-500 font-medium ml-1">• Near {item.landmark}</span>}
                    </p>

                    {item.amenities && (
                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {item.amenities.split(',').slice(0, 3).map((tag: string, i: number) => (
                          <span key={i} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                            ✓ {tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 border-t pt-5">
                      <div className="flex-1 bg-blue-600 text-white text-center py-3.5 rounded-xl font-bold text-sm group-hover:bg-blue-700 transition-all">
                        View Details
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
                        🔗
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              /* --- CLICKABLE LINK WRAPPER END --- */
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-400 font-bold italic">Bhai, Nagpur mein yahan koi property nahi mili... Kuch aur search karo!</p>
          </div>
        )}
      </div>

      <footer className="bg-slate-900 text-white py-12 px-6 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 opacity-80">
          <div>
            <h4 className="font-black text-xl mb-4">FixMyStay</h4>
            <p className="text-xs leading-relaxed">Direct property marketplace for Nagpur. No brokers. No hidden fees.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-xs space-y-2">
              <li>Flats in Nagpur</li>
              <li>PGs in Nagpur</li>
              <li>Post Property Free</li>
            </ul>
          </div>
          <div className="text-xs">
            <p>© 2026 FixMyStay Nagpur. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}