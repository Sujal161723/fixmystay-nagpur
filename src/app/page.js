import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button, Card, Badge } from '@/components/ui';

export default function Home() {
  const categories = [
    { title: 'Hotels', desc: 'Daily booking', link: '/search?category=hotels' },
    { title: 'PG', desc: 'Monthly stay', link: '/search?category=pg' },
    { title: 'Rooms', desc: 'Rent', link: '/search?category=rooms' },
    { title: 'Real Estate', desc: 'Rent/Sale', link: '/search?category=real-estate' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              Find your next home <br />
              <span className="text-primary">with confidence.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              The all-in-one platform for daily bookings, monthly PG stays, and property rentals or sales. Professional service, verified listings.
            </p>
            
            <div className="bg-white p-2 rounded-2xl border border-border shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
              <div className="flex-1 px-4 py-2">
                <span className="block text-xs font-bold uppercase text-muted-foreground mb-1">Location</span>
                <input 
                  type="text" 
                  placeholder="Where are you going?" 
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>
              <div className="flex-1 px-4 py-2 border-l border-border hidden md:block">
                <span className="block text-xs font-bold uppercase text-muted-foreground mb-1">Type</span>
                <select className="w-full bg-transparent outline-none font-medium appearance-none">
                  <option>Any Type</option>
                  <option>Hotel</option>
                  <option>PG</option>
                  <option>Room</option>
                </select>
              </div>
              <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 bg-accent">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="card p-8 bg-white hover:-translate-y-1 transition-transform cursor-pointer">
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cat.desc}</p>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Explore -{'>'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings Placeholder */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Listings</h2>
              <p className="text-muted-foreground">Handpicked properties for your comfort.</p>
            </div>
            <button className="text-primary font-bold text-sm">View All</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-muted rounded-2xl mb-4 overflow-hidden relative">
                   <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold">Premium PG for Professionals</h3>
                  <Badge variant="default">4.9 Rating</Badge>
                </div>
                <p className="text-muted-foreground text-sm mb-3 font-medium italic underline underline-offset-4 decoration-slate-200">Sector 44, Gurgaon</p>
                <div className="flex items-center gap-4">
                   <span className="text-xl font-black">Rs. 12,000</span>
                   <span className="text-muted-foreground text-sm">/ month</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
