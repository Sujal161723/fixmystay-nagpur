"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "properties", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (!property) return <div className="text-center py-20 font-bold">Property not found!</div>;

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      {/* Mini Navbar */}
      <nav className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-50">
        <h1 className="text-xl font-black text-blue-700 tracking-tighter uppercase">FixMyStay</h1>
        <button 
          onClick={() => router.push('/')}
          className="text-sm font-bold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Search
        </button>
      </nav>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Photo Gallery - Premium Grid */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[300px] md:h-[450px] mb-8 overflow-hidden rounded-3xl shadow-lg">
          <div className="col-span-2 row-span-2 bg-gray-100">
            <img 
              src={property.imageUrl || "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"} 
              className="w-full h-full object-cover hover:scale-105 transition duration-500" 
            />
          </div>
          <div className="col-span-1 bg-gray-100">
            <img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 bg-gray-100">
            <img src="https://images.unsplash.com/photo-1556912177-c54030639a6d?w=400" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 bg-gray-100">
            <img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 bg-slate-800 flex items-center justify-center text-sm font-black text-white cursor-pointer hover:bg-slate-700 transition">
            + 10 Photos
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Information Section */}
          <div className="flex-1">
            <div className="mb-6">
               <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest">
                  {property.category}
               </span>
               <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 leading-tight">
                 {property.title}
               </h2>
               <p className="text-gray-500 mt-2 font-bold text-lg flex items-center gap-1">
                 📍 {property.area}, Nagpur {property.landmark && <span className="text-blue-500 font-medium ml-1">• Near {property.landmark}</span>}
               </p>
            </div>
            
            <div className="flex gap-8 my-8 border-y py-8">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Expected Rent</p>
                <p className="text-2xl font-black text-blue-700">₹{property.price}<span className="text-sm text-gray-400 font-bold">/mo</span></p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Status</p>
                <p className="text-2xl font-black text-green-600">Verified</p>
              </div>
              <div className="hidden md:block">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Direct Deal</p>
                <p className="text-2xl font-black text-gray-800">No Broker</p>
              </div>
            </div>

            <h4 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Description
            </h4>
            <p className="text-gray-600 leading-relaxed font-medium text-lg">
              {property.description || `FixMyStay verified ${property.category} in ${property.area}. Perfect for those looking for a clean stay without any brokerage. Located in a prime location with all basic amenities nearby.`}
              {property.landmark && ` Close proximity to ${property.landmark} makes it a great choice.`}
            </p>

            {/* Amenities Grid */}
            <h4 className="text-xl font-black text-gray-800 mt-10 mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Amenities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
               {property.amenities?.split(',').map((item: string, i: number) => (
                 <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 font-bold text-sm text-gray-700 flex items-center gap-2 uppercase tracking-tighter">
                    <span className="text-blue-600 text-lg">✓</span> {item.trim()}
                 </div>
               ))}
            </div>
          </div>

          {/* Sticky Contact Box */}
          <div className="w-full md:w-80 h-fit sticky top-24 bg-white border-2 border-blue-50 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-100/50">
            <div className="text-center mb-6">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">👤</div>
               <h4 className="font-black text-gray-800 uppercase text-xs tracking-[0.2em]">Contact Direct</h4>
            </div>

            <div className="space-y-4">
              <a 
                href={`tel:${property.phone}`}
                className="w-full bg-blue-700 text-white py-4 rounded-2xl font-black shadow-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 active:scale-95"
              >
                📞 Call Owner
              </a>
              <a 
                href={`https://wa.me/${property.phone}?text=Hi, I found your ${property.title} on FixMyStay. Is it still available?`}
                target="_blank"
                className="w-full border-2 border-green-500 text-green-600 py-4 rounded-2xl font-black hover:bg-green-50 transition flex items-center justify-center gap-2 active:scale-95"
              >
                💬 WhatsApp
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
               <p className="text-[10px] text-center text-gray-400 font-bold italic tracking-tight">
                 "Direct property marketplace for Nagpur. No hidden charges."
               </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}