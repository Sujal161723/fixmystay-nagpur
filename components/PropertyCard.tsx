import React from 'react';

export default function PropertyCard({ price, title, area }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="h-48 bg-gray-100 relative">
        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500" alt="Nagpur Property" className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">VERIFIED</div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-blue-700">₹{price}</h3>
        <p className="text-gray-800 font-semibold truncate">{title}</p>
        <p className="text-gray-500 text-sm">📍 {area}, Nagpur</p>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-bold text-sm">View Details</button>
      </div>
    </div>
  );
}