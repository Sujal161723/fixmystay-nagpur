"use client";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

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
      alert("Welcome back, Boss! 😎");
      router.push("/admindashboard");
    } catch (error: any) {
      alert("Galti hai! Email/Password check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-[2rem] shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black text-center mb-8 uppercase italic">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="Admin Email" 
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 outline-none"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black hover:bg-blue-600 transition">
            {loading ? "Checking..." : "LOGIN"}
          </button>
        </form>
      </div>
    </div>
  );
}