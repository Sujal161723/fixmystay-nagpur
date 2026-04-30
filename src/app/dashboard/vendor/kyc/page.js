'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { 
  Shield, Upload, CheckCircle, AlertCircle, 
  FileText, CreditCard, ArrowRight, Camera
} from 'lucide-react';

export default function VendorKYC() {
  const { user, userRole, submitKYC, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    idType: 'aadhaar',
    idNumber: '',
    address: '',
    panNumber: '',
  });

  // Redirect non-vendor users
  if (!authLoading && user && userRole !== 'vendor') {
    router.push('/');
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.fullName || !formData.idNumber || !formData.address) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.idType === 'pan' && !formData.panNumber) {
      setError('PAN number is required when selecting PAN as ID type');
      return;
    }

    setLoading(true);

    try {
      const result = await submitKYC(user.uid, {
        ...formData,
        submittedAt: new Date().toISOString(),
      });

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/vendor');
        }, 3000);
      } else {
        setError(result.error || 'Failed to submit KYC');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent/30 pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">KYC Verification</h1>
            <p className="text-muted-foreground">
              Complete your identity verification to start listing properties on FixMyStay.
            </p>
          </div>

          {success ? (
            <div className="glass-card p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">KYC Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Your KYC details are under review. You'll be notified once verified.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass-card p-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Important Information</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Please ensure all details match your government-issued ID. 
                      Inaccurate information may delay the verification process.
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                  Full Name (as per ID) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="input-field"
                  required
                />
              </div>

              {/* ID Type Selection */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-muted-foreground mb-3">
                  Select ID Type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.idType === 'aadhaar'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="idType"
                      value="aadhaar"
                      checked={formData.idType === 'aadhaar'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <FileText className={`w-5 h-5 ${formData.idType === 'aadhaar' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-bold text-sm">Aadhaar Card</p>
                      <p className="text-xs text-muted-foreground">12-digit UID number</p>
                    </div>
                  </label>

                  <label
                    className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.idType === 'pan'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="idType"
                      value="pan"
                      checked={formData.idType === 'pan'}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <CreditCard className={`w-5 h-5 ${formData.idType === 'pan' ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <p className="font-bold text-sm">PAN Card</p>
                      <p className="text-xs text-muted-foreground">Permanent Account Number</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* ID Number */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                  {formData.idType === 'aadhaar' ? 'Aadhaar Number' : 'PAN Number'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder={formData.idType === 'aadhaar' ? 'XXXX-XXXX-XXXX' : 'ABCDE1234F'}
                  className="input-field"
                  required
                />
              </div>

              {/* PAN Number (additional field if ID type is Aadhaar) */}
              {formData.idType === 'aadhaar' && (
                <div className="mb-6">
                  <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                    PAN Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="ABCDE1234F"
                    className="input-field"
                  />
                </div>
              )}

              {/* Address */}
              <div className="mb-6">
                <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address"
                  className="input-field min-h-[100px]"
                  required
                />
              </div>

              {/* Upload Documents Info */}
              <div className="bg-accent rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">Document Upload</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You may be asked to upload a scanned copy of your ID and address proof 
                      after submission. Keep these documents ready:
                    </p>
                    <ul className="text-xs text-muted-foreground mt-2 list-disc list-inside">
                      <li>Front and back of {formData.idType === 'aadhaar' ? 'Aadhaar' : 'PAN'} card</li>
                      <li>Address proof (if different from ID)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Verification
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By submitting, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}