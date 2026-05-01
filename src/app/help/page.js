'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import Link from 'next/link';
import { Search, HelpCircle, BookOpen, MessageCircle, Phone, Mail, ChevronRight, Shield, CreditCard, Calendar, Home, Users, Building } from 'lucide-react';
import { useState } from 'react';

const helpCategories = [
  {
    icon: Home,
    title: 'Booking & Reservations',
    description: 'How to book, modify, or cancel your stay',
    color: 'blue',
    href: '/help#booking',
  },
  {
    icon: CreditCard,
    title: 'Payments & Pricing',
    description: 'Payment methods, refunds, and pricing details',
    color: 'green',
    href: '/help#payments',
  },
  {
    icon: Shield,
    title: 'Safety & Security',
    description: 'Verified listings, secure transactions, and safety tips',
    color: 'purple',
    href: '/help#safety',
  },
  {
    icon: Users,
    title: 'For Property Owners',
    description: 'List your property, manage bookings, and grow your business',
    color: 'amber',
    href: '/help#owners',
  },
];

const faqs = [
  {
    category: 'Booking',
    questions: [
      { q: 'How do I book a property?', a: 'Search for properties, select your preferred option, and fill out the inquiry form. Our team will connect you with the property owner within 24 hours.' },
      { q: 'Can I modify my booking?', a: 'Yes, contact the property owner directly through the platform or reach out to our support team for assistance.' },
      { q: 'What is the cancellation policy?', a: 'Cancellation policies vary by property. Check the specific property listing for details, or contact the owner directly.' },
      { q: 'How do I check availability?', a: 'Use the search filters to find available properties for your desired dates. You can also contact the property owner for real-time availability.' },
    ]
  },
  {
    category: 'Payments',
    questions: [
      { q: 'What payment methods are accepted?', a: 'We accept UPI, credit/debit cards, net banking, and wallet payments. Some properties may also accept cash on arrival.' },
      { q: 'Are there any hidden charges?', a: 'No, all prices displayed on FixMyStay are transparent. The price you see is the price you pay.' },
      { q: 'How do I get a refund?', a: 'Refunds are processed according to the cancellation policy. Contact our support team for refund-related queries.' },
      { q: 'Is my payment information secure?', a: 'Yes, we use industry-standard encryption and never store your full card details.' },
    ]
  },
  {
    category: 'For Owners',
    questions: [
      { q: 'How do I list my property?', a: 'Visit our Become a Partner page, fill out the inquiry form, and our team will guide you through the listing process.' },
      { q: 'What documents are required?', a: 'You need to provide KYC documents (Aadhaar, PAN), property ownership proof, and business registration if applicable.' },
      { q: 'How much does it cost to list?', a: 'Listing on FixMyStay is free. We only charge a commission on successful bookings.' },
      { q: 'How do I manage my listings?', a: 'Use our Vendor Dashboard to manage properties, availability, pricing, and respond to inquiries.' },
    ]
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <BookOpen className="w-4 h-4" />
                Help Center
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                How can we <span className="text-gradient">help</span>?
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Find answers to common questions, learn how to use FixMyStay, and get the support you need.
              </p>

              {/* Search Bar */}
              <div className="glass-card p-3 max-w-2xl mx-auto">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-slate-800 placeholder:text-muted-foreground"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-tight mb-4">Browse by Category</h2>
              <p className="text-lg text-muted-foreground">Find the information you need quickly</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {helpCategories.map((category) => {
                const Icon = category.icon;
                const bgColor = category.color === 'blue' ? 'bg-blue-50' :
                               category.color === 'green' ? 'bg-green-50' :
                               category.color === 'purple' ? 'bg-purple-50' : 'bg-amber-50';
                const textColor = category.color === 'blue' ? 'text-blue-600' :
                                 category.color === 'green' ? 'text-green-600' :
                                 category.color === 'purple' ? 'text-purple-600' : 'text-amber-600';

                return (
                  <Link 
                    key={category.title}
                    href={category.href}
                    className="glass-card p-6 rounded-3xl hover:shadow-medium transition-all group"
                  >
                    <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-7 h-7 ${textColor}`} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                    <span className={`text-sm font-bold ${textColor} flex items-center gap-1`}>
                      Learn more <ChevronRight className="w-4 h-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">Quick answers to common questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {faqs.map((section) => (
                <div key={section.category}>
                  <h3 className="text-xl font-bold mb-4 text-slate-800">{section.category}</h3>
                  <div className="space-y-3">
                    {section.questions.map((faq, index) => (
                      <details key={index} className="glass-card rounded-2xl group">
                        <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                          <span className="font-medium text-slate-800 pr-4">{faq.q}</span>
                          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform group-open:rotate-90" />
                        </summary>
                        <div className="px-5 pb-5">
                          <p className="text-muted-foreground">{faq.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black tracking-tight mb-4">Still need help?</h2>
              <p className="text-lg text-muted-foreground mb-10">
                Our support team is here to assist you 24/7
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <a 
                  href="mailto:support@fixmystay.com"
                  className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:shadow-medium transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Email Us</h3>
                    <p className="text-sm text-muted-foreground">support@fixmystay.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+919876543210"
                  className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:shadow-medium transition-all"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Call Us</h3>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
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