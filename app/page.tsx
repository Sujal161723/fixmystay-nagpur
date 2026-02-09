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
    <div className="min-h-screen bg-[#f8fafc] text-black font-sans">
      {/* Navbar with Logo */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex flex-col items-start leading-none">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="FMS" className="h-8 w-auto" />
              <span className="text-2xl font-black text-blue-600 tracking-tighter italic">FMS</span>
            </div>
            <p className="text-[9px] font-black text-gray-400 tracking-[0.4em] uppercase mt-1 ml-1">FIXMYSTAY</p>
          </div>
          <Link href="/post" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            + Post Property
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 italic">Nagpur's Fresh Listings 🏠</h1>
        <p className="text-slate-500 font-medium">Find direct rentals in Sitabuldi, Dharampeth, Manish Nagar & more.</p>
      </div>

      {/* Property Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((item) => (
          <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
            {/* Image & Category Badge */}
            <div className="relative h-64">
              <img src={item.imageUrl || "https://via.placeholder.com/400x300"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                {item.category}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-7">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-800 leading-tight">{item.title}</h3>
                <span className="text-2xl font-black text-blue-600">₹{item.price}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-4">
                <span className="text-blue-500">📍</span> {item.area}
                {item.landmark && (
                  <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-md italic">
                    near {item.landmark}
                  </span>
                )}
              </div>

              {/* Amenities Tags */}
              {item.amenities && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.amenities.split(',').map((tag: string, i: number) => (
                    <span key={i} className="text-[9px] font-black uppercase tracking-wider bg-slate-50 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-100">
                      ⚡ {tag.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a 
                  href={`https://wa.me/${item.phone}?text=Hi, I'm interested in your property: ${item.title}`}
                  className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all shadow-xl shadow-slate-100"
                >
                  Contact Owner
                </a>
                <button 
                   onClick={() => {
                    const text = `Check out this property in ${item.area}: ${item.title} for ₹${item.price}. Link: ${window.location.href}`;
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
  );
}