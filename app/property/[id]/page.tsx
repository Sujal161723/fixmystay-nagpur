"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase"; 
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, Check, ChevronLeft, Share2, Home, Maximize, Layers, Calendar, User, ShieldCheck } from "lucide-react";

export default function PropertyDetail() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProperty = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "properties", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    getProperty();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center bg-white italic font-black text-slate-400 uppercase tracking-widest">Loading Property...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center font-bold">Property Not Found!</div>;

  const waMessage = encodeURIComponent(`Hi, I'm interested in "${property.title}" (Ref: ${id?.slice(-6)}) on FixMyStay.`);

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 pb-20">
      
      {/* --- TOP NAV --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-1 text-slate-500 font-bold text-sm"><ChevronLeft size={20}/> Back</Link>
          <div className="font-black text-xl italic tracking-tighter text-blue-700">FIXMYSTAY</div>
          <button className="text-slate-500"><Share2 size={20}/></button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto mt-6 px-4">
        
        {/* --- MAIN HEADER --- */}
        <div className="bg-white p-6 rounded-t-3xl border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-700 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Ready to Move</span>
              <span className="text-slate-400 text-xs font-bold">Updated Just Now</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 leading-tight">{property.title}</h1>
            <p className="flex items-center gap-1 text-slate-500 font-semibold mt-1 italic text-sm">
              <MapPin size={14}/> {property.area}, Nagpur, Maharashtra
            </p>
          </div>
          <div className="text-left md:text-right">
            <h2 className="text-4xl font-black text-blue-700 tracking-tighter">₹{property.price}</h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Per Month Rent</p>
          </div>
        </div>

        {/* --- IMAGE & QUICK INFO GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 bg-white border-x border-b border-slate-200 rounded-b-3xl overflow-hidden shadow-sm">
          {/* Main Image */}
          <div className="lg:col-span-7 bg-slate-100">
            <img src={property.imageUrl} className="w-full h-[400px] object-cover" alt="property" />
          </div>

          {/* Quick Facts Grid (99acres style) */}
          <div className="lg:col-span-5 p-8 grid grid-cols-2 gap-y-8 gap-x-4 bg-white self-center">
            <QuickFact icon={<Home size={20}/>} label="Configuration" value={property.category || "Flat"} />
            <QuickFact icon={<Maximize size={20}/>} label="Landmark" value={property.landmark || "Nagpur City"} />
            <QuickFact icon={<Layers size={20}/>} label="Furnishing" value="Semi-Furnished" />
            <QuickFact icon={<Calendar size={20}/>} label="Available From" value="Immediately" />
            <QuickFact icon={<User size={20}/>} label="Posted By" value="Owner" />
            <QuickFact icon={<ShieldCheck size={20}/>} label="Security Deposit" value={`₹${Number(property.price) * 2}`} />
          </div>
        </div>

        {/* --- DETAILED DESCRIPTION --- */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black mb-4 border-b pb-4 text-slate-900 uppercase tracking-tighter italic">About Property</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                {property.description || "Well maintained property in a prime location of Nagpur. Close to public transport and local markets."}
              </p>
            </div>

            {/* Amenities Tag Cloud */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black mb-6 border-b pb-4 text-slate-900 uppercase tracking-tighter italic">Amenities & Features</h3>
              <div className="flex flex-wrap gap-3">
                {property.amenities?.split(',').map((item: string, i: number) => (
                  <span key={i} className="bg-slate-50 border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-50 hover:border-blue-200 transition-all cursor-default flex items-center gap-2">
                    <Check size={14} className="text-blue-600"/> {item.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* --- CONTACT STICKY SIDEBAR --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white p-8 rounded-3xl shadow-xl shadow-blue-100 border-2 border-blue-50 space-y-6">
              <div className="flex items-center gap-4 border-b pb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><User size={32}/></div>
                <div>
                  <h4 className="font-black text-lg">Property Owner</h4>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Verified Listing</p>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                  <Phone size={18}/> VIEW PHONE NUMBER
                </button>
                <a href={`https://wa.me/${property.phone}?text=${waMessage}`} target="_blank" className="w-full border-2 border-green-500 text-green-600 py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-50 transition-all active:scale-95">
                  <MessageCircle size={18}/> CONTACT ON WHATSAPP
                </a>
              </div>

              <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">REF ID: {id?.slice(-8).toUpperCase()}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Fact Component
function QuickFact({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-sm font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}