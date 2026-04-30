import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Shield, Lock, Eye, Database, User, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-lg text-muted-foreground">
                Last updated: {new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Content */}
            <div className="glass-card p-8 lg:p-12">
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 mb-8 text-lg">
                  At FixMyStay, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                </p>

                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary" />
                  1. Information We Collect
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-accent rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Personal Information</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Name and email address</li>
                      <li>• Phone number</li>
                      <li>• Profile photo</li>
                      <li>• Date of birth</li>
                      <li>• Payment information</li>
                    </ul>
                  </div>
                  <div className="bg-accent rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Automatically Collected</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      <li>• Device information</li>
                      <li>• IP address</li>
                      <li>• Browser type</li>
                      <li>• Usage data</li>
                      <li>• Location data</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  2. How We Use Your Information
                </h2>
                <div className="bg-accent rounded-xl p-6 mb-8">
                  <ul className="space-y-3 text-slate-600">
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To process bookings and inquiries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To send booking confirmations and updates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To improve our services and user experience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To send promotional communications (with your consent)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To detect and prevent fraud</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary font-bold">•</span>
                      <span>To comply with legal obligations</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  3. Data Storage and Security
                </h2>
                <p className="text-slate-600 mb-6">
                  We use industry-standard security measures to protect your data. All information is stored securely on Firebase servers with encryption at rest and in transit. We regularly review our security practices to ensure your data remains protected.
                </p>

                <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <User className="w-6 h-6 text-primary" />
                  4. Your Rights
                </h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Access</h3>
                    <p className="text-sm text-slate-600">Request a copy of your personal data</p>
                  </div>
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Correction</h3>
                    <p className="text-sm text-slate-600">Update or correct inaccurate data</p>
                  </div>
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Deletion</h3>
                    <p className="text-sm text-slate-600">Request deletion of your data</p>
                  </div>
                  <div className="border border-border rounded-xl p-4">
                    <h3 className="font-bold text-slate-800 mb-2">Opt-out</h3>
                    <p className="text-sm text-slate-600">Unsubscribe from marketing communications</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
                <p className="text-slate-600 mb-6">
                  We use cookies and similar tracking technologies to enhance your experience. You can control cookie preferences through your browser settings. Essential cookies are necessary for the platform to function properly.
                </p>

                <h2 className="text-2xl font-bold mb-4">6. Third-Party Services</h2>
                <p className="text-slate-600 mb-6">
                  Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. Please review their privacy policies before providing any personal information.
                </p>

                <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
                <p className="text-slate-600 mb-6">
                  We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. Account data is retained while your account is active.
                </p>

                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-slate-600 mb-6">
                  Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>

                <h2 className="text-2xl font-bold mb-4">9. Changes to This Policy</h2>
                <p className="text-slate-600 mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>

                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                  <p className="text-slate-600 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-slate-800">
                      <Mail className="w-4 h-4 text-primary" />
                      <strong>Email:</strong> privacy@fixmystay.in
                    </p>
                    <p className="text-slate-600">
                      <strong>Address:</strong> Nagpur, Maharashtra, India
                    </p>
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