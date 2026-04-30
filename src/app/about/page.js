'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import Link from 'next/link';
import { ArrowRight, Target, Users, Award, Heart, MapPin, TrendingUp, Shield, Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Star className="w-4 h-4" />
                About FixMyStay
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Revolutionizing <span className="text-gradient">Stays</span> in Nagpur
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                We're on a mission to make finding and booking accommodations in Nagpur simple, secure, and satisfying for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-6">Our Story</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  FixMyStay was born out of a simple observation: finding quality accommodation in Nagpur was unnecessarily difficult. Whether you're a student looking for a PG near MIHAN, a traveler seeking a hotel, or an investor exploring real estate opportunities, the process was fragmented and unreliable.
                </p>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  We set out to create a unified platform that brings together all accommodation options under one roof, with verified listings, transparent pricing, and a seamless booking experience.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Today, we're proud to serve thousands of customers across Nagpur, from Dharampeth to Wardha Road, helping them find their perfect stay.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent rounded-3xl flex items-center justify-center">
                  <MapPin className="w-32 h-32 text-primary opacity-50" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <p className="text-4xl font-black text-primary mb-1">2024</p>
                  <p className="text-sm text-muted-foreground">Founded in Nagpur</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">Our Mission & Vision</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Driving change in Nagpur's accommodation landscape
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="glass-card p-10 rounded-3xl">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-black mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide every resident and visitor of Nagpur with access to verified, quality accommodation options through a transparent, user-friendly platform that eliminates uncertainty and builds trust.
                </p>
              </div>

              <div className="glass-card p-10 rounded-3xl">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To become Nagpur's most trusted accommodation platform, setting the gold standard for verified listings, customer service, and seamless digital experiences in the real estate and hospitality sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="glass-card p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  Every listing is verified, every price is transparent, and every transaction is secure.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We're here to help, 24/7.
                </p>
              </div>

              <div className="glass-card p-8 rounded-3xl text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
                <p className="text-muted-foreground">
                  We constantly evolve our platform to serve you better with new features and improvements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-5xl font-black mb-2">10K+</p>
                <p className="text-white/80 font-medium">Verified Listings</p>
              </div>
              <div>
                <p className="text-5xl font-black mb-2">50K+</p>
                <p className="text-white/80 font-medium">Happy Customers</p>
              </div>
              <div>
                <p className="text-5xl font-black mb-2">500+</p>
                <p className="text-white/80 font-medium">Partner Properties</p>
              </div>
              <div>
                <p className="text-5xl font-black mb-2">24/7</p>
                <p className="text-white/80 font-medium">Customer Support</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black tracking-tight mb-4">Leadership Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals dedicated to your satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Rajesh Sharma', role: 'CEO & Founder', desc: '15+ years in real estate' },
                { name: 'Priya Patel', role: 'COO', desc: 'Hospitality expert' },
                { name: 'Amit Kumar', role: 'CTO', desc: 'Tech innovator' },
              ].map((member, index) => (
                <div key={index} className="glass-card p-8 rounded-3xl text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-10 h-10 text-primary opacity-50" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-black tracking-tight mb-6">
                Ready to Experience the Difference?
              </h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join thousands of satisfied customers who trust FixMyStay for their accommodation needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/search" className="btn-primary py-4 px-8 text-lg flex items-center justify-center gap-2">
                  Browse Properties
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-outline py-4 px-8 text-lg">
                  Contact Us
                </Link>
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