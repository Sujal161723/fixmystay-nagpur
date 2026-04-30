'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import MobileNav from '@/components/shared/MobileNav';
import { AlertTriangle, Shield, Phone, Mail, ChevronRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const reportTypes = [
  { value: 'fraud', label: 'Fraudulent Listing' },
  { value: 'misrepresentation', label: 'Property Misrepresentation' },
  { value: 'safety', label: 'Safety Concern' },
  { value: 'payment', label: 'Payment Issue' },
  { value: 'harassment', label: 'Harassment or Discrimination' },
  { value: 'other', label: 'Other Concern' },
];

const urgencyLevels = [
  { value: 'low', label: 'Low - General concern' },
  { value: 'medium', label: 'Medium - Needs attention' },
  { value: 'high', label: 'High - Urgent safety issue' },
  { value: 'emergency', label: 'Emergency - Immediate action needed' },
];

export default function ReportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reportType: '',
    urgency: 'medium',
    propertyId: '',
    propertyTitle: '',
    description: '',
    evidence: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.reportType) newErrors.reportType = 'Please select a report type';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.length < 50) newErrors.description = 'Please provide more details (minimum 50 characters)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      await addDoc(collection(db, 'reports'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
        assignedTo: null,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        reportType: '',
        urgency: 'medium',
        propertyId: '',
        propertyTitle: '',
        description: '',
        evidence: '',
      });
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-b from-amber-50 to-transparent">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <AlertTriangle className="w-4 h-4" />
                Report a Concern
              </div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight mb-6">
                We Take Your <span className="text-gradient">Concerns</span> Seriously
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                If you've encountered any issues or safety concerns, please report them to us. We investigate every report and take appropriate action.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="py-8">
          <div className="container-custom">
            <div className="bg-red-50 border border-red-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800">Emergency?</h3>
                  <p className="text-sm text-red-600">If you're in immediate danger, please contact local authorities first.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="tel:100" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Police: 100
                </a>
                <a href="tel:108" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Ambulance: 108
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Report Form */}
        <section className="py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {submitted ? (
                <div className="glass-card p-10 rounded-3xl text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Report Submitted Successfully</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for bringing this to our attention. Our team will review your report and take appropriate action. You'll receive updates at <strong>{formData.email}</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground mb-8">
                    Reference Number: <strong>FMS-RPT-{Date.now().toString().slice(-8)}</strong>
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary py-3 px-6"
                  >
                    Submit Another Report
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 rounded-3xl">
                  <h2 className="text-2xl font-bold mb-6">Submit Your Report</h2>
                  
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Your Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                            placeholder="Rajesh Kumar"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                            placeholder="rajesh@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Phone Number (Optional)
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Report Details */}
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-slate-800">Report Details</h3>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Report Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="reportType"
                            value={formData.reportType}
                            onChange={handleChange}
                            className={`input-field ${errors.reportType ? 'border-red-500' : ''}`}
                          >
                            <option value="">Select report type</option>
                            {reportTypes.map(type => (
                              <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                          </select>
                          {errors.reportType && <p className="text-red-500 text-xs mt-1">{errors.reportType}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Urgency Level
                          </label>
                          <select
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="input-field"
                          >
                            {urgencyLevels.map(level => (
                              <option key={level.value} value={level.value}>{level.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Property ID (If applicable)
                          </label>
                          <input
                            type="text"
                            name="propertyId"
                            value={formData.propertyId}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., PROP123456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2">
                            Property Title (If known)
                          </label>
                          <input
                            type="text"
                            name="propertyTitle"
                            value={formData.propertyTitle}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Property name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={6}
                          className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                          placeholder="Please provide a detailed description of the issue. Include dates, times, and any relevant details. (Minimum 50 characters)"
                        />
                        <div className="flex justify-between mt-1">
                          {errors.description ? (
                            <p className="text-red-500 text-xs">{errors.description}</p>
                          ) : (
                            <p className="text-muted-foreground text-xs">{formData.description.length}/50 minimum characters</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Evidence or Supporting Information (Optional)
                        </label>
                        <textarea
                          name="evidence"
                          value={formData.evidence}
                          onChange={handleChange}
                          rows={3}
                          className="input-field resize-none"
                          placeholder="Links to photos, screenshots, or other evidence..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Submit Report
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    All reports are kept confidential. By submitting, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Alternative Contact Methods */}
        <section className="py-20 bg-accent">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black tracking-tight mb-6">Alternative Ways to Reach Us</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <a 
                  href="mailto:safety@fixmystay.com"
                  className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:shadow-medium transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Email Us</h3>
                    <p className="text-sm text-muted-foreground">safety@fixmystay.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+919876543210"
                  className="glass-card p-6 rounded-3xl flex items-center gap-4 hover:shadow-medium transition-all"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-slate-800">Call Our Safety Team</h3>
                    <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                  </div>
                </a>
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