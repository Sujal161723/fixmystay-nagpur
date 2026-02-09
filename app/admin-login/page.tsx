"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

// Is function ka naam aur 'export default' hona zaroori hai
export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin-dashboard");
    } catch (error: any) {
      alert("Galti hai bhai! Email/Password sahi dalo.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black mb-6 text-center italic">FIXMYSTAY ADMIN</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-slate-400 ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-4 mt-1 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:border-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-blue-600 transition disabled:bg-slate-400"
          >
            {loading ? "Chalu hai..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}