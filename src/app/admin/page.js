export default function AdminDashboard() {
  const stats = [
    { label: 'Total Listings', value: '1,284' },
    { label: 'Active Users', value: '8,432' },
    { label: 'Pending Approvals', value: '42' },
    { label: 'Monthly Revenue', value: 'Rs. 8.4L' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-secondary text-white p-6 hidden lg:block">
        <div className="text-xl font-black mb-12 tracking-tight">FIXMYSTAY ADMIN</div>
        <nav className="space-y-6">
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-500 mb-4 tracking-widest">Management</span>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg text-sm">Dashboard Overview</button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors rounded-lg text-sm font-medium text-slate-300">Manage Listings</button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors rounded-lg text-sm font-medium text-slate-300">User Directory</button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors rounded-lg text-sm font-medium text-slate-300">Booking Reports</button>
            </div>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase text-slate-500 mb-4 tracking-widest">Settings</span>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors rounded-lg text-sm font-medium text-slate-300">Platform Fees</button>
              <button className="w-full text-left px-4 py-2 hover:bg-white/5 transition-colors rounded-lg text-sm font-medium text-slate-300">Support Tickets</button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-slate-800">System Overview</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-500 italic font-medium">Administrator</span>
            <div className="w-10 h-10 bg-slate-200 rounded-full border border-slate-300"></div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2 tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Pending Property Approvals</h2>
            <button className="text-primary text-xs font-bold uppercase tracking-widest">View All -{'>'}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-500">
                <tr>
                  <th className="p-4 border-b border-slate-100">Property Name</th>
                  <th className="p-4 border-b border-slate-100">Type</th>
                  <th className="p-4 border-b border-slate-100">Location</th>
                  <th className="p-4 border-b border-slate-100">Price</th>
                  <th className="p-4 border-b border-slate-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[1, 2, 3].map(i => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 border-b border-slate-50 font-bold text-slate-700">Skyline Apartments</td>
                    <td className="p-4 border-b border-slate-50 text-slate-600 italic">Real Estate</td>
                    <td className="p-4 border-b border-slate-50 text-slate-600">Mumbai, MH</td>
                    <td className="p-4 border-b border-slate-50 font-bold text-slate-900">Rs. 85,000</td>
                    <td className="p-4 border-b border-slate-50 text-right">
                      <button className="text-green-600 font-bold mr-4 text-xs uppercase tracking-widest">Approve</button>
                      <button className="text-red-600 font-bold text-xs uppercase tracking-widest">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
