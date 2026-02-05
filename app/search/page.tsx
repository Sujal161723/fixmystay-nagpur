import PropertyCard from '../../components/PropertyCard';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Mini Header */}
      <nav className="p-4 border-b bg-white flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-xl font-bold text-blue-700">FixMyStay</h1>
        <div className="flex-1 max-w-md mx-10">
          <input 
            type="text" 
            placeholder="Search Nagpur Areas..." 
            className="w-full border p-2 rounded-lg text-sm outline-none focus:border-blue-500"
          />
        </div>
        <button className="text-sm font-bold text-gray-700">Login</button>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-6">
        
        {/* LEFT SIDE: FILTERS */}
        <aside className="w-full md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4">Filters</h3>
            
            {/* Budget Filter */}
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">Budget</p>
              <select className="w-full border p-2 rounded text-sm text-gray-700">
                <option>Any Budget</option>
                <option>Under ₹10,000</option>
                <option>₹10k - ₹20k</option>
                <option>Above ₹20k</option>
              </select>
            </div>

            {/* BHK Filter */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-2">BHK Type</p>
              <div className="space-y-2">
                {['1 BHK', '2 BHK', '3 BHK', 'Plot'].map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded" /> {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: RESULTS */}
        <section className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600 text-sm">Showing 12 properties in <span className="font-bold text-black">Nagpur</span></p>
            <select className="text-sm border-none bg-transparent font-bold text-blue-600 outline-none">
              <option>Newest First</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyCard price="12,500" title="Luxury 2BHK Near Metro" area="Manish Nagar" />
            <PropertyCard price="8,000" title="Furnished PG for Boys" area="Hingna" />
            <PropertyCard price="18,000" title="3BHK Semi-Furnished" area="Dharampeth" />
            <PropertyCard price="6,500" title="Studio Room" area="Pratap Nagar" />
            <PropertyCard price="25,000" title="Office Space" area="Wardha Road" />
            <PropertyCard price="9,000" title="Single Room" area="Somalwada" />
          </div>
        </section>
      </div>
    </main>
  );
}