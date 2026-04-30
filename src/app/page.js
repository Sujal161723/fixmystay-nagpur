'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import HeroSlider from '@/components/home/HeroSlider';
import ServiceGrid from '@/components/home/ServiceGrid';
import { Button, Card, Badge } from '@/components/ui';
import PropertyGrid from '@/components/listings/PropertyGrid';
import { useFeaturedProperties } from '@/hooks/useProperties';
import { NAGPUR_AREAS } from '@/models/property';
import { ArrowRight, MapPin, Sparkles, Shield, Zap, Headphones } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { properties: featuredProperties, loading, error } = useFeaturedProperties(6);

  const handleAreaClick = (area) => {
    router.push(`/search?area=${encodeURIComponent(area)}`);
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      {/* Phase 1: High-Conversion Hero Slider */}
      <HeroSlider />

      {/* Phase 2: Color-Coded Category Service Grid */}
      <ServiceGrid />

      {/* Featured Listings */}
      <section className="py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold text-primary mb-4">
                <Sparkles className="w-4 h-4" />
                Featured Properties
              </div>
              <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">Premium Listings in Nagpur</h2>
              <p className="text-muted-foreground">Handpicked properties for your comfort</p>
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
                className="card p-5 bg-white text-center hover:shadow-medium transition-all group rounded-3xl"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
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

      {/* Trust Section - Enhanced with badges */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4">Why Choose FixMyStay?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best experience for both guests and property owners
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 glass-card rounded-3xl">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified by FMS</h3>
              <p className="text-muted-foreground">Every property is verified for authenticity and accuracy</p>
            </div>
            
            <div className="text-center p-6 glass-card rounded-3xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Secure</h3>
              <p className="text-muted-foreground">Safe and transparent payment processing</p>
            </div>
            
            <div className="text-center p-6 glass-card rounded-3xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock assistance whenever you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-6">
              Ready to Find Your Perfect Stay?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who found their ideal accommodation in Nagpur with FixMyStay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/search')}
                className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-shadow inline-flex items-center justify-center gap-2"
              >
                Browse Properties
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => router.push('/partner')}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
              >
                List Your Property
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileNav />
    </div>
  );
}