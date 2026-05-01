'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

const faqSections = [
  {
    title: 'For Guests',
    faqs: [
      {
        q: 'How do I create an account?',
        a: 'Creating an account is simple. Click on "Sign In" in the top navigation, then select "Create Account". You can sign up using your email address or through Google/Facebook. Once registered, you can start booking properties immediately.',
      },
      {
        q: 'What is the cancellation policy?',
        a: 'Cancellation policies vary by property. Each listing clearly displays its cancellation policy (Flexible, Moderate, or Strict). You can cancel or modify your booking from your dashboard, subject to the property\'s specific terms.',
      },
      {
        q: 'How do I contact the property owner?',
        a: 'After making a booking, you\'ll receive the property owner\'s contact details in your confirmation email. You can also message them through our platform via your booking details page.',
      },
      {
        q: 'Can I book multiple rooms?',
        a: 'Yes, you can book multiple rooms at the same property if available. Simply select the number of rooms you need during the booking process. For large group bookings, contact our support team for assistance.',
      },
      {
        q: 'What if the property doesn\'t match the listing?',
        a: 'If the property significantly differs from the listing, contact us immediately. We\'ll work with the property owner to resolve the issue or help you find alternative accommodation. Your satisfaction is our priority.',
      },
    ],
  },
  {
    title: 'For Partners (Property Owners)',
    faqs: [
      {
        q: 'How do I list my property?',
        a: 'Click "Become a Partner" and submit your property details. Our team will review your submission and contact you for verification. Once approved, your property will be live on the platform.',
      },
      {
        q: 'What are the commission rates?',
        a: 'We charge a competitive commission rate on each booking. The exact rate depends on your property type and location. You\'ll receive a detailed breakdown before signing up. There are no upfront listing fees.',
      },
      {
        q: 'How do I receive payments?',
        a: 'Payments are transferred directly to your bank account within 3-5 business days after guest check-in. You can track all earnings and payouts from your partner dashboard.',
      },
      {
        q: 'Can I block dates when my property is unavailable?',
        a: 'Yes, you have full control over your calendar. You can block dates, set minimum stay requirements, and manage availability in real-time through your partner dashboard.',
      },
      {
        q: 'What support do partners receive?',
        a: 'Partners get dedicated account management, 24/7 support, marketing assistance, and access to our partner resources. We also provide regular performance reports and optimization tips.',
      },
    ],
  },
  {
    title: 'Payments & Pricing',
    faqs: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, UPI (Google Pay, PhonePe, Paytm), net banking, and popular digital wallets.',
      },
      {
        q: 'Are there any service fees?',
        a: 'A small service fee is added to each booking to cover platform operations and customer support. This fee is clearly displayed before you confirm your booking. There are no hidden charges.',
      },
      {
        q: 'How do refunds work?',
        a: 'Refunds are processed automatically to your original payment method within 5-7 business days of cancellation. The refund amount depends on the cancellation policy and timing.',
      },
      {
        q: 'Can I pay at the property?',
        a: 'For security and convenience, all payments are processed online through our platform. This ensures your booking is confirmed and protected under our policies.',
      },
    ],
  },
  {
    title: 'Safety & Security',
    faqs: [
      {
        q: 'Are properties verified?',
        a: 'Yes, every property undergoes a thorough verification process. Our team physically inspects properties for quality, safety, and accuracy. We verify amenities, cleanliness, and ensure the listing matches reality.',
      },
      {
        q: 'Is my personal information secure?',
        a: 'Absolutely. We use industry-standard encryption to protect your data. Your personal information is never shared with third parties without your consent, except as required for booking fulfillment.',
      },
      {
        q: 'What safety measures are in place?',
        a: 'We verify all hosts, inspect properties for safety equipment, provide 24/7 emergency support, and have comprehensive insurance coverage. Guests can also rate and review properties to help others make informed decisions.',
      },
    ],
  },
];

export default function FAQPage() {
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
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-sky-100">Find answers to common questions about FixMyStay</p>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{section.title}</h2>
              <div className="space-y-3">
                {section.faqs.map((faq, faqIndex) => {
                  const faqId = `section-${sectionIndex}-faq-${faqIndex}`;
                  const isExpanded = expandedFaq === faqId;
                  return (
                    <Card key={faqIndex} hover>
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

      {/* Still have questions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <HelpCircle className="w-12 h-12 text-sky-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Still have questions?</h2>
          <p className="text-slate-600 mt-4 mb-8">
            Our support team is here to help you with any questions you may have.
          </p>
          <Link href="/contact">
            <button className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors">
              Contact Support
            </button>
          </Link>
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