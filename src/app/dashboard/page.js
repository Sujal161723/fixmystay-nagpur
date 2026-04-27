import Navbar from '@/components/shared/Navbar';

export default function Dashboard() {
  const stats = [
    { label: 'Active Bookings', value: '03' },
    { label: 'Saved Items', value: '12' },
    { label: 'Total Spent', value: 'Rs. 45,200' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-accent/30">
      <Navbar />
      
      <main className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 space-y-2">
             <button className="w-full text-left px-6 py-3 bg-white border border-border rounded-xl font-bold text-sm text-primary">Personal Info</button>
             <button className="w-full text-left px-6 py-3 hover:bg-white transition-colors rounded-xl font-medium text-sm text-muted-foreground">My Bookings</button>
             <button className="w-full text-left px-6 py-3 hover:bg-white transition-colors rounded-xl font-medium text-sm text-muted-foreground">Saved Listings</button>
             <button className="w-full text-left px-6 py-3 hover:bg-white transition-colors rounded-xl font-medium text-sm text-muted-foreground">Payments</button>
             <button className="w-full text-left px-6 py-3 hover:bg-white transition-colors rounded-xl font-medium text-sm text-muted-foreground border-t border-border mt-4">Sign Out</button>
          </aside>

          {/* Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-8">Welcome back, User</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {stats.map(stat => (
                <div key={stat.label} className="card p-6 bg-white">
                  <span className="block text-xs font-bold text-muted-foreground uppercase mb-2">{stat.label}</span>
                  <span className="text-2xl font-black">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white border border-border rounded-2xl p-8">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[1, 2].map(i => (
                  <div key={i} className="flex items-center justify-between pb-6 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-muted rounded-lg"></div>
                      <div>
                        <h3 className="font-bold">Heritage Jaipur Hotel</h3>
                        <p className="text-xs text-muted-foreground font-medium italic">Confirmed - Check-in: 12 Oct 2024</p>
                      </div>
                    </div>
                    <button className="text-primary font-bold text-xs">View Receipt</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
