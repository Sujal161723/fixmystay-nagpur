import Navbar from '@/components/shared/Navbar';

export default function DetailPage() {
  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      <main className="container-custom py-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Grand Heritage Hotel & Suites</h1>
            <p className="text-muted-foreground">Civil Lines, Jaipur, Rajasthan - 302001</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-outline py-2 px-4 text-sm flex items-center gap-2">Share</button>
            <button className="btn-outline py-2 px-4 text-sm flex items-center gap-2">Save</button>
          </div>
        </div>

        {/* Gallery Placeholder */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
          <div className="col-span-2 row-span-2 bg-muted rounded-l-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-300"></div>
          </div>
          <div className="bg-muted relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200"></div>
          </div>
          <div className="bg-muted rounded-tr-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200"></div>
          </div>
          <div className="bg-muted relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200"></div>
          </div>
          <div className="bg-muted rounded-br-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2">
            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                Experience luxury and comfort in the heart of the city. Our suites are designed with a blend of traditional 
                aesthetics and modern amenities. Perfect for both business travelers and families looking for a premium stay.
                Located just 15 minutes from the airport and walking distance to major heritage sites.
              </p>
            </div>

            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {['High-speed WiFi', 'Swimming Pool', '24/7 Room Service', 'Secure Parking', 'Fitness Center', 'Mini Bar'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pb-8">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <div className="aspect-video bg-muted rounded-2xl relative overflow-hidden border border-border">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                   <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">Interactive Map Location</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="relative">
            <div className="card p-8 sticky top-32 shadow-2xl border-primary/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-3xl font-black italic">Rs. 4,500</span>
                  <span className="text-muted-foreground text-sm ml-1">/ night</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">4.9 Rating</div>
                  <div className="text-xs text-muted-foreground">128 reviews</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex border-b border-border">
                    <div className="flex-1 p-3 border-r border-border">
                      <span className="block text-[10px] font-black uppercase text-muted-foreground">Check-in</span>
                      <input type="text" placeholder="Add date" className="text-sm outline-none w-full bg-transparent" />
                    </div>
                    <div className="flex-1 p-3">
                      <span className="block text-[10px] font-black uppercase text-muted-foreground">Check-out</span>
                      <input type="text" placeholder="Add date" className="text-sm outline-none w-full bg-transparent" />
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="block text-[10px] font-black uppercase text-muted-foreground">Guests</span>
                    <select className="text-sm outline-none w-full bg-transparent appearance-none">
                      <option>1 guest</option>
                      <option>2 guests</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full py-4 rounded-xl font-bold mb-4">Book Now</button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="btn-outline w-full py-3 rounded-xl font-bold text-xs">WhatsApp</button>
                <button className="btn-outline w-full py-3 rounded-xl font-bold text-xs">Call Host</button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6 italic">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
