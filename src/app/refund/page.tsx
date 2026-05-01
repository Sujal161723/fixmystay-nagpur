'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>
            <nav className="ml-auto flex items-center gap-6">
              <Link href="/#stays" className="text-slate-600 hover:text-slate-900">Stays</Link>
              <Link href="/become-partner" className="text-slate-600 hover:text-slate-900">Partner</Link>
              <Link href="/login" className="text-slate-600 hover:text-slate-900">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Refund & Cancellation Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: June 2024</p>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Overview</h2>
              <p className="text-slate-600 mb-4">
                At FixMyStay, we understand that travel plans can change. Our refund and cancellation policies are designed to be fair to both guests and property owners. Please read this policy carefully before making a booking.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Cancellation Policies</h2>
              <p className="text-slate-600 mb-4">
                Each property on FixMyStay follows one of the following cancellation policies, clearly displayed on the listing page:
              </p>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">🟢 Flexible</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>Full refund if cancelled 24 hours before check-in</li>
                  <li>50% refund if cancelled within 24 hours of check-in</li>
                  <li>Best for: Uncertain travel plans</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">🟡 Moderate</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>Full refund if cancelled 5 days before check-in</li>
                  <li>50% refund if cancelled within 5 days of check-in</li>
                  <li>Best for: Standard bookings</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">🔴 Strict</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>50% refund if cancelled 7 days before check-in</li>
                  <li>No refund if cancelled within 7 days of check-in</li>
                  <li>Best for: Peak season and special properties</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">⚫ Non-Refundable</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1">
                  <li>No refund for any cancellation</li>
                  <li>Lowest price guarantee</li>
                  <li>Best for: Confirmed travel plans</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">How to Cancel</h2>
              <ol className="list-decimal pl-5 text-slate-600 mb-4 space-y-1">
                <li>Log in to your FixMyStay account</li>
                <li>Go to "My Bookings" in your dashboard</li>
                <li>Select the booking you wish to cancel</li>
                <li>Click "Cancel Booking" and follow the prompts</li>
                <li>You will receive a confirmation email with refund details</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Refund Process</h2>
              <p className="text-slate-600 mb-4">
                Once your cancellation is confirmed:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Refunds are processed within 5-7 business days</li>
                <li>The amount is credited to your original payment method</li>
                <li>Bank processing times may vary</li>
                <li>You will receive an email confirmation once the refund is initiated</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Special Circumstances</h2>
              <p className="text-slate-600 mb-4">
                We may provide exceptions to our cancellation policy in the following cases:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li><strong>Medical emergencies:</strong> With valid documentation</li>
                <li><strong>Natural disasters:</strong> When travel is impossible</li>
                <li><strong>Property issues:</strong> If the property is not as described</li>
                <li><strong>Government restrictions:</strong> Travel bans or lockdowns</li>
              </ul>
              <p className="text-slate-600">
                Contact our support team with documentation to request an exception.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">No-Show Policy</h2>
              <p className="text-slate-600 mb-4">
                If you do not check in on your scheduled arrival date without prior cancellation:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>The booking will be marked as "No-Show"</li>
                <li>No refund will be provided</li>
                <li>The property may release the room after 24 hours</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Modifications</h2>
              <p className="text-slate-600 mb-4">
                To modify your booking dates:
              </p>
              <ul className="list-disc pl-5 text-slate-600 mb-4 space-y-1">
                <li>Contact the property owner through our platform</li>
                <li>Modifications are subject to property availability</li>
                <li>Price differences will be charged or refunded</li>
                <li>Cancellation policy applies to the original booking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">Contact Us</h2>
              <p className="text-slate-600">
                For refund-related queries, contact us at{' '}
                <Link href="/contact" className="text-sky-500 hover:underline">
                  support@fixmystay.com
                </Link>{' '}
                or call +91 98765 43210.
              </p>
            </section>
          </div>

          <div className="mt-12 flex gap-4">
            <Link href="/privacy">
              <Button variant="outline">Privacy Policy</Button>
            </Link>
            <Link href="/terms">
              <Button variant="outline">Terms & Conditions</Button>
            </Link>
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