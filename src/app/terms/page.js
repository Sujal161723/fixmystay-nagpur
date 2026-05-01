import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { CheckCircle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Terms & Conditions
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="glass-card p-8 lg:p-12">
              <div className="prose prose-slate max-w-none">
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-slate-600 mb-6">
                  By accessing and using FixMyStay (the "Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                <p className="text-slate-600 mb-6">
                  FixMyStay is a comprehensive property and stay platform focused on Nagpur, providing users with the ability to search, book, and inquire about various types of accommodations including hotels, PG stays, rooms for rent, and real estate properties.
                </p>

                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                <div className="bg-accent rounded-xl p-6 mb-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">You must be at least 18 years old to create an account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">You are responsible for maintaining the confidentiality of your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">You agree to provide accurate and complete information</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">You are responsible for all activities under your account</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4">4. Property Listings</h2>
                <p className="text-slate-600 mb-6">
                  Vendors and property owners are solely responsible for the accuracy, quality, safety, and legality of their listings. FixMyStay does not verify the accuracy of listings and disclaims all liability for any errors or omissions.
                </p>

                <h2 className="text-2xl font-bold mb-4">5. Bookings and Payments</h2>
                <div className="bg-accent rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-slate-800 mb-3">Booking Process:</h3>
                  <ul className="space-y-2 text-slate-600">
                    <li>• For Hotels/Resorts: Date-based bookings with instant confirmation</li>
                    <li>• For PG/Flats/Sales: Inquiry-based system where you send a request</li>
                    <li>• All bookings are subject to availability</li>
                    <li>• Prices displayed are in Indian Rupees (INR)</li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4">6. Cancellation Policy</h2>
                <p className="text-slate-600 mb-6">
                  Cancellation policies vary by property and are set by individual vendors. Please review the specific cancellation policy before making a booking. For inquiries (PG/Flats), cancellations are handled directly with the property owner.
                </p>

                <h2 className="text-2xl font-bold mb-4">7. User Conduct</h2>
                <p className="text-slate-600 mb-6">
                  Users agree not to use the Platform for any unlawful purpose, to submit false information, or to engage in any conduct that could damage, disable, or impair the Platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
                <p className="text-slate-600 mb-6">
                  All content on the Platform, including text, graphics, logos, and software, is the property of FixMyStay or its licensors and is protected by Indian and international copyright laws.
                </p>

                <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
                <p className="text-slate-600 mb-6">
                  FixMyStay shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform or any bookings made through the Platform.
                </p>

                <h2 className="text-2xl font-bold mb-4">10. Dispute Resolution</h2>
                <p className="text-slate-600 mb-6">
                  Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Nagpur, Maharashtra, India.
                </p>

                <h2 className="text-2xl font-bold mb-4">11. Changes to Terms</h2>
                <p className="text-slate-600 mb-6">
                  We reserve the right to modify these Terms at any time. Continued use of the Platform after any changes constitutes acceptance of the revised Terms.
                </p>

                <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <p className="text-slate-600">
                    For questions about these Terms & Conditions, please contact us at:
                  </p>
                  <p className="font-bold text-slate-800 mt-2">
                    Email: legal@fixmystay.in
                  </p>
                  <p className="text-slate-600">
                    Address: Nagpur, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home */}
            <div className="text-center mt-8">
              <Link href="/" className="text-primary font-bold hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}