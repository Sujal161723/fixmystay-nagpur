'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Lead the development of our customer-facing applications using React and Next.js.',
  },
  {
    id: 2,
    title: 'Product Designer',
    department: 'Design',
    location: 'Mumbai',
    type: 'Full-time',
    description: 'Design beautiful and intuitive experiences for our platform.',
  },
  {
    id: 3,
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Build scalable APIs and services using Node.js and Firebase.',
  },
  {
    id: 4,
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Delhi',
    type: 'Full-time',
    description: 'Ensure our partners and customers have exceptional experiences.',
  },
  {
    id: 5,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Mumbai',
    type: 'Full-time',
    description: 'Drive growth through digital marketing and brand building.',
  },
  {
    id: 6,
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Bangalore',
    type: 'Full-time',
    description: 'Analyze user behavior and business metrics to drive decisions.',
  },
];

export default function CareersPage() {
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
              <Link href="/about" className="text-slate-600 hover:text-slate-900">About</Link>
              <Link href="/contact" className="text-slate-600 hover:text-slate-900">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-500 to-sky-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Help us revolutionize the hospitality industry. We're building the future of property discovery and booking.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Our Values</h2>
            <p className="mt-4 text-slate-600">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Innovation</h3>
              <p className="text-slate-600">We constantly push boundaries to create better experiences.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Ownership</h3>
              <p className="text-slate-600">Every team member takes responsibility for our success.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Impact</h3>
              <p className="text-slate-600">We focus on work that matters to our customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Open Positions</h2>
            <p className="mt-4 text-slate-600">Find your next opportunity</p>
          </div>
          <div className="grid gap-4">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:border-sky-300 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-lg">{job.title}</h3>
                    <p className="text-slate-600 mt-1">{job.description}</p>
                    <div className="flex flex-wrap gap-4 mt-4">
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button className="flex-shrink-0">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
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