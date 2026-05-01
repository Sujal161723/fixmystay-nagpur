'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: June 2024</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
              <p className="text-slate-600 mb-4">
                FixMyStay ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
              <p className="text-slate-600">
                By using FixMyStay, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Personal Information</h3>
              <p className="text-slate-600 mb-4">
                When you create an account or make a booking, we may collect:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Name and contact information (email, phone number)</li>
                <li>Government ID for verification purposes</li>
                <li>Payment information (processed securely via PCI-compliant providers)</li>
                <li>Profile photos and preferences</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-800 mb-2">Automatically Collected Information</h3>
              <p className="text-slate-600 mb-4">
                When you use our platform, we automatically collect:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Device information and IP address</li>
                <li>Location data (with your permission)</li>
                <li>Browsing activity and search history</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
              <p className="text-slate-600 mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Processing bookings and payments</li>
                <li>Sending booking confirmations and updates</li>
                <li>Providing customer support</li>
                <li>Improving our services and user experience</li>
                <li>Sending promotional communications (with your consent)</li>
                <li>Preventing fraud and ensuring platform security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">4. Information Sharing</h2>
              <p className="text-slate-600 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Property owners/vendors to facilitate bookings</li>
                <li>Payment processors to handle transactions</li>
                <li>Service providers who assist our operations</li>
                <li>Law enforcement when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">5. Data Security</h2>
              <p className="text-slate-600 mb-4">
                We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">6. Your Rights</h2>
              <p className="text-slate-600 mb-4">You have the right to:</p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">7. Contact Us</h2>
              <p className="text-slate-600">
                For privacy-related questions, contact us at{' '}
                <Link href="/contact" className="text-sky-500 hover:underline">
                  privacy@fixmystay.com
                </Link>
              </p>
            </section>
          </div>

          <div className="mt-12 flex gap-4">
            <Link href="/terms">
              <Button variant="outline">Terms & Conditions</Button>
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