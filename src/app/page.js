'use client';

import HeroSlider from '@/components/home/HeroSlider';
import ServiceGrid from '@/components/home/ServiceGrid';
import PropertyGrid from '@/components/listings/PropertyGrid';
import PropertyFilters from '@/components/listings/PropertyFilters';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle, Star, Zap, MapPin } from 'lucide-react';

const featuredProperties = [
  {
    id: '1',
    title: 'Luxury 2BHK Apartment',
    category: 'real-estate',
    price: 4500000,
    area: 'Wardha Road, Nagpur',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    status: 'featured',
    verified: true,
  },
  {
    id: '2',
    title: 'Premium PG for Professionals',
    category: 'pg',
    price: 8500,
    area: 'MIHAN, Nagpur',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 200,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    verified: true,
  },
  {
    id: '3',
    title: '3BHK Family Flat',
    category: 'real-estate',
    price: 6500000,
    area: 'Besa, Nagpur',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1650,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    status: 'featured',
    verified: true,
  },
  {
    id: '4',
    title: 'Modern Studio Apartment',
    category: 'room',
    price: 12000,
    area: 'Sitabuldi, Nagpur',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 350,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    verified: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Service Grid */}
        <ServiceGrid />

        {/* Featured Properties Section */}
        <section className="py-10 md:py-16 bg-accent/50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                  Featured Properties
                </h2>
                <p className="text-base text-muted-foreground max-w-xl">
                  Discover handpicked properties across Nagpur - verified listings with the best value
                </p>
              </div>
              <Link
                href="/search"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base hover:underline transition-all whitespace-nowrap"
              >
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <PropertyGrid properties={featuredProperties} />
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-10 md:py-16">
          <div className="container-custom">
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                Why Choose FixMyStay?
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                We make finding and booking your perfect stay simple, secure, and satisfying
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="glass-card p-6 md:p-8 rounded-3xl text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Shield className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                  Verified Listings
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Every property is physically verified by our team. Real photos, real prices, real trust.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card p-6 md:p-8 rounded-3xl text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Zap className="w-7 h-7 md:w-8 md:h-8 text-green-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                  Instant Booking
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Book your stay in just a few clicks. No hidden charges, no surprises.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card p-6 md:p-8 rounded-3xl text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <MapPin className="w-7 h-7 md:w-8 md:h-8 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                  Prime Locations
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  Properties in the best areas of Nagpur - MIHAN, Wardha Road, Sitabuldi, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight mb-4">
                Ready to Find Your Perfect Stay?
              </h2>
              <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust FixMyStay for their accommodation needs in Nagpur.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/search"
                  className="bg-white text-primary font-bold px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-200 active:scale-[0.97] text-base"
                >
                  Browse Properties
                </Link>
                <Link
                  href="/become-a-partner"
                  className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold px-8 py-4 rounded-2xl hover:bg-white/20 transition-all duration-200 active:scale-[0.97] text-base"
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10 md:py-12 bg-accent/50">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 bg-white border border-green-200 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-xs md:text-sm font-semibold text-green-700">Verified by FMS</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-blue-200 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-xs md:text-sm font-semibold text-blue-700">100% Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white border border-purple-200 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="text-xs md:text-sm font-semibold text-purple-700">Top Rated</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}