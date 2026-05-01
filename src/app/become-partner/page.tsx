'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Building2, CheckCircle, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { partnerService } from '@/lib/firebase';

const propertyTypes = [
  { value: 'hotel', label: 'Hotel' },
  { value: 'pg', label: 'PG (Paying Guest)' },
  { value: 'flat', label: 'Flat/Apartment' },
  { value: 'resort', label: 'Resort' },
  { value: 'villa', label: 'Villa' },
  { value: 'farmhouse', label: 'Farmhouse' },
  { value: 'marriage_hall', label: 'Marriage Hall' },
];

const cities = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'pune', label: 'Pune' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'goa', label: 'Goa' },
  { value: 'manali', label: 'Manali' },
  { value: 'other', label: 'Other' },
];

export default function BecomePartnerPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    propertyType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.city) {
      newErrors.city = 'Please select a city';
    }
    
    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await partnerService.createPartnerRequest({
        name: formData.name,
        phone: formData.phone,
        city: cities.find(c => c.value === formData.city)?.label || formData.city,
        propertyType: propertyTypes.find(p => p.value === formData.propertyType)?.label || formData.propertyType,
        message: formData.message,
        status: 'pending',
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting partner request:', error);
      // In production, show proper error message to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Thank You!
            </h2>
            <p className="text-slate-600 mb-6">
              Your partner request has been submitted successfully. Our team will review your application and contact you within 2-3 business days.
            </p>
            <Link href="/">
              <Button variant="primary">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              Become a Partner
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              Join thousands of property owners earning on FixMyStay. List your property and reach millions of travelers across India.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Competitive Commission</h3>
                  <p className="text-slate-600">Low commission rates with transparent pricing. You keep more of what you earn.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Easy Management</h3>
                  <p className="text-slate-600">Manage bookings, availability, and pricing from our intuitive partner dashboard.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Dedicated Support</h3>
                  <p className="text-slate-600">24/7 partner support to help you with any questions or issues.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Partner Enquiry Form</CardTitle>
                <CardDescription>
                  Fill in your details and our team will contact you soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Full Name *"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange('name')(e.target.value)}
                    error={errors.name}
                  />

                  <Input
                    label="Phone Number *"
                    placeholder="Enter your 10-digit phone number"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone')(e.target.value)}
                    error={errors.phone}
                    type="tel"
                  />

                  <Select
                    label="City *"
                    placeholder="Select your city"
                    value={formData.city}
                    onChange={(e) => handleChange('city')(e.target.value)}
                    options={cities}
                    error={errors.city}
                  />

                  <Select
                    label="Property Type *"
                    placeholder="Select property type"
                    value={formData.propertyType}
                    onChange={(e) => handleChange('propertyType')(e.target.value)}
                    options={propertyTypes}
                    error={errors.propertyType}
                  />

                  <Textarea
                    label="Message (Optional)"
                    placeholder="Tell us about your property..."
                    value={formData.message}
                    onChange={(e) => handleChange('message')(e.target.value)}
                    rows={4}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    By submitting, you agree to our{' '}
                    <Link href="/terms" className="text-sky-500 hover:underline">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-sky-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}