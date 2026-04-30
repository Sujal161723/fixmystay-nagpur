'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import { 
  Building, TrendingUp, Shield, Users, CheckCircle, 
  ArrowRight, Star, MapPin, CreditCard, Headphones,
  ChevronRight, AlertCircle, Loader2
} from 'lucide-react';

const propertyTypes = [
  'Hotel',
  'Resort',
  'Villa',
  'PG / Hostel',
  'Flat / Apartment',
  'Marriage Hall',
  'Commercial Space',
  'Other',
];

const partnershipTypes = [
  'List my property for rent',
  'Sell property',
  'List event venue',
  'Become a verified partner',
  'Other',
];

export default function BecomeAPartnerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    propertyType: '',
    partnershipType: '',
    propertyLocation: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Invalid Indian phone number';
    if (!formData.propertyType) newErrors.propertyType = 'Please select a property type';
    if (!formData.partnershipType) newErrors.partnershipType = 'Please select partnership type';
    if (!formData.propertyLocation.trim()) newErrors.propertyLocation = 'Property location is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'vendor_leads'), {
        ...formData,
        status: 'pending',
        source: 'become-a-partner-page',
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        propertyType: '',
        partnershipType: '',
        propertyLocation: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting partner inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
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
                <a href="#partner-form" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                  Submit Inquiry
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#benefits" className="btn-outline py-4 px-8 text-lg">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border">
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
              <div className="glass-card p-8 rounded-3xl">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Maximum Visibility</h3>
                <p className="text-muted-foreground">
                  Get discovered by thousands of travelers searching for accommodations in Nagpur and beyond.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Receive payments directly to your account with our secure and transparent payment system.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Our partner success team is available 24/7 to help you with any questions or issues.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Management</h3>
                <p className="text-muted-foreground">
                  Manage your listings, bookings, and availability through our intuitive vendor dashboard.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
                <p className="text-muted-foreground">
                  We understand the Nagpur market and help you price and position your property effectively.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl">
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

        {/* Partner Inquiry Form */}
        <section id="partner-form" className="py-20 bg-accent">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-black tracking-tight mb-4">Submit Your Inquiry</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below and our partnership team will contact you within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="glass-card p-10 rounded-3xl text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Inquiry Submitted Successfully!</h3>
                  <p className="text-muted-foreground mb-8">
                    Thank you for your interest in partnering with FixMyStay. Our team will review your inquiry and contact you at <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary py-3 px-6"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Rajesh Kumar"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="rajesh@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="9876543210"
                      />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    {/* Company Name */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Kumar Hotels Pvt Ltd"
                      />
                    </div>

                    {/* Property Type */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Property Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleChange}
                        className={`input-field ${errors.propertyType ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select property type</option>
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.propertyType && <p className="text-red-500 text-xs mt-1">{errors.propertyType}</p>}
                    </div>

                    {/* Partnership Type */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Partnership Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        className={`input-field ${errors.partnershipType ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select partnership type</option>
                        {partnershipTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      {errors.partnershipType && <p className="text-red-500 text-xs mt-1">{errors.partnershipType}</p>}
                    </div>

                    {/* Property Location */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Property Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="propertyLocation"
                        value={formData.propertyLocation}
                        onChange={handleChange}
                        className={`input-field ${errors.propertyLocation ? 'border-red-500' : ''}`}
                        placeholder="e.g., Sitabuldi, Wardha Road, MIHAN, etc."
                      />
                      {errors.propertyLocation && <p className="text-red-500 text-xs mt-1">{errors.propertyLocation}</p>}
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Tell us more about your property, number of rooms, expected partnership model, etc."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
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
                <h3 className="text-xl font-bold mb-3">Submit Inquiry</h3>
                <p className="text-muted-foreground">
                  Fill out the partner inquiry form with your property details.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-black text-primary">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Verification Call</h3>
                <p className="text-muted-foreground">
                  Our team will contact you to verify details and discuss partnership terms.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-white border-2 border-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-black text-primary">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Go Live</h3>
                <p className="text-muted-foreground">
                  Complete KYC, list your property, and start receiving bookings.
                </p>
              </div>
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
              <a 
                href="#partner-form" 
                className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-shadow inline-flex items-center gap-2"
              >
                Become a Partner
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="mt-6 text-sm opacity-75">
                Free to list • No hidden charges • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}