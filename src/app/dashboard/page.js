import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase'; // Apna firebase path check kar lena
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Dashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // 'properties' collection se data nikalna
        const q = query(collection(db, "properties"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(data);
      } catch (error) {
        console.error("Data laane mein error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div className="p-10 text-center">Nagpur Portal Load ho raha hai...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Real-Time Property Listings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.length > 0 ? (
          properties.map((item) => (
            <div key={item.id} className="border rounded-lg p-4 shadow-lg bg-white">
              <img src={item.imageUrl || '/placeholder.jpg'} alt={item.title} className="w-full h-48 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
              <p className="text-gray-600">{item.location}</p>
              <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
              <button className="w-full mt-4 bg-black text-white py-2 rounded">Details Dekhein</button>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center p-10 bg-gray-100 rounded">
            <p className="text-gray-500">Bhai, abhi koi property nahi hai. Pehli listing add karo!</p>
          </div>
        )}
      </div>
    </div>
  );
}