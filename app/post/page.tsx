"use client";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function PostAd() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!image) return "";
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "nagpur_preset"); // Wahi preset jo banaya tha

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
        title, price, phone, area,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      router.push("/");
    } catch (err) {
      alert("Error ho gaya bhai!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white min-h-screen text-black">
      <h1 className="text-3xl font-black mb-6 italic text-blue-700">Add Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Ghar ka naam (e.g. 2BHK flat)" className="w-full p-4 border-2 rounded-2xl" onChange={(e) => setTitle(e.target.value)} required />
        <input type="number" placeholder="Rent Kitna hai?" className="w-full p-4 border-2 rounded-2xl" onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Area (e.g. Itwari, Sitabuldi)" className="w-full p-4 border-2 rounded-2xl" onChange={(e) => setArea(e.target.value)} required />
        <input type="tel" placeholder="Owner ka Phone Number" className="w-full p-4 border-2 rounded-2xl" onChange={(e) => setPhone(e.target.value)} required />
        
        <div className="border-2 border-dashed p-4 rounded-2xl text-center">
          <input type="file" onChange={(e:any) => setImage(e.target.files[0])} className="text-sm" />
          <p className="text-[10px] mt-2 text-gray-400">Ghar ki ek mast photo dalo</p>
        </div>

        <button disabled={loading} className="w-full bg-blue-700 text-white p-4 rounded-2xl font-bold">
          {loading ? "Ruko bhai, upload ho raha hai..." : "POST PROPERTY"}
        </button>
      </form>
    </div>
  );
}