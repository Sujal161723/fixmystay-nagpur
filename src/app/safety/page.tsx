'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, CheckCircle, AlertTriangle, Phone, Lock, Users, Eye, FileText } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const safetyFeatures = [
  {
    icon: Eye,
    title: 'Verified Properties',
    description: 'Every property is physically verified by our team for quality, safety, and accuracy before listing.',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    description: 'All transactions are encrypted with industry-standard SSL. We never store your card details.',
  },
  {
    icon: Users,
    title: 'Verified Hosts',
    description: 'All property owners and managers undergo identity verification and background checks.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    description: 'Our support team is available round-the-clock to assist with any concerns during your stay.',
  },
];

const safetyMeasures = [
  {
    title: 'Property Verification',
    items: [
      'Physical inspection of all properties',
      'Verification of safety equipment (fire extinguishers, exits)',
      'Quality check of amenities and facilities',
      'Photo verification to match listings',
      'Regular re-verification every 6 months',
    ],
  },
  {
    title: 'Guest Safety',
    items: [
      'Secure payment processing',
      'Privacy protection for all personal data',
      'Emergency contact support 24/7',
      'Safe cancellation policies',
      'Guest reviews and ratings system',
    ],
  },
  {
    title: 'COVID-19 Safety',
    items: [
      'Enhanced cleaning protocols',
      'Contactless check-in available',
      'Sanitization between stays',
      'Social distancing guidelines',
      'Health and safety training for staff',
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-white">
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
      <section className="bg-gradient-to-br from-emerald-500 to-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-12 h-12 text-white" />
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Safety First</h1>
            </div>
            <p className="text-xl text-emerald-100">
              Your safety is our top priority. We've implemented comprehensive measures to ensure every booking and stay is secure, verified, and worry-free.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Safety Commitment</h2>
            <p className="mt-4 text-slate-600">Comprehensive protection at every step</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} hover>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Measures */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Safety Measures</h2>
            <p className="mt-4 text-slate-600">Detailed protocols we follow</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {safetyMeasures.map((measure, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 text-lg mb-4">{measure.title}</h3>
                  <ul className="space-y-3">
                    {measure.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Emergency Support</h2>
              <p className="text-slate-700 mb-6 max-w-2xl mx-auto">
                If you face any emergency during your stay, our dedicated team is available 24/7 to assist you.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-2" />
                  Call: +91 1800-123-4567
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Safety Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Report Issue */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900">Report a Safety Concern</h2>
          <p className="text-slate-600 mt-4 mb-8">
            If you notice any safety issues with a property or have concerns about your booking, please report it immediately.
          </p>
          <Link href="/contact">
            <Button>Report an Issue</Button>
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