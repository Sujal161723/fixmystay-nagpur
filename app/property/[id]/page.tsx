"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../../lib/firebase"; // Rasta check kar lena (../../ correct hai agar [id] folder ke andar ho)
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

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-blue-600 animate-bounce">Loading Property Details...</div>;
  if (!property) return <div className="h-screen flex items-center justify-center font-bold">Property Not Found! <Link href="/" className="ml-2 text-blue-500 underline">Go Back</Link></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Top Bar */}
      <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-50">
        <Link href="/" className="text-2xl">←</Link>
        <h1 className="font-black text-xl uppercase tracking-tighter">FixMyStay</h1>
      </div>

      <div className="max-w-4xl mx-auto mt-6 px-4">
        {/* Main Image */}
        <div className="rounded-[2rem] overflow-hidden shadow-xl mb-8 border-4 border-white">
          <img src={property.imageUrl} alt={property.title} className="w-full h-[400px] object-cover" />
        </div>

        {/* Content */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase">
              {property.category}
            </span>
            <p className="text-3xl font-black text-blue-600">₹{property.price}</p>
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2 leading-tight">{property.title}</h2>
          <p className="text-slate-500 font-bold mb-6 flex items-center gap-2">
            📍 {property.area} {property.landmark && <span className="text-blue-400">• Near {property.landmark}</span>}
          </p>

          <div className="h-[1px] bg-slate-100 w-full mb-8"></div>

          <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest mb-4">Amenities</h3>
          <div className="flex flex-wrap gap-3 mb-10">
            {property.amenities?.split(',').map((a: string, i: number) => (
              <span key={i} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl text-xs font-bold text-slate-600">
                ✓ {a.trim()}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href={`tel:${property.phone}`} className="bg-slate-900 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl active:scale-95 transition">
              CALL OWNER
            </a>
            <a href={`https://wa.me/${property.phone}?text=I am interested in your property: ${property.title}`} target="_blank" className="bg-green-500 text-white py-5 rounded-2xl font-black text-center text-lg shadow-xl active:scale-95 transition flex items-center justify-center gap-2">
              WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}