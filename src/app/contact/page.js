'use client';

import { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, HelpCircle, ChevronRight } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a property?',
    answer: 'Simply search for properties, select your preferred option, and fill out the inquiry form. Our team will connect you with the property owner.',
  },
  {
    question: 'Are all listings verified?',
    answer: 'Yes, every listing on FixMyStay goes through a verification process to ensure authenticity and accuracy.',
  },
  {
    question: 'How can I become a partner?',
    answer: 'Visit our Become a Partner page and fill out the inquiry form. Our partnership team will contact you within 24 hours.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Nagpur and surrounding areas, including MIHAN, Wardha Road, Sitabuldi, Dharampeth, and more.',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <MessageCircle className="w-4 h-4" />
                Get in Touch
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                We're Here to <span className="text-gradient">Help</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="glass-card p-8 md:p-10 rounded-3xl">
                  <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                  
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="btn-primary py-3 px-6"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Rajesh Kumar"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="rajesh@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Subject
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="input-field"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="booking">Booking Support</option>
                          <option value="partnership">Partnership Inquiry</option>
                          <option value="technical">Technical Issue</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="input-field resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {loading ? 'Sending...' : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-lg mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Address</p>
                        <p className="text-sm text-muted-foreground">
                          123, IT Park Road,<br />
                          MIHAN, Nagpur - 440001<br />
                          Maharashtra, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          +91 98765 43210<br />
                          +91 74185 29630
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Email</p>
                        <p className="text-sm text-muted-foreground">
                          support@fixmystay.com<br />
                          hello@fixmystay.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">Business Hours</p>
                        <p className="text-sm text-muted-foreground">
                          Mon - Sat: 9:00 AM - 8:00 PM<br />
                          Sunday: 10:00 AM - 6:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="glass-card p-6 rounded-3xl">
                  <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                  <div className="space-y-3">
                    <a href="/help" className="flex items-center justify-between p-3 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
                      <span className="font-medium text-slate-700">Help Center</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a href="/safety" className="flex items-center justify-between p-3 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
                      <span className="font-medium text-slate-700">Safety Information</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                    <a href="/report" className="flex items-center justify-between p-3 bg-accent/50 rounded-xl hover:bg-accent transition-colors">
                      <span className="font-medium text-slate-700">Report a Concern</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black tracking-tight mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Quick answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="glass-card rounded-3xl group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <div className="flex items-center gap-4">
                      <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-bold text-slate-800">{faq.question}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-6 pl-14">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}