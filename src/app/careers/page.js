'use client';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import Link from 'next/link';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Users, TrendingUp, Heart, Zap, Coffee, Laptop, Target } from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Nagpur (On-site)',
    type: 'Full-time',
    experience: '5+ years',
    description: 'We are looking for an experienced developer to lead our platform development.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Nagpur (Hybrid)',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Drive product strategy and execution for our core booking platform.',
  },
  {
    id: 3,
    title: 'Customer Success Manager',
    department: 'Operations',
    location: 'Nagpur (On-site)',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Ensure our customers have the best experience with FixMyStay.',
  },
  {
    id: 4,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Lead our digital marketing initiatives across all channels.',
  },
  {
    id: 5,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Nagpur (Hybrid)',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Create beautiful, intuitive experiences for our users.',
  },
  {
    id: 6,
    title: 'Business Development Executive',
    department: 'Sales',
    location: 'Nagpur (On-site)',
    type: 'Full-time',
    experience: '1+ years',
    description: 'Expand our partner network across Nagpur and beyond.',
  },
];

const departments = [
  { name: 'Engineering', icon: Laptop, color: 'blue', openings: 5 },
  { name: 'Product', icon: Target, color: 'green', openings: 2 },
  { name: 'Operations', icon: Users, color: 'purple', openings: 4 },
  { name: 'Marketing', icon: TrendingUp, color: 'amber', openings: 3 },
];

export default function CareersPage() {
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
                Join Our Team
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                Build the Future of <span className="text-gradient">Stays</span> with Us
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                We are on a mission to revolutionize how people find and book accommodations in Nagpur. Join our team and make an impact.
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Why Join FixMyStay?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We are more than just a workplace - we are a community of passionate individuals building something extraordinary.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { icon: Target, title: 'Impactful Work', desc: 'Your work directly impacts thousands of users', color: 'blue' },
                { icon: Users, title: 'Great Team', desc: 'Work with talented, passionate people', color: 'green' },
                { icon: TrendingUp, title: 'Growth', desc: 'Learn and grow with a fast-paced startup', color: 'purple' },
                { icon: Heart, title: 'Culture', desc: 'Inclusive, supportive, and fun environment', color: 'amber' },
              ].map((item) => {
                const Icon = item.icon;
                const bgColor = item.color === 'blue' ? 'bg-blue-50' :
                               item.color === 'green' ? 'bg-green-50' :
                               item.color === 'purple' ? 'bg-purple-50' : 'bg-amber-50';
                const textColor = item.color === 'blue' ? 'text-blue-600' :
                                 item.color === 'green' ? 'text-green-600' :
                                 item.color === 'purple' ? 'text-purple-600' : 'text-amber-600';

                return (
                  <div key={item.title} className="glass-card p-6 rounded-3xl text-center">
                    <div className={`w-14 h-14 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-7 h-7 ${textColor}`} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Perks */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Perks and Benefits</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We take care of our team so they can take care of business
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Zap, title: 'Competitive Salary', desc: 'Industry-leading compensation packages' },
                { icon: Coffee, title: 'Flexible Hours', desc: 'Work when you are most productive' },
                { icon: Laptop, title: 'Remote Options', desc: 'Hybrid and remote work available' },
                { icon: TrendingUp, title: 'Learning Budget', desc: 'Annual budget for courses and conferences' },
                { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive health coverage for you and family' },
                { icon: Star, title: 'Stock Options', desc: 'Own a piece of the company you help build' },
              ].map((perk) => {
                const Icon = perk.icon;
                return (
                  <div key={perk.title} className="flex gap-4 items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-1">{perk.title}</h3>
                      <p className="text-sm text-muted-foreground">{perk.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Open Positions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find your next opportunity
              </p>
            </div>

            {/* Department Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {departments.map((dept) => {
                const Icon = dept.icon;
                return (
                  <button
                    key={dept.name}
                    className="glass-card px-6 py-3 rounded-full flex items-center gap-3 hover:shadow-medium transition-all"
                  >
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="font-medium text-slate-700">{dept.name}</span>
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {dept.openings}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Job Listings */}
            <div className="max-w-4xl mx-auto space-y-4">
              {jobs.map((job) => (
                <div key={job.id} className="glass-card p-6 rounded-3xl hover:shadow-medium transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
                    </div>
                    <Link
                      href={`/careers/${job.id}`}
                      className="btn-primary py-3 px-6 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-black tracking-tight mb-6">
                Do Not See Your Role?
              </h2>
              <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                We are always looking for talented individuals. Send us your resume and we will keep you in mind for future opportunities.
              </p>
              <a 
                href="mailto:careers@fixmystay.com"
                className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-shadow inline-flex items-center gap-2"
              >
                Send Your Resume
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}