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
  const [category, setCategory] = useState("Flat");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nagpur_preset"); // Sujal, check kar lena Cloudinary mein preset name yahi hai na?

    // Yahan tera Cloud Name 'dtarhelmc' add kar diya hai
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
        title, price, phone, area, category,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Error ho gaya bhai! Check karo Cloudinary preset sahi hai kya.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col items-center py-10 px-4 text-black">
      <div className="max-w-4xl w-full mb-6">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          ← Back to Marketplace
        </Link>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Professional Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-800 p-10 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black mb-4 italic">List Your Property</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Nagpur ki sabse badi community ka hissa banein. Apni property ko 1 minute mein live karein.
            </p>
          </div>
          <div className="space-y-6 mt-10">
            <div className="flex items-center gap-4">
              <span className="bg-white/20 p-2 rounded-lg text-xl">📸</span>
              <p className="text-xs font-medium">High quality photos attract 3x more leads</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 p-2 rounded-lg text-xl">✅</span>
              <p className="text-xs font-medium">Verified listings rank higher in search</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="md:w-2/3 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Type</label>
                <select 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Flat">🏢 Flat / Apartment</option>
                  <option value="PG">🏠 PG / Hostel</option>
                  <option value="Shop">🏢 Shop / Office</option>
                  <option value="Plot">🌳 Plot / Land</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Expected Rent/Price (₹)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 15000" 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold outline-none"
                  onChange={(e) => setPrice(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Property Title</label>
              <input 
                type="text" 
                placeholder="e.g. Fully Furnished 2BHK in Dharampeth" 
                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold outline-none"
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Locality (Nagpur Area)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sadar, Civil Lines" 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold outline-none"
                  onChange={(e) => setArea(e.target.value)} 
                  required 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Owner Contact Number</label>
                <input 
                  type="tel" 
                  placeholder="98XXXXXXXX" 
                  className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all font-bold outline-none"
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                />
              </div>
            </div>

            {/* Upload Area */}
            <div className="relative border-2 border-dashed border-gray-200 p-8 rounded-[2rem] text-center hover:border-blue-500 transition-all group bg-gray-50">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e:any) => setImage(e.target.files[0])} 
              />
              <div className="flex flex-col items-center">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">🖼️</span>
                <p className="font-bold text-gray-600">Click to upload property image</p>
                {image && <p className="text-blue-600 font-bold mt-2 text-xs">Selected: {image.name}</p>}
              </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all active:scale-95 disabled:bg-gray-400"
            >
              {loading ? "UPLOADING TO MARKETPLACE..." : "LIST PROPERTY NOW"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}