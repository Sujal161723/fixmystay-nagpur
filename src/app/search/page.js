import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Badge, Button } from '@/components/ui';

export default function Search() {
  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      <div className="border-b border-border bg-white sticky top-20 z-40">
        <div className="container-custom py-4 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full whitespace-nowrap">Price Range</button>
          <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent">Property Type</button>
          <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent">Amenities</button>
          <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent">Distance</button>
          <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent">More Filters</button>
        </div>
      </div>

      <main className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Results List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight">342 results found</h1>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-muted-foreground">Sort by:</span>
                <select className="bg-transparent font-bold text-sm outline-none cursor-pointer">
                  <option>Popularity</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="card group flex flex-col md:flex-row h-full md:h-64 border-slate-100">
                  <div className="w-full md:w-80 bg-muted relative overflow-hidden">
                    <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Badge variant="primary">Verified PG Stay</Badge>
                          <h2 className="text-xl font-bold mt-2">The Luxury Hive - Studio Units</h2>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black">4.8</span>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">Rating</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 italic font-medium">500m from Metro Station, HSR Layout, Bangalore</p>
                      <div className="flex gap-2 mb-4">
                        <Badge>WiFi</Badge>
                        <Badge>AC</Badge>
                        <Badge>Meals</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-end border-t border-slate-50 pt-4">
                      <div>
                        <span className="text-2xl font-black">Rs. 15,500</span>
                        <span className="text-muted-foreground text-xs ml-1 font-bold">/ month</span>
                      </div>
                      <Button className="py-2 px-6 text-sm font-bold">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Sidebar Placeholder */}
          <div className="hidden lg:block w-[400px] bg-muted rounded-2xl sticky top-40 h-[calc(100vh-200px)] overflow-hidden border border-border">
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-muted-foreground font-bold tracking-widest uppercase">Map View Interface</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
