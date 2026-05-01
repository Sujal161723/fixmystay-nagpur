'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Shield, Award, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AboutPage() {
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

      {/* Hero */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            About FixMyStay
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            We're on a mission to make finding the perfect stay simple, trusted, and accessible for everyone across India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Story</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 mb-6">
              FixMyStay was born out of a simple frustration: finding quality accommodation in India shouldn't be this hard. Whether you're traveling for work, planning a vacation, or looking for a temporary stay, the process was often filled with uncertainty and hidden surprises.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              We set out to build a platform that connects travelers with verified properties — from hotels and resorts to PGs and vacation homes. Every listing on FixMyStay is carefully reviewed to ensure it meets our quality standards.
            </p>
            <p className="text-lg text-slate-600">
              Today, we partner with hundreds of property owners across India, offering travelers a wide range of options at every budget. Our team works around the clock to make your stay experience seamless, from booking to check-out.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We Stand For</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Verified Properties</h3>
              <p className="text-slate-600 text-sm">Every listing is physically verified for quality and authenticity.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Customer First</h3>
              <p className="text-slate-600 text-sm">24/7 support to help you with any questions or issues.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Best Price Guarantee</h3>
              <p className="text-slate-600 text-sm">Competitive pricing with no hidden charges.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Pan India Network</h3>
              <p className="text-slate-600 text-sm">Properties available in 100+ cities across India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Experience FixMyStay?</h2>
          <p className="text-slate-600 mb-8">Book your next stay with confidence.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">Find a Stay</Button>
            </Link>
            <Link href="/become-partner">
              <Button variant="outline" size="lg">Become a Partner</Button>
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