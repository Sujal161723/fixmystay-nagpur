"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
// Outline Icons only
import { Phone, MessageCircle, MapPin, Check, Share2, ChevronLeft, Info, Wind } from "lucide-react";

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
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    getProperty();
  }, [id]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Details</p>
      </div>
    </div>
  );

  if (!property) return <div className="h-screen flex items-center justify-center font-bold">Property Not Found!</div>;

  const waMessage = encodeURIComponent(`Hello FixMyStay, I am interested in "${property.title}". Is it available?`);

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-28">
      
      {/* --- MINIMALIST NAV --- */}
      <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100 p-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-xl transition border border-slate-100"><ChevronLeft size={20}/></Link>
          <span className="font-black text-lg tracking-tighter italic">FIXMYSTAY</span>
          <button className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100"><Share2 size={18}/></button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* --- LEFT: MAIN CONTENT (8 Cols) --- */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Gallery Section - Open Layout */}
            <div className="rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-sm">
              <img src={property.imageUrl} alt={property.title} className="w-full h-[450px] object-cover hover:scale-[1.01] transition-transform duration-500" />
            </div>

            {/* Header Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  {property.category}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">{property.title}</h2>
              <div className="flex items-center gap-2 text-slate-500 font-semibold text-base">
                <MapPin size={18} className="text-slate-400" /> {property.area} {property.landmark && <span className="text-slate-300">|</span>} {property.landmark}
              </div>
            </div>

            <div className="h-[1px] bg-slate-100 w-full"></div>

            {/* Description Section - High Readability */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Info size={18} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Property Overview</h3>
              </div>
              <p className="text-slate-600 text-lg leading-relaxed max-w-3xl font-medium">
                {property.description}
              </p>
            </div>

            {/* Amenities Section - Grid Outline */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-blue-600">
                <Wind size={18} />
                <h3 className="font-black uppercase text-xs tracking-[0.2em]">Key Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {property.amenities?.split(',').map((a: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-5 border border-slate-100 rounded-2xl bg-white hover:border-blue-200 transition-colors">
                    <div className="bg-blue-50 p-1.5 rounded-full"><Check size={14} className="text-blue-600" /></div>
                    <span className="font-bold text-slate-700 text-sm tracking-tight">{a.trim()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* --- RIGHT: STICKY BOOKING (4 Cols) --- */}
          <div className="lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32 bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 space-y-8">
              <div className="space-y-1">
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.2em]">Monthly Rent</p>
                <h4 className="text-5xl font-black text-slate-900 tracking-tighter">₹{property.price}<span className="text-lg text-slate-300 font-normal">/mo</span></h4>
              </div>

              <div className="space-y-4">
                <a href={`tel:${property.phone}`} className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm hover:bg-black transition-all active:scale-[0.98]">
                  <Phone size={18} /> CALL OWNER
                </a>
                <a href={`https://wa.me/${property.phone}?text=${waMessage}`} target="_blank" className="flex items-center justify-center gap-3 w-full border-2 border-slate-900 text-slate-900 py-5 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all active:scale-[0.98]">
                  <MessageCircle size={18} /> WHATSAPP INQUIRY
                </a>
              </div>
              
              <div className="pt-6 border-t border-slate-50">
                <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-widest">Listing ID: {id?.slice(-8).toUpperCase()}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- MOBILE FLOATING BAR (Clean Outline) --- */}
      <div className="lg:hidden fixed bottom-8 left-6 right-6 z-[100] bg-slate-900 text-white p-2 rounded-[2rem] shadow-2xl flex items-center">
        <a href={`tel:${property.phone}`} className="flex-1 flex items-center justify-center gap-2 py-4 font-black text-xs border-r border-white/10">
          <Phone size={16} /> CALL
        </a>
        <a href={`https://wa.me/${property.phone}?text=${waMessage}`} target="_blank" className="flex-1 flex items-center justify-center gap-2 py-4 font-black text-xs">
          <MessageCircle size={16} /> WHATSAPP
        </a>
      </div>

    </div>
  );
}