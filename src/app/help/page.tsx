'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, HelpCircle, Book, MessageCircle, Phone, Mail, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const faqCategories = [
  {
    id: 'booking',
    name: 'Booking & Reservations',
    icon: Book,
    questions: [
      {
        q: 'How do I make a booking?',
        a: 'Simply search for properties in your desired location, select your dates, and click "Book Now". You\'ll be guided through a simple checkout process. Once your payment is confirmed, you\'ll receive a booking confirmation via email.',
      },
      {
        q: 'Can I modify or cancel my booking?',
        a: 'Yes, you can modify or cancel your booking from your dashboard. Cancellation policies vary by property, so please review the specific terms before booking. Modifications are subject to availability.',
      },
      {
        q: 'How do I know my booking is confirmed?',
        a: 'You\'ll receive an instant email confirmation after completing your booking. You can also view your bookings in the "My Bookings" section of your dashboard.',
      },
      {
        q: 'Can I book for someone else?',
        a: 'Yes, you can book a stay for someone else. Just enter their details during the booking process. The primary guest must provide valid ID at check-in.',
      },
    ],
  },
  {
    id: 'payment',
    name: 'Payments & Pricing',
    icon: HelpCircle,
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards, debit cards, UPI, net banking, and popular wallets like Paytm, PhonePe, and Google Pay.',
      },
      {
        q: 'Are there any hidden charges?',
        a: 'No, we believe in transparent pricing. The price you see includes all taxes and fees. There are no hidden charges.',
      },
      {
        q: 'How do refunds work?',
        a: 'Refunds are processed within 5-7 business days to your original payment method. The timeline may vary depending on your bank.',
      },
      {
        q: 'Can I get an invoice for my booking?',
        a: 'Yes, you can download the invoice from your booking confirmation email or from the "My Bookings" section of your dashboard.',
      },
    ],
  },
  {
    id: 'properties',
    name: 'Properties & Listings',
    icon: HelpCircle,
    questions: [
      {
        q: 'How are properties verified?',
        a: 'Our team physically verifies each property for quality, safety, and accuracy. We check amenities, cleanliness, and ensure the listing matches the actual property.',
      },
      {
        q: 'Can I trust the photos on the website?',
        a: 'Yes, all photos are taken by our professional photographers or verified with the property owner. We regularly update photos to ensure accuracy.',
      },
      {
        q: 'What amenities are typically included?',
        a: 'Most properties include WiFi, AC, clean linen, and toiletries. Additional amenities like breakfast, parking, or pool access vary by property and are clearly listed.',
      },
    ],
  },
  {
    id: 'safety',
    name: 'Safety & Security',
    icon: HelpCircle,
    questions: [
      {
        q: 'Is it safe to book through FixMyStay?',
        a: 'Absolutely. We verify all properties, use secure payment gateways, and have a 24/7 support team. Your personal and payment information is encrypted and protected.',
      },
      {
        q: 'What if I face issues during my stay?',
        a: 'Contact our 24/7 support team immediately. We\'ll work with the property to resolve any issues or help you find alternative accommodation if needed.',
      },
      {
        q: 'Do you have emergency support?',
        a: 'Yes, we have a dedicated emergency helpline available 24/7 for urgent situations. The number is provided in your booking confirmation.',
      },
    ],
  },
];

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-sky-600 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-sky-100 mb-8">Find answers to common questions or contact our support team</p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
            />
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            <Card hover className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900">Live Chat</h3>
                <p className="text-sm text-slate-600 mt-1">Get instant help</p>
              </CardContent>
            </Card>
            <Card hover className="text-center">
              <CardContent className="p-6">
                <Phone className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900">Call Us</h3>
                <p className="text-sm text-slate-600 mt-1">+91 1800-123-4567</p>
              </CardContent>
            </Card>
            <Card hover className="text-center">
              <CardContent className="p-6">
                <Mail className="w-10 h-10 text-sky-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900">Email Us</h3>
                <p className="text-sm text-slate-600 mt-1">support@fixmystay.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <category.icon className="w-6 h-6 text-sky-500" />
                <h2 className="text-2xl font-bold text-slate-900">{category.name}</h2>
              </div>
              <div className="space-y-3">
                {category.questions.map((faq, index) => {
                  const faqId = `${category.id}-${index}`;
                  const isExpanded = expandedFaq === faqId;
                  return (
                    <Card key={index} hover>
                      <CardContent className="p-0">
                        <button
                          onClick={() => toggleFaq(faqId)}
                          className="w-full flex items-center justify-between p-4 text-left"
                        >
                          <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 pt-0 text-slate-600 border-t border-slate-100">
                            <p className="mt-3">{faq.a}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900">Still need help?</h2>
          <p className="text-slate-600 mt-4 mb-8">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors">
              Contact Support
            </Link>
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-4 h-4" />
              <span>Available 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 FixMyStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}