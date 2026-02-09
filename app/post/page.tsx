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
  const [landmark, setLandmark] = useState(""); // Naya: Landmark state
  const [amenities, setAmenities] = useState(""); // Naya: Amenities state
  const [category, setCategory] = useState("Flat");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nagpur_preset");

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
        landmark, // Landmark save ho raha hai
        amenities, // Amenities save ho rahi hai
        category,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error! Cloudinary preset check karo.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center py-10 px-4 text-black font-sans">
      <div className="max-w-4xl w-full mb-6 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          ← Back to Nagpur Properties
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white">
        
        {/* Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-br from-blue-700 to-indigo-900 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black mb-4 italic leading-tight">Post Your Ad Free</h2>
            <p className="text-blue-100 text-sm leading-relaxed opacity-80 font-medium">
              Find the perfect tenant or buyer in Nagpur today.
            </p>
          </div>
          <div className="mt-10 space-y-6">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-1">Visibility</p>
              <p className="text-lg font-bold">Direct to Students & Families</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Category</label>
                <select 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none cursor-pointer"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Flat">🏢 Flat / Apartment</option>
                  <option value="PG">🏠 PG / Hostel</option>
                  <option value="Shop">🛍️ Shop / Office</option>
                  <option value="Plot">🌳 Plot / Land</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Price / Rent (₹)</label>
                <input type="number" placeholder="e.g. 12000" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none text-blue-600" onChange={(e) => setPrice(e.target.value)} required />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Property Title</label>
              <input type="text" placeholder="e.g. Luxury 2BHK with Balcony" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none" onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Locality (Nagpur Area)</label>
                <input type="text" placeholder="e.g. Manish Nagar" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none" onChange={(e) => setArea(e.target.value)} required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">WhatsApp Number</label>
                <input type="tel" placeholder="9876543210" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none" onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>

            {/* NAYA SECTION: LANDMARK & AMENITIES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nearby Landmark</label>
                <input type="text" placeholder="e.g. 2 min from Metro Station" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none" onChange={(e) => setLandmark(e.target.value)} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Facilities / Amenities</label>
                <input type="text" placeholder="e.g. WiFi, Lift, RO Water" className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-100 focus:border-blue-500 transition-all font-bold outline-none" onChange={(e) => setAmenities(e.target.value)} />
              </div>
            </div>

            {/* Image Upload */}
            <div className="relative border-2 border-dashed border-blue-200 p-8 rounded-[2rem] text-center hover:border-blue-500 transition-all group bg-blue-50/30 overflow-hidden min-h-[140px] flex items-center justify-center">
              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" onChange={(e:any) => setImage(e.target.files[0])} />
              <div className="flex flex-col items-center">
                {image ? (
                  <div className="relative z-10">
                    <img src={URL.createObjectURL(image)} className="h-24 w-auto rounded-xl shadow-lg border-2 border-white" alt="Preview" />
                    <p className="text-blue-600 font-black mt-2 text-[10px] uppercase">Change Photo</p>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                      <span className="text-2xl">📸</span>
                    </div>
                    <p className="font-bold text-gray-700 text-sm">Add Property Photo</p>
                  </>
                )}
              </div>
            </div>

            <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-[1.5rem] font-black text-xl shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:bg-gray-400 flex items-center justify-center gap-3">
              {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> LISTING... </> : "PUBLISH AD NOW"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}