'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>
            <nav className="ml-auto flex items-center gap-6">
              <Link href="/#stays" className="text-slate-600 hover:text-slate-900">Stays</Link>
              <Link href="/become-partner" className="text-slate-600 hover:text-slate-900">Partner</Link>
              <Link href="/login" className="text-slate-600 hover:text-slate-900">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms & Conditions</h1>
          <p className="text-slate-500 mb-8">Last updated: June 2024</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 mb-4">
                By accessing or using FixMyStay, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 mb-4">
                FixMyStay is an online marketplace that connects travelers with property owners and managers. We facilitate bookings for hotels, PGs, flats, resorts, villas, and other accommodations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. User Accounts</h2>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must be at least 18 years old to use our services</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Bookings and Payments</h2>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>All bookings are subject to availability and confirmation</li>
                <li>Prices are displayed in Indian Rupees (₹) and include all taxes</li>
                <li>Payment is processed securely through our payment partners</li>
                <li>Cancellation and refund policies vary by property</li>
                <li>FixMyStay acts as an intermediary for payments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Cancellation Policy</h2>
              <p className="text-slate-600 mb-4">
                Cancellation policies are set by individual property owners. Please review the specific cancellation policy before making a booking. Common policies include:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li><strong>Flexible:</strong> Full refund if cancelled 24 hours before check-in</li>
                <li><strong>Moderate:</strong> 50% refund if cancelled 5 days before check-in</li>
                <li><strong>Strict:</strong> No refund for cancellations within 7 days of check-in</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. User Conduct</h2>
              <p className="text-slate-600 mb-4">You agree not to:</p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Use the platform for any unlawful purpose</li>
                <li>Provide false or misleading information</li>
                <li>Attempt to bypass our booking system</li>
                <li>Harass or abuse other users or staff</li>
                <li>Damage or misuse property during your stay</li>
                <li>Organize parties or events without property owner consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Property Listings</h2>
              <p className="text-slate-600 mb-4">
                While we strive for accuracy, FixMyStay does not guarantee that property listings are completely accurate. We rely on property owners to provide correct information. If you encounter issues, please report them to our support team.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-600 mb-4">
                FixMyStay shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our platform or services. Our total liability shall not exceed the amount paid for the booking in question.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">9. Modifications</h2>
              <p className="text-slate-600 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Your continued use of the platform constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">10. Governing Law</h2>
              <p className="text-slate-600">
                These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.
              </p>
            </section>
          </div>

          <div className="mt-12 flex gap-4">
            <Link href="/privacy">
              <Button variant="outline">Privacy Policy</Button>
            </Link>
            <Link href="/refund">
              <Button variant="outline">Refund Policy</Button>
            </Link>
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