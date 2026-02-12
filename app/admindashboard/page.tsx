"use client";
import { useEffect, useState } from "react";
import { db, auth, storage } from "../lib/firebase"; 
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, LogOut, Trash2, MapPin, IndianRupee, 
  Home, Search, PlusCircle, X, Upload, Loader2 
} from "lucide-react";

export default function AdminDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal control
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({ title: "", area: "Manish Nagar", price: "", description: "" });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  // 1. Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) router.push("/adminlogin");
      else setUser(currentUser);
    });
    return () => unsubscribe();
  }, [router]);

  // 2. Real-time Data Fetch
  useEffect(() => {
    const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProperties(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // 3. Handle Add Property
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `properties/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "properties"), {
        ...formData,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setIsModalOpen(false);
      setPreview(null);
      setImage(null);
      alert("Property Added!");
    } catch (err) {
      alert("Error adding property");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Property delete karni hai?")) await deleteDoc(doc(db, "properties", id));
  };

  if (!user) return <div className="p-10 text-center font-bold">Checking Access...</div>;

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10"><Home className="text-blue-600"/><h1 className="font-black text-xl">FIXMYSTAY</h1></div>
        <nav className="space-y-2 flex-1">
          <div className="flex items-center gap-3 bg-blue-50 text-blue-600 p-3 rounded-xl font-bold cursor-pointer"><LayoutDashboard size={20}/> Dashboard</div>
        </nav>
        <button onClick={() => signOut(auth)} className="text-red-500 font-bold p-3 flex items-center gap-2"><LogOut size={20}/> Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight italic uppercase">Property Control</h2>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100"
          >
            <PlusCircle size={20}/> Add Property
          </button>
        </div>

        {/* Property Table */}
        <div className="bg-white rounded-[2rem] border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b">
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <th className="p-6">Property Details</th>
                <th className="p-6">Area</th>
                <th className="p-6">Price</th>
                <th className="p-6 text-center">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {properties.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition">
                  <td className="p-6 flex items-center gap-4">
                    <img src={item.imageUrl} className="w-14 h-14 rounded-xl object-cover" />
                    <p className="font-bold text-slate-800">{item.title}</p>
                  </td>
                  <td className="p-6 text-slate-500 font-semibold">{item.area}</td>
                  <td className="p-6 font-black text-blue-600 italic">₹{item.price}</td>
                  <td className="p-6 text-center">
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600"><Trash2 size={20}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- ADD PROPERTY MODAL --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative animate-in fade-in zoom-in duration-200">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 bg-slate-100 rounded-full"><X size={20}/></button>
              <h3 className="text-xl font-black mb-6 italic uppercase tracking-tighter">New Property</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl h-32 flex flex-col items-center justify-center relative overflow-hidden">
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover" />
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center text-slate-400">
                      <Upload size={24}/>
                      <span className="text-[10px] font-bold uppercase mt-2">Upload Photo</span>
                      <input type="file" className="hidden" onChange={handleImageChange} required />
                    </label>
                  )}
                </div>
                <input required className="w-full p-4 bg-slate-50 rounded-xl outline-none text-sm font-bold" placeholder="Property Title" onChange={e => setFormData({...formData, title: e.target.value})} />
                <input required type="number" className="w-full p-4 bg-slate-50 rounded-xl outline-none text-sm font-bold" placeholder="Price (₹)" onChange={e => setFormData({...formData, price: e.target.value})} />
                <button disabled={loading} className="w-full bg-blue-600 text-white p-4 rounded-xl font-black flex items-center justify-center gap-2 transition hover:bg-blue-700">
                  {loading ? <Loader2 className="animate-spin"/> : "PUBLISH NOW"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}