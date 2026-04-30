'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    phoneNumber: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  // Updated roles - removed admin (staff only by invitation)
  const roles = [
    { id: 'user', label: 'Guest', icon: User, description: 'Book stays & explore' },
    { id: 'vendor', label: 'Vendor', icon: Building, description: 'List your property' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Phone number validation for vendors
    if (formData.role === 'vendor' && !formData.phoneNumber) {
      setError('Phone number is required for vendors');
      return;
    }

    setLoading(true);

    const result = await signUp(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.role,
      formData.phoneNumber
    );

    setLoading(false);

    if (result.success) {
      // If vendor, redirect to KYC setup
      if (formData.role === 'vendor') {
        router.push('/dashboard/vendor/kyc');
      } else {
        router.push('/');
      }
    } else {
      setError(result.error || 'Failed to create account');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4 py-12">
      <div className="w-full max-w-lg bg-white border border-border rounded-2xl shadow-xl p-8">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-black text-primary mb-2 block">FIXMYSTAY</Link>
          <h1 className="text-xl font-bold italic">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join FixMyStay today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="input-field"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          {/* Phone Number (for vendors) */}
          {formData.role === 'vendor' && (
            <div>
              <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="input-field pl-10 pr-10"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="input-field pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-3">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <label
                    key={role.id}
                    className={`relative flex flex-col items-center p-4 border rounded-xl cursor-pointer transition-all ${
                      formData.role === role.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.id}
                      checked={formData.role === role.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon
                      className={`w-6 h-6 mb-2 ${
                        formData.role === role.id ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                    <span
                      className={`text-xs font-bold ${
                        formData.role === role.id ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {role.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground text-center mt-1">
                      {role.description}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-8">
          <p className="text-sm text-muted-foreground font-medium italic">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-bold ml-1 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Vendor info */}
        {formData.role === 'vendor' && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-800 font-medium">
              <strong>Note for Vendors:</strong> After signup, you'll need to complete KYC verification (Aadhaar/PAN) before listing properties.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}