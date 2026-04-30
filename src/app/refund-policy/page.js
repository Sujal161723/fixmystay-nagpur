import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { RefreshCw, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Refund & Cancellation Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="glass-card p-8 lg:p-12">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 mb-8 text-lg">
                  We understand that plans can change. Our refund and cancellation policies are designed to be fair to both guests and property owners. Please review the specific policy for your booking type below.
                </p>

                {/* Hotel/Resort Bookings */}
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-primary" />
                    Hotel & Resort Bookings
                  </h2>
                  <p className="text-slate-600 mb-4">
                    For daily bookings (hotels, resorts, villas), the following cancellation policy applies:
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">Free Cancellation</span>
                        <span className="badge badge-success text-xs">Full Refund</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Cancel up to 24 hours before check-in for a full refund
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">Partial Refund</span>
                        <span className="badge badge-warning text-xs">50% Refund</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Cancel between 12-24 hours before check-in for 50% refund
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800">No Refund</span>
                        <span className="badge badge-error text-xs">0% Refund</span>
                      </div>
                      <p className="text-sm text-slate-600">
                        Cancel less than 12 hours before check-in - no refund
                      </p>
                    </div>
                  </div>
                </div>

                {/* PG/Flat Inquiries */}
                <div className="bg-accent rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-primary" />
                    PG & Flat Inquiries
                  </h2>
                  <p className="text-slate-600 mb-4">
                    For monthly stays (PG, flats, rooms), the inquiry system works differently:
                  </p>
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>No advance payment is required through the platform</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>All payment terms are negotiated directly with the property owner</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>Refund policies are as per the agreement with the property owner</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>FixMyStay acts as a facilitator and does not handle payments for these transactions</span>
                    </li>
                  </ul>
                </div>

                {/* Real Estate */}
                <div className="bg-accent rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-bold mb-4">Real Estate (Rent/Sale)</h2>
                  <p className="text-slate-600">
                    For real estate transactions, all financial arrangements are made directly between the buyer/tenant and the property owner. FixMyStay does not process payments for real estate transactions and therefore does not handle refunds for these deals.
                  </p>
                </div>

                {/* How to Cancel */}
                <h2 className="text-2xl font-bold mb-4">How to Request a Cancellation</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Go to Your Dashboard</h3>
                      <p className="text-sm text-slate-600">Navigate to the Bookings section in your user dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Select Your Booking</h3>
                      <p className="text-sm text-slate-600">Find the booking you wish to cancel and click on it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Request Cancellation</h3>
                      <p className="text-sm text-slate-600">Click "Cancel Booking" and provide a reason for cancellation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">Confirmation</h3>
                      <p className="text-sm text-slate-600">You'll receive a confirmation email with refund details if applicable</p>
                    </div>
                  </div>
                </div>

                {/* Refund Timeline */}
                <h2 className="text-2xl font-bold mb-4">Refund Timeline</h2>
                <div className="bg-accent rounded-xl p-6 mb-8">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 font-bold text-slate-800">Payment Method</th>
                        <th className="py-3 font-bold text-slate-800">Refund Time</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-slate-600">
                      <tr className="border-b border-gray-200">
                        <td className="py-3">Credit/Debit Card</td>
                        <td className="py-3">5-7 business days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3">UPI</td>
                        <td className="py-3">3-5 business days</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3">Net Banking</td>
                        <td className="py-3">5-7 business days</td>
                      </tr>
                      <tr>
                        <td className="py-3">Wallet</td>
                        <td className="py-3">2-3 business days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Exceptions */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-orange-800 mb-2">Important Exceptions</h3>
                      <ul className="space-y-2 text-sm text-orange-700">
                        <li>• Non-refundable bookings are clearly marked at the time of booking</li>
                        <li>• Service fees are non-refundable once the booking is confirmed</li>
                        <li>• Force majeure events may affect refund eligibility</li>
                        <li>• No-show bookings are not eligible for refunds</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <p className="text-slate-600 mb-4">
                    If you have questions about refunds or cancellations, our support team is here to help:
                  </p>
                  <div className="space-y-2">
                    <p className="font-bold text-slate-800">Email: support@fixmystay.in</p>
                    <p className="text-slate-600">Phone: +91 XXXXX XXXXX</p>
                    <p className="text-slate-600">Hours: Mon-Sat, 9 AM - 6 PM IST</p>
                  </div>
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