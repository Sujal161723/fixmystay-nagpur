import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { 
  Building, TrendingUp, Shield, Users, 
  CheckCircle, ArrowRight, Star, MapPin,
  CreditCard, Headphones
} from 'lucide-react';

export default function PartnerPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4" />
                Partner with FixMyStay
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Grow Your Property Business with <span className="text-gradient">FixMyStay</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of property owners and hoteliers in Nagpur who trust FixMyStay to connect with quality guests and maximize their bookings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup?role=vendor" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                  List Your Property
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#benefits" className="btn-outline py-4 px-8 text-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-gray-200">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-4xl font-black text-primary mb-2">10K+</p>
                <p className="text-sm text-muted-foreground font-medium">Active Listings</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary mb-2">50K+</p>
                <p className="text-sm text-muted-foreground font-medium">Happy Guests</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary mb-2">15+</p>
                <p className="text-sm text-muted-foreground font-medium">Cities Covered</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-black text-primary mb-2">24/7</p>
                <p className="text-sm text-muted-foreground font-medium">Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">Why Partner with Us?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We provide everything you need to succeed in the competitive hospitality market.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Maximum Visibility</h3>
                <p className="text-muted-foreground">
                  Get discovered by thousands of travelers searching for accommodations in Nagpur and beyond.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Receive payments directly to your account with our secure and transparent payment system.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our partner success team is available 24/7 to help you with any questions or issues.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Management</h3>
                <p className="text-muted-foreground">
                  Manage your listings, bookings, and availability through our intuitive vendor dashboard.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p className="text-muted-foreground">
                  We understand the Nagpur market and help you price and position your property effectively.
                </p>
              </div>

              <div className="glass-card p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Headphones className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Guest Screening</h3>
                <p className="text-muted-foreground">
                  We verify guests and handle inquiries, so you only deal with serious, qualified bookings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground">Get started in just 3 simple steps</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-black text-primary">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sign Up</h3>
                <p className="text-muted-foreground">
                  Create your vendor account and complete the KYC verification process.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-black text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">List Property</h3>
                <p className="text-muted-foreground">
                  Add your property details, photos, pricing, and availability calendar.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-black text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Start Booking</h3>
                <p className="text-muted-foreground">
                  Receive bookings and inquiries from guests and grow your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">What You Can List</h2>
              <p className="text-lg text-muted-foreground">We accept various types of properties</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Hotels', desc: 'Daily bookings' },
                { name: 'Resorts', desc: 'Vacation stays' },
                { name: 'Villas', desc: 'Luxury rentals' },
                { name: 'PG Stays', desc: 'Monthly rentals' },
                { name: 'Flats', desc: 'Long-term rent' },
                { name: 'Marriage Halls', desc: 'Event venues' },
                { name: 'Real Estate', desc: 'Sale/Rent' },
                { name: 'Commercial', desc: 'Office spaces' },
              ].map((type) => (
                <div key={type.name} className="glass-card p-6 text-center hover:shadow-medium transition-shadow">
                  <h3 className="font-bold text-lg mb-1">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">
                Ready to Grow Your Business?
              </h2>
              <p className="text-xl opacity-90 mb-10">
                Join FixMyStay today and start reaching more guests than ever before.
              </p>
              <Link 
                href="/auth/signup?role=vendor" 
                className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow inline-flex items-center gap-2"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-6 text-sm opacity-75">
                Free to list • No hidden charges • Cancel anytime
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">What Our Partners Say</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Rajesh Kumar',
                  property: 'Kumar Residency',
                  text: 'FixMyStay has transformed our booking process. We see 3x more inquiries now.',
                  rating: 5
                },
                {
                  name: 'Priya Sharma',
                  property: 'Sharma PG',
                  text: 'The platform is easy to use and the support team is always helpful.',
                  rating: 5
                },
                {
                  name: 'Amit Patel',
                  property: 'Patel Hotels',
                  text: 'Best decision we made was partnering with FixMyStay. Highly recommended!',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-slate-800">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.property}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}