'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import Link from 'next/link';
import { Shield, CheckCircle, AlertTriangle, Lock, Eye, Phone, ChevronRight, Star, Users, FileText } from 'lucide-react';

const safetyFeatures = [
  {
    icon: CheckCircle,
    title: 'Verified by FMS',
    description: 'Every property listing goes through our rigorous verification process including document checks, location verification, and quality assessment.',
    color: 'green',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'All transactions are encrypted and processed through secure payment gateways. We never store your full card details.',
    color: 'blue',
  },
  {
    icon: Eye,
    title: 'Transparent Listings',
    description: 'Real photos, accurate descriptions, and verified pricing. What you see is what you get.',
    color: 'purple',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Our dedicated support team is available round the clock to assist with any safety concerns.',
    color: 'amber',
  },
];

const safetyTips = [
  {
    title: 'Before Booking',
    tips: [
      'Always verify the property photos match the listing',
      'Read reviews from previous guests',
      'Check the cancellation policy carefully',
      'Communicate with the property owner through our platform',
      'Never make payments outside the platform',
    ],
  },
  {
    title: 'During Your Stay',
    tips: [
      'Check all locks and security features upon arrival',
      'Note emergency exits and contact numbers',
      'Report any issues to the property owner immediately',
      'Keep your booking confirmation accessible',
      'Use the in-app chat for all communications',
    ],
  },
  {
    title: 'For Property Owners',
    tips: [
      'Verify guest identity through our platform',
      'Document property condition before and after stays',
      'Use our secure payment system only',
      'Report suspicious inquiries to our team',
      'Keep your property information up to date',
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Shield className="w-4 h-4" />
                Safety First
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Your Safety is Our <span className="text-gradient">Priority</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We've implemented comprehensive safety measures to ensure every transaction and stay is secure, verified, and trustworthy.
              </p>
            </div>
          </div>
        </section>

        {/* Safety Features */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Our Safety Commitments</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Multiple layers of protection for every booking
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {safetyFeatures.map((feature) => {
                const Icon = feature.icon;
                const bgColor = feature.color === 'green' ? 'bg-green-100' :
                               feature.color === 'blue' ? 'bg-blue-100' :
                               feature.color === 'purple' ? 'bg-purple-100' : 'bg-amber-100';
                const textColor = feature.color === 'green' ? 'text-green-600' :
                                 feature.color === 'blue' ? 'text-blue-600' :
                                 feature.color === 'purple' ? 'text-purple-600' : 'text-amber-600';

                return (
                  <div key={feature.title} className="glass-card p-8 rounded-3xl">
                    <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                      <Icon className={`w-7 h-7 ${textColor}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Verified by FMS</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our comprehensive verification process
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  { step: 1, title: 'Document Verification', desc: 'All property owners must submit valid ID proof, property ownership documents, and business registration if applicable.' },
                  { step: 2, title: 'Property Inspection', desc: 'Our team conducts physical verification of properties to ensure they match the listing description.' },
                  { step: 3, title: 'Quality Check', desc: 'Properties are evaluated for cleanliness, safety features, and basic amenities before approval.' },
                  { step: 4, title: 'Ongoing Monitoring', desc: 'Regular audits and guest feedback help us maintain quality standards over time.' },
                ].map((item) => (
                  <div key={item.step} className="glass-card p-6 rounded-3xl flex gap-6 items-start">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0 font-black text-lg">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Safety Tips</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay safe with these best practices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {safetyTips.map((section) => (
                <div key={section.title} className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-lg mb-4 text-slate-800">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Trusted by Thousands</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Join our community of verified users
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-4xl font-black mb-2">100%</p>
                <p className="text-white/80 text-sm">Verified Listings</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-4xl font-black mb-2">24/7</p>
                <p className="text-white/80 text-sm">Support Available</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-4xl font-black mb-2">50K+</p>
                <p className="text-white/80 text-sm">Happy Customers</p>
              </div>
              <div className="text-center p-6 bg-white/10 rounded-3xl backdrop-blur-sm">
                <p className="text-4xl font-black mb-2">0</p>
                <p className="text-white/80 text-sm">Fraud Reports</p>
              </div>
            </div>
          </div>
        </section>

        {/* Report Concerns */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-4">Report a Concern</h2>
              <p className="text-lg text-muted-foreground mb-8">
                If you encounter any safety issues or suspicious activity, please report it to us immediately. We take all reports seriously and investigate promptly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/report" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                  Report an Issue
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a 
                  href="tel:+919876543210"
                  className="btn-outline py-4 px-8 text-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Emergency Helpline
                </a>
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