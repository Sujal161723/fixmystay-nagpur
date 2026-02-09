"use client";
import { useEffect, useState } from "react";
import { db } from "./lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-black font-sans">
      
      {/* --- OLD STYLE BLUE BANNER HEADER --- */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-6 text-center shadow-lg">
        <h1 className="text-5xl font-black italic tracking-tighter mb-2">FixMyStay</h1>
        <p className="text-blue-100 font-bold uppercase tracking-[0.3em] text-xs">Nagpur's Direct Property Hub</p>
        
        <div className="mt-8 flex justify-center">
          <Link href="/post" className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shadow-xl active:scale-95">
             + POST YOUR AD FREE
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-2 bg-blue-600 rounded-full"></div>
          <h2 className="text-3xl font-black text-slate-800 italic">Fresh Listings in Nagpur 🏠</h2>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((item) => (
            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-white hover:shadow-2xl transition-all duration-500 group">
              
              {/* Image & Category Badge */}
              <div className="relative h-64">
                <img src={item.imageUrl || "https://via.placeholder.com/400x300"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {item.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-extrabold text-slate-800 leading-tight">{item.title}</h3>
                  <span className="text-2xl font-black text-blue-600">₹{item.price}</span>
                </div>

                {/* AREA & LANDMARK */}
                <div className="flex flex-col gap-1 mb-4">
                   <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                     <span className="text-blue-500 text-lg">📍</span> {item.area}
                   </div>
                   {item.landmark && (
                     <p className="text-[11px] text-blue-600 font-bold italic ml-7">
                       (Near {item.landmark})
                     </p>
                   )}
                </div>

                {/* AMENITIES TAGS */}
                {item.amenities && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.amenities.split(',').map((tag: string, i: number) => (
                      <span key={i} className="text-[9px] font-black uppercase tracking-wider bg-blue-50 text-blue-500 px-3 py-1.5 rounded-lg border border-blue-100">
                        ✓ {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a 
                    href={`https://wa.me/${item.phone}?text=Hi, I'm interested in: ${item.title}`}
                    className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-lg"
                  >
                    CONTACT OWNER
                  </a>
                  <button 
                     onClick={() => {
                      const text = `Property in ${item.area}: ${item.title} at ₹${item.price}. Link: ${window.location.href}`;
                      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center hover:bg-blue-100 transition-all border border-blue-100"
                  >
                    🔗
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <footer className="w-full bg-slate-900 text-white py-10 px-6 text-center mt-20">
        <p className="text-sm font-bold opacity-60 uppercase tracking-widest">© 2024 FixMyStay Nagpur</p>
        <p className="text-[10px] mt-2 opacity-40 uppercase">Nagpur's #1 Direct Property Marketplace</p>
      </footer>
    </div>
  );
}