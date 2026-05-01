'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Download, ExternalLink, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const pressReleases = [
  {
    id: 1,
    title: 'FixMyStay Raises $10M in Series A Funding',
    date: 'December 15, 2024',
    summary: 'Leading hospitality platform secures funding to expand operations across India and enhance technology capabilities.',
    category: 'Funding',
  },
  {
    id: 2,
    title: 'FixMyStay Partners with 1000+ Hotels Across India',
    date: 'November 20, 2024',
    summary: 'Platform reaches major milestone with over 1,000 verified hotel partners spanning 50+ cities.',
    category: 'Partnership',
  },
  {
    id: 3,
    title: 'FixMyStay Launches New Safety Features for Travelers',
    date: 'October 5, 2024',
    summary: 'New safety features include verified listings, 24/7 support, and emergency assistance for all bookings.',
    category: 'Product',
  },
  {
    id: 4,
    title: 'FixMyStay Named in Top 50 Startups to Watch',
    date: 'September 10, 2024',
    summary: 'Recognized by leading industry publication for innovation in hospitality technology.',
    category: 'Award',
  },
];

const mediaAssets = [
  { name: 'FixMyStay Logo (PNG)', size: '2.4 MB', type: 'Logo' },
  { name: 'FixMyStay Logo (SVG)', size: '156 KB', type: 'Logo' },
  { name: 'Brand Guidelines', size: '8.2 MB', type: 'Guide' },
  { name: 'Product Screenshots', size: '15.6 MB', type: 'Images' },
];

export default function PressPage() {
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
            Newsroom
          </h1>
          <p className="text-xl text-sky-100 max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and developments from FixMyStay.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Press Releases</h2>
            <p className="mt-4 text-slate-600">Latest announcements and news</p>
          </div>
          <div className="grid gap-6">
            {pressReleases.map((release) => (
              <Card key={release.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-sky-100 text-sky-700 text-xs font-medium px-3 py-1 rounded-full">
                          {release.category}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {release.date}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-lg">{release.title}</h3>
                      <p className="text-slate-600 mt-2">{release.summary}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Assets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Media Assets</h2>
            <p className="mt-4 text-slate-600">Download our brand resources</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaAssets.map((asset, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-slate-600" />
                  </div>
                  <h4 className="font-medium text-slate-900 text-sm">{asset.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{asset.size} • {asset.type}</p>
                  <button className="mt-3 text-sky-600 hover:text-sky-700 text-sm font-medium">
                    Download
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">Media Contact</h2>
          <p className="mt-4 text-slate-600">
            For press inquiries, interview requests, or additional information, please contact our communications team.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button>
              <Mail className="w-4 h-4 mr-2" />
              press@fixmystay.com
            </Button>
            <Button variant="outline">
              Follow on Twitter
            </Button>
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