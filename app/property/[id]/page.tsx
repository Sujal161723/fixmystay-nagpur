"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../../lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function PropertyDetail() {
  const params = useParams();
  const id = params?.id;
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "properties", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such property!");
        }
      } catch (err) {
        console.error("Error fetching doc:", err);
      } finally {
        setLoading(false);
      }
    };
    getProperty();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-blue-600">Finding your perfect stay...</p>
    </div>
  );

  if (!property) return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h2 className="text-2xl font-black">Property Not Found!</h2>
      <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">Go Back Home</Link>
    </div>
  );

  // WhatsApp Message Logic
  const waMessage = encodeURIComponent(`Hello! I'm interested in "${property.title}" listed on FixMyStay. Is it still available?`);

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Navbar Overlay */}
      <div className="bg-white/80 backdrop-blur-md p-4 shadow-sm flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-xl">←</Link>
        <h1 className="font-black text-xl uppercase tracking-tighter text-blue-600">FixMyStay</h1>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4">
        {/* Image Section */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 border-4 border-white aspect-video relative">
          <img 
            src={property.imageUrl || "https://via.placeholder.com/800x400?text=No+Image+Available"} 
            alt={property.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-4 left-4">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-[12px] font-black uppercase shadow-lg">
              {property.category || "General"}
            </span>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-2">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-2">{property.title}</h2>
              <p className="text-slate-500 font-bold flex items-center gap-2">
                📍 {property.area} {property.landmark && <span className="text-blue-400">• Near {property.landmark}</span>}
              </p>
            </div>
            <div className="bg-blue-50 px-6 py-3 rounded-2xl">
                <p className="text-3xl font-black text-blue-600">₹{property.price}</p>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest text-center">Monthly Rent</p>
            </div>
          </div>

          <div className="h-[1px] bg-slate-100 w-full my-8"></div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em] mb-4">About this Property</h3>
            <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
              {property.description || "The owner hasn't added a detailed description yet, but this property in Nagpur is waiting for you!"}
            </p>
          </div>

          {/* Amenities */}
          <div className="mb-10">
            <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em] mb-4">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {property.amenities ? property.amenities.split(',').map((a: string, i: number) => (
                <span key={i} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
                  <span className="text-blue-500 text-lg">✓</span> {a.trim()}
                </span>
              )) : <p className="text-slate-400 text-sm italic">Standard amenities included</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sticky bottom-4 md:relative">
            <a href={`tel:${property.phone}`} className="bg-slate-900 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl hover:bg-black transition active:scale-95">
              CALL OWNER
            </a>
            <a 
              href={`https://wa.me/${property.phone}?text=${waMessage}`} 
              target="_blank" 
              className="bg-green-500 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl hover:bg-green-600 transition active:scale-95 flex items-center justify-center gap-2"
            >
              WHATSAPP OWNER
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}