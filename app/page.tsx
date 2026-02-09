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

  const categories = [
    { id: 'All', label: 'All Stays', path: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'Flat', label: 'Flats', path: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { id: 'PG', label: 'PG/Hostel', path: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
    { id: 'Shop', label: 'Shops', path: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
    { id: 'Plot', label: 'Plots', path: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' }
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-black font-sans">
      
      {/* --- HEADER --- */}
      <nav className="bg-[#2d3e50] text-white py-3 px-4 md:px-10 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex flex-col group">
            <span className="text-xl md:text-2xl font-black tracking-tighter leading-none">FIXMYSTAY</span>
            <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1 hidden md:block">Nagpur's No Broker Hub</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/post" className="bg-white text-[#2d3e50] px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-blue-50 transition shadow-lg flex items-center gap-2">
              Post Property <span className="bg-green-500 text-white px-1 rounded text-[9px]">FREE</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div 
        className="relative bg-cover bg-center py-24 px-6" 
        style={{ backgroundImage: "url('https://res.cloudinary.com/dtarhelmc/image/upload/v1770627386/banner-bg_mmg2jp.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#2d3e50]/60 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black mb-4 drop-shadow-xl tracking-tight">
            Find your perfect stay in <span className="text-blue-400">Nagpur</span>
          </h1>
          
          <div className="relative max-w-2xl mx-auto bg-white border border-gray-100 rounded-[2rem] flex items-center p-2 shadow-2xl mt-10">
            <input 
              type="text" 
              placeholder="Search Manish Nagar, Dharampeth..." 
              className="w-full p-4 pl-6 outline-none font-bold text-slate-700 bg-transparent text-lg"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-10 py-4 rounded-[1.5rem] font-black hover:bg-blue-700 transition-all hidden md:block uppercase text-sm tracking-widest">
              Search
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12">
            {categories.map((cat) => (
              <button 
                key={cat.id} 
                onClick={() => setSelectedCategory(cat.id)}
                className="group flex flex-col items-center gap-3 transition-all"
              >
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 transition-all duration-300 
                  ${selectedCategory === cat.id 
                    ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-500/40 text-white scale-110' 
                    : 'bg-white/10 border-white/20 text-white hover:border-white/50 hover:bg-white/20'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={cat.path} />
                  </svg>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors
                  ${selectedCategory === cat.id ? 'text-blue-300' : 'text-white/60 group-hover:text-white'}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- PROPERTY LISTINGS --- */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-2">Nagpur Listings</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">
              {selectedCategory === "All" ? "Fresh Recommendations" : `${selectedCategory}s in Nagpur`}
            </h2>
          </div>
          <span className="text-sm font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
            {filteredProperties.length} results
          </span>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProperties.map((item) => (
              <Link href={`/property/${item.id}`} key={item.id} className="group">
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-3">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.imageUrl || "https://via.placeholder.com/400x300"} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl font-black text-blue-600">₹{item.price}<span className="text-xs text-slate-400">/mo</span></span>
                      <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-tighter">Verified</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2 truncate group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <p className="text-sm font-bold text-slate-400 flex items-center gap-1 mb-6">
                      📍 {item.area} {item.landmark && <span className="text-blue-400 font-medium">• {item.landmark}</span>}
                    </p>
                    <div className="flex gap-2 border-t border-slate-50 pt-6 mt-auto">
                      <div className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-blue-600 transition-all">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No properties found</p>
          </div>
        )}
      </div>

      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <h4 className="font-black text-2xl tracking-tighter">FIXMYSTAY</h4>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © 2026 FixMyStay • Direct Marketplace
          </div>
        </div>
      </footer>
    </div>
  );
}