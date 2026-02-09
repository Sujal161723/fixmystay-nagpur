"use client";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [amenities, setAmenities] = useState("");
  const [category, setCategory] = useState("Flat");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nagpur_preset"); // Check your preset name

    const res = await fetch("https://api.cloudinary.com/v1_1/dtarhelmc/image/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrl = await handleUpload();
      await addDoc(collection(db, "properties"), {
        title, 
        price, 
        phone, 
        area, 
        landmark, 
        amenities, 
        category,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error! Please check Cloudinary preset and connection.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center py-12 px-4 text-slate-900 font-sans">
      
      {/* Top Navigation */}
      <div className="max-w-4xl w-full mb-8 flex items-center">
        <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-bold text-sm">
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span> 
          BACK TO HOME
        </Link>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col md:flex-row border border-slate-100">
        
        {/* Sidebar Info */}
        <div className="md:w-[35%] bg-[#1e293b] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Sketch Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-40 h-40 border border-white/5 rounded-full"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-6 leading-tight">Post Your <br/><span className="text-blue-400 font-outline">Property</span></h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Nagpur's most trusted platform for direct deals. Zero brokerage, 100% verified leads.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Verified Buyers
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-300">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Direct WhatsApp
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-[65%] p-10 md:p-14">
          <form onSubmit={handleSubmit} className="space-y-7">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Type</label>
                <select 
                  className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none appearance-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Flat">Flat / Apartment</option>
                  <option value="PG">PG / Hostel</option>
                  <option value="Shop">Shop / Office</option>
                  <option value="Plot">Plot / Land</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Rent / Price (₹)</label>
                <input type="number" placeholder="12,000" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setPrice(e.target.value)} required />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Property Title</label>
              <input type="text" placeholder="e.g. Modern 2BHK near Pratap Nagar" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Area / Locality</label>
                <input type="text" placeholder="Manish Nagar" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setArea(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">WhatsApp No.</label>
                <input type="tel" placeholder="91XXXXXXXX" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Landmark</label>
                <input type="text" placeholder="Near Metro Pillar 45" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setLandmark(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Facilities</label>
                <input type="text" placeholder="WiFi, Lift, Gym" className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white transition-all font-bold outline-none" onChange={(e) => setAmenities(e.target.value)} />
              </div>
            </div>

            {/* MINIMAL OUTLINE SKETCH UPLOAD BOX */}
            <div className="space-y-2">
               <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Visuals</label>
               <div className="relative border-2 border-slate-200 border-dashed rounded-[2rem] p-10 text-center transition-all hover:border-blue-400 hover:bg-blue-50/30 group cursor-pointer overflow-hidden">
                <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30" onChange={(e:any) => setImage(e.target.files[0])} />
                
                {image ? (
                  <div className="flex items-center justify-center gap-4">
                    <img src={URL.createObjectURL(image)} className="h-16 w-16 object-cover rounded-xl border border-slate-200 shadow-sm" alt="Preview" />
                    <div className="text-left">
                      <p className="text-sm font-black text-slate-700 truncate max-w-[200px]">{image.name}</p>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest cursor-pointer">Tap to change</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {/* Outline Sketch Styled Box Icon */}
                    <div className="w-14 h-10 border-2 border-slate-300 rounded-md relative flex items-center justify-center">
                       <div className="w-4 h-4 border-2 border-slate-300 rounded-full"></div>
                       <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-white border-2 border-slate-300 rounded-full"></div>
                    </div>
                    <p className="font-bold text-slate-400 text-sm tracking-tight">Upload Property Sketch/Photo</p>
                  </div>
                )}
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-slate-900 hover:bg-blue-700 text-white p-5 rounded-[1.5rem] font-black text-lg transition-all active:scale-[0.98] disabled:bg-slate-300 flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
            >
              {loading ? "PROCESSING..." : "LIST PROPERTY"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}