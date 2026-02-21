"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { MessageCircle, Phone, Trash2, Calendar, MapPin, ExternalLink } from "lucide-react";

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Leads fetch karne ka function
  const fetchLeads = async () => {
    try {
      const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id: string) => {
    if(confirm("Bhai, pakka delete karna hai?")) {
      await deleteDoc(doc(db, "leads", id));
      fetchLeads(); // List refresh karo
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black italic tracking-tighter text-slate-900">ADMIN DASHBOARD</h1>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs">
            {leads.length} TOTAL LEADS
          </div>
        </div>

        {/* --- LEADS TABLE SECTION --- */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="font-black uppercase text-xs tracking-widest text-slate-400">Recent Inquiries</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Action</th>
                  <th className="px-6 py-4">Area</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800 text-sm line-clamp-1">{lead.propertyTitle}</p>
                      <p className="text-[10px] text-slate-400 font-medium">ID: {lead.propertyId?.slice(-6)}</p>
                    </td>
                    <td className="px-6 py-4">
                      {lead.action === "WhatsApp" ? (
                        <span className="flex items-center gap-1 text-green-600 font-black text-[10px] bg-green-50 px-2 py-1 rounded-md w-fit">
                          <MessageCircle size={12}/> WHATSAPP
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-blue-600 font-black text-[10px] bg-blue-50 px-2 py-1 rounded-md w-fit">
                          <Phone size={12}/> CALL
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-500 font-bold text-xs">
                        <MapPin size={12}/> {lead.area}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-400 font-medium text-[10px]">
                        <Calendar size={12}/> {lead.timestamp?.toDate().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => deleteLead(lead.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {leads.length === 0 && !loading && (
              <div className="p-20 text-center text-slate-400 font-bold italic">
                Abhi tak koi lead nahi aayi hai...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}