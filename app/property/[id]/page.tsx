"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase"; 
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import Link from "next/link";

export default function PropertyDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [similar, setSimilar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "properties", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProperty(data);
          // Fetch Similar Properties
          fetchSimilar(data.category, docSnap.id);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const fetchSimilar = async (category: string, currentId: string) => {
    const q = query(collection(db, "properties"), where("category", "==", category), limit(4));
    const querySnapshot = await getDocs(q);
    const list = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(item => item.id !== currentId);
    setSimilar(list);
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen font-black text-blue-600 animate-pulse">FIXMYSTAY...</div>;
  if (!property) return <div className="text-center py-20 font-bold">Property not found!</div>;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="min-h-screen bg-white pb-20 font-sans text-slate-900">
      
      {/* Floating WhatsApp Share Button */}
      <a 
        href={`https://wa.me/?text=Bhai, ye property dekh FixMyStay par: ${shareUrl}`}
        target="_blank"
        className="fixed bottom-8 right-8 z-[100] bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border-4 border-white"
      >
        <span className="text-3xl">💬</span>
      </a>

      {/* Mini Navbar */}
      <nav className="p-4 border-b flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <button onClick={() => router.back()} className="text-sm font-black flex items-center gap-1 text-slate-500 uppercase tracking-tighter">
          ← Back
        </button>
        <h1 className="text-xl font-black text-blue-700 tracking-tighter uppercase">FixMyStay</h1>
        <div className="w-10"></div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        
        {/* Gallery Section */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[300px] md:h-[500px] mb-10 overflow-hidden rounded-[2.5rem] shadow-2xl shadow-blue-100">
          <div className="col-span-4 md:col-span-2 row-span-2 bg-slate-100">
            <img src={property.imageUrl} className="w-full h-full object-cover" alt="Main" />
          </div>
          <div className="hidden md:block col-span-1 bg-slate-200"><img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" /></div>
          <div className="hidden md:block col-span-1 bg-slate-200"><img src="https://images.unsplash.com/photo-1556912177-c54030639a6d?w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" /></div>
          <div className="hidden md:block col-span-1 bg-slate-200"><img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition" /></div>
          <div className="hidden md:flex col-span-1 bg-slate-900 items-center justify-center text-xs font-black text-white uppercase tracking-widest cursor-pointer hover:bg-blue-600 transition">
            View All 
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Info */}
          <div className="flex-1">
            <div className="mb-8">
              <span className="bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]">
                {property.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mt-5 leading-tight tracking-tighter">
                {property.title}
              </h2>
              <p className="text-slate-400 mt-3 font-bold text-xl flex items-center gap-2">
                📍 {property.area}, Nagpur {property.landmark && <span className="text-blue-500 font-medium">• {property.landmark}</span>}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-10 my-10 border-y border-slate-100 py-10">
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Expected Rent</p>
                <p className="text-3xl font-black text-blue-600">₹{property.price}<span className="text-sm text-slate-300 ml-1">/mo</span></p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2">Brokerage</p>
                <p className="text-3xl font-black text-slate-800 tracking-tighter">₹0 <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded">FREE</span></p>
              </div>
            </div>

            <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              The Space
            </h4>
            <p className="text-slate-500 leading-relaxed font-medium text-lg mb-12">
              {property.description || `Modern and well-maintained ${property.category} located in the prime locality of ${property.area}. This property is verified by FixMyStay and offered directly by the owner. No middlemen, no extra charges.`}
            </p>

            {/* Amenities Outline Box */}
            <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-blue-600 rounded-full"></span>
              Facilities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
               {property.amenities?.split(',').map((item: string, i: number) => (
                 <div key={i} className="bg-white p-5 rounded-3xl border-2 border-slate-50 font-black text-[11px] text-slate-600 flex items-center gap-3 uppercase tracking-widest hover:border-blue-100 transition">
                    <span className="text-blue-600 text-lg">✓</span> {item.trim()}
                 </div>
               ))}
            </div>

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div className="mt-20">
                <h4 className="text-2xl font-black text-slate-900 mb-8 tracking-tighter italic">Recommended stays...</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similar.map((item) => (
                    <Link href={`/property/${item.id}`} key={item.id} className="group flex gap-4 bg-slate-50 p-4 rounded-[2rem] hover:bg-blue-50 transition border border-transparent hover:border-blue-100">
                      <img src={item.imageUrl} className="w-24 h-24 rounded-2xl object-cover" />
                      <div>
                        <p className="font-black text-slate-800 text-sm group-hover:text-blue-600 truncate max-w-[150px]">{item.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.area}</p>
                        <p className="text-blue-600 font-black mt-2 italic">₹{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Side Card */}
          <div className="w-full lg:w-96">
            <div className="sticky top-28 bg-[#1e293b] text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/20">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6 text-center">Owner Verified</p>
              
              <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-2xl">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-2xl">👤</div>
                <div>
                  <p className="font-black text-lg">Direct Contact</p>
                  <p className="text-xs text-slate-400 font-bold uppercase">Ready to Move</p>
                </div>
              </div>

              <div className="space-y-4">
                <a href={`tel:${property.phone}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[1.5rem] font-black text-center flex items-center justify-center gap-3 transition shadow-xl shadow-blue-600/20 active:scale-95">
                   CALL OWNER
                </a>
                <a 
                  href={`https://wa.me/${property.phone}?text=Hi, FixMyStay se aapka ad dekha: ${property.title}`} 
                  target="_blank"
                  className="w-full border-2 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white py-5 rounded-[1.5rem] font-black text-center flex items-center justify-center gap-3 transition active:scale-95"
                >
                  💬 WHATSAPP
                </a>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 text-center">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] leading-relaxed">
                  Avoid paying any "visit fees". Meet the owner directly at the location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}