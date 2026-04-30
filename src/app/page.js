'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Button, Card, Badge } from '@/components/ui';
import PropertyGrid from '@/components/listings/PropertyGrid';
import { useFeaturedProperties } from '@/hooks/useProperties';
import { PROPERTY_CATEGORIES, NAGPUR_AREAS } from '@/models/property';
import { Search, MapPin, Calendar, Star, ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchType, setSearchType] = useState('Any Type');
  const [checkIn, setCheckIn] = useState('');
  
  const { properties: featuredProperties, loading, error } = useFeaturedProperties(6);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) {
      params.set('q', searchLocation);
    }
    if (searchType && searchType !== 'Any Type') {
      params.set('category', searchType.toLowerCase());
    }
    if (checkIn) {
      params.set('checkin', checkIn);
    }
    router.push(`/search?${params.toString()}`);
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/search?category=${categoryId}`);
  };

  const handleAreaClick = (area) => {
    router.push(`/search?area=${encodeURIComponent(area)}`);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Enhanced Hero Section with Featured Banner */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-accent/30" />
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-border shadow-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-slate-600">Nagpur's Most Trusted Stay Platform</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-8 leading-tight">
              Find your perfect stay in{' '}
              <span className="text-gradient">Nagpur</span>{' '}
              with confidence
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              From daily hotel bookings to monthly PG stays, and property rentals to sales — 
              FixMyStay is your all-in-one platform for verified listings and seamless experiences.
            </p>
            
            {/* Enhanced Search Bar - Glass Card Style */}
            <div className="glass-card p-3 max-w-4xl">
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Location Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold uppercase text-muted-foreground mb-0.5">Location</span>
                    <input 
                      type="text" 
                      placeholder="Search in Nagpur..." 
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full bg-transparent outline-none font-medium text-slate-800 placeholder:text-muted-foreground"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-border" />

                {/* Type Selector */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold uppercase text-muted-foreground mb-0.5">Type</span>
                    <select 
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="w-full bg-transparent outline-none font-medium text-slate-800 appearance-none cursor-pointer"
                    >
                      <option>Any Type</option>
                      <option value="hotel">Hotel</option>
                      <option value="pg">PG / Flat</option>
                      <option value="room">Room</option>
                      <option value="real-estate">Real Estate</option>
                    </select>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden lg:block w-px bg-border" />

                {/* Check-in Date */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors">
                  <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold uppercase text-muted-foreground mb-0.5">Check-in</span>
                    <input 
                      type="date" 
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-transparent outline-none font-medium text-slate-800"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 lg:w-auto w-full"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>

            {/* Quick Tags */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['Dharampeth', 'Sitabuldi', 'Wardha Road', 'Civil Lines'].map((area) => (
                <button
                  key={area}
                  onClick={() => handleAreaClick(area)}
                  className="px-4 py-1.5 rounded-full bg-white border border-border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-20 bg-accent">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Explore by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect accommodation that suits your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_CATEGORIES.map((cat) => (
              <div 
                key={cat.title} 
                className="card p-8 bg-white cursor-pointer group"
                onClick={() => handleCategoryClick(cat.id)}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {cat.id === 'hotel' && <Star className="w-7 h-7 text-primary" />}
                  {cat.id === 'pg' && <MapPin className="w-7 h-7 text-primary" />}
                  {cat.id === 'room' && <Calendar className="w-7 h-7 text-primary" />}
                  {cat.id === 'real-estate' && <Sparkles className="w-7 h-7 text-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{cat.desc}</p>
                <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Featured Listings</h2>
              <p className="text-muted-foreground">Handpicked properties for your comfort in Nagpur</p>
            </div>
            <button 
              onClick={() => router.push('/search')}
              className="btn-primary flex items-center gap-2"
            >
              View All Properties
              <ArrowRight className="w-4 h-4" />
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
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Popular Areas in Nagpur</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore properties in your preferred neighborhood
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {NAGPUR_AREAS.slice(0, 10).map((area) => (
              <button
                key={area}
                onClick={() => handleAreaClick(area)}
                className="card p-5 bg-white text-center hover:shadow-medium transition-all group"
              >
                <h3 className="font-bold text-sm text-slate-800 group-hover:text-primary transition-colors">{area}</h3>
                <p className="text-xs text-muted-foreground mt-1">Nagpur</p>
              </button>
            ))}
          </div>

          {/* More Areas */}
          <div className="text-center mt-8">
            <button 
              onClick={() => router.push('/search')}
              className="text-primary font-bold text-sm hover:underline flex items-center justify-center gap-1 mx-auto"
            >
              View all {NAGPUR_AREAS.length} areas <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Why Choose FixMyStay?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best experience for both guests and property owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">Every property is verified for authenticity and accuracy</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-muted-foreground">Safe and transparent payment processing</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock assistance whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}