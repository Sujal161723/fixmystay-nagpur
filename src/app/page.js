'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button, Card, Badge } from '@/components/ui';
import PropertyGrid from '@/components/listings/PropertyGrid';
import { useFeaturedProperties } from '@/hooks/useProperties';
import { PROPERTY_CATEGORIES } from '@/models/property';

export default function Home() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('Any Type');
  
  const { properties: featuredProperties, loading, error } = useFeaturedProperties(6);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) {
      params.set('q', searchLocation);
    }
    if (searchType && searchType !== 'Any Type') {
      params.set('category', searchType.toLowerCase());
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/search?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              Find your next home in <br />
              <span className="text-primary">Nagpur</span> with confidence.
            </h1>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl">
              The all-in-one platform for daily bookings, monthly PG stays, and property rentals or sales in Nagpur. Professional service, verified listings.
            </p>
            
            <div className="bg-white p-2 rounded-2xl border border-border shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl">
              <div className="flex-1 px-4 py-2">
                <span className="block text-xs font-bold uppercase text-muted-foreground mb-1">Location</span>
                <input 
                  type="text" 
                  placeholder="Search in Nagpur..." 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium"
                />
              </div>
              <div className="flex-1 px-4 py-2 border-l border-border hidden md:block">
                <span className="block text-xs font-bold uppercase text-muted-foreground mb-1">Type</span>
                <select 
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium appearance-none"
                >
                  <option>Any Type</option>
                  <option value="hotel">Hotel</option>
                  <option value="pg">PG</option>
                  <option value="room">Room</option>
                  <option value="real-estate">Real Estate</option>
                </select>
              </div>
              <button 
                onClick={handleSearch}
                className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity"
              >
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
            {PROPERTY_CATEGORIES.map((cat) => (
              <div 
                key={cat.title} 
                className="card p-8 bg-white hover:-translate-y-1 transition-transform cursor-pointer"
                onClick={() => handleCategoryClick(cat.id)}
              >
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cat.desc}</p>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">Explore -{'>'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Listings in Nagpur</h2>
              <p className="text-muted-foreground">Handpicked properties for your comfort.</p>
            </div>
            <button 
              onClick={() => router.push('/search')}
              className="text-primary font-bold text-sm"
            >
              View All
            </button>
          </div>
          
          <PropertyGrid 
            properties={featuredProperties}
            loading={loading}
            error={error}
            columns={3}
            emptyMessage="No featured properties available yet. Check back soon!"
          />
        </div>
      </section>

      {/* Popular Areas in Nagpur */}
      <section className="py-20 bg-accent">
        <div className="container-custom">
          <h2 className="text-3xl font-bold tracking-tight mb-10">Popular Areas in Nagpur</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              'Dharampeth',
              'Sitabuldi',
              'Sadar',
              'Civil Lines',
              'Wardha Road',
              'Shankar Nagar',
              'Laxmi Nagar',
              'Dhantoli',
              'Gokulpeth',
              'Itwari',
            ].map((area) => (
              <button
                key={area}
                onClick={() => router.push(`/search?area=${encodeURIComponent(area)}`)}
                className="card p-4 bg-white hover:-translate-y-1 transition-transform text-center"
              >
                <h3 className="font-bold text-sm">{area}</h3>
                <p className="text-xs text-muted-foreground mt-1">Nagpur</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}