"use client";
import { useState } from "react";
// Path check kar lena, agar lib folder app ke andar hai toh yahi rahega
import { db } from "../lib/firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function PostProperty() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState(""); // Naya phone state
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Data ko Firestore mein bhej rahe hain
      await addDoc(collection(db, "properties"), {
        title,
        price: Number(price),
        area,
        phone, // Phone number database mein jayega
        city: "Nagpur",
        createdAt: new Date()
      });

      alert("Mubarak ho! Nagpur ki property live ho gayi. 🎉");
      router.push("/"); // Post hote hi Home page par bhej dega
    } catch (err) {
      console.error("Firebase Error:", err);
      alert("Oops! Data save nahi ho paya. Ek baar internet check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <div className="max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black text-blue-700 tracking-tighter italic">FixMyStay</h1>
          <p className="text-gray-500 font-medium">Post your property in Nagpur</p>
        </div>
        
        <div className="bg-white border-2 border-gray-100 p-6 rounded-[2rem] shadow-xl">
          <form onSubmit={handlePost} className="space-y-4">
            
            {/* Property Title */}
            <div>
              <label className="text-[10px] font-bold text-blue-600 uppercase ml-2">Property Name</label>
              <input 
                required 
                placeholder="e.g. Semi-Furnished 2BHK" 
                className="w-full mt-1 bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
              />
            </div>

            {/* Price & Locality Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-blue-600 uppercase ml-2">Monthly Rent (₹)</label>
                <input 
                  required 
                  type="number" 
                  placeholder="10000" 
                  className="w-full mt-1 bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-blue-600 uppercase ml-2">Area (Nagpur)</label>
                <input 
                  required 
                  placeholder="e.g. Sadar" 
                  className="w-full mt-1 bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                  value={area} 
                  onChange={(e) => setArea(e.target.value)} 
                />
              </div>
            </div>

            {/* Phone Number Field */}
            <div>
              <label className="text-[10px] font-bold text-blue-600 uppercase ml-2">WhatsApp / Phone No.</label>
              <input 
                required 
                type="tel"
                placeholder="91xxxxxxxx" 
                className="w-full mt-1 bg-gray-50 border-none p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            
            <button 
              disabled={loading} 
              className={`w-full py-5 mt-4 rounded-2xl font-black text-lg transition-all transform active:scale-95 shadow-lg ${
                loading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200'
              }`}
            >
              {loading ? "SAVING TO CLOUD..." : "POST PROPERTY"}
            </button>
          </form>
        </div>
        
        <p className="text-center mt-6 text-gray-400 text-xs">
          By posting, you agree to show your contact to buyers.
        </p>
      </div>
    </main>
  );
}