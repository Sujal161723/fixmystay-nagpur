export default function PropertyDetail() {
  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Mini Navbar */}
      <nav className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-50">
        <h1 className="text-xl font-bold text-blue-700">FixMyStay</h1>
        <button className="text-sm font-bold bg-blue-600 text-white px-4 py-2 rounded">Back to Search</button>
      </nav>

      <div className="max-w-5xl mx-auto p-4 md:p-8">
        {/* Photo Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px] mb-8 overflow-hidden rounded-2xl">
          <div className="col-span-2 row-span-2 bg-gray-200">
            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" className="w-full h-full object-cover" />
          </div>
          <div className="col-span-1 bg-gray-200"><img src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400" className="w-full h-full object-cover" /></div>
          <div className="col-span-1 bg-gray-200"><img src="https://images.unsplash.com/photo-1556912177-c54030639a6d?w=400" className="w-full h-full object-cover" /></div>
          <div className="col-span-1 bg-gray-200"><img src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400" className="w-full h-full object-cover" /></div>
          <div className="col-span-1 bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">+ 10 Photos</div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Information Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900">2BHK Luxury Flat in Manish Nagar</h2>
            <p className="text-gray-500 mt-2 font-medium">Near Metro Station, Nagpur</p>
            
            <div className="flex gap-8 my-8 border-y py-6">
              <div><p className="text-xs text-gray-400 font-bold uppercase">Rent</p><p className="text-xl font-bold text-blue-700">₹12,500/mo</p></div>
              <div><p className="text-xs text-gray-400 font-bold uppercase">Deposit</p><p className="text-xl font-bold text-gray-800">₹25,000</p></div>
              <div><p className="text-xs text-gray-400 font-bold uppercase">BHK</p><p className="text-xl font-bold text-gray-800">2 BHK</p></div>
            </div>

            <h4 className="text-lg font-bold mb-4">Description</h4>
            <p className="text-gray-600 leading-relaxed">
              Nagpur ke dil mein ek shandaar flat. Isme 2 bade rooms, modular kitchen aur balcony hai. 
              Metro station sirf 2 minute ki doori par hai. Students aur Families dono ke liye best hai.
            </p>
          </div>

          {/* Sticky Contact Box */}
          <div className="w-full md:w-80 h-fit sticky top-24 bg-gray-50 border p-6 rounded-2xl shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4 uppercase text-xs tracking-wider text-center">Interested?</h4>
            <button className="w-full bg-blue-700 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-blue-800 mb-4 transition">
              Get Owner Number
            </button>
            <p className="text-[10px] text-center text-gray-400">Fixed rent. No extra charges.</p>
          </div>
        </div>
      </div>
    </main>
  );
}