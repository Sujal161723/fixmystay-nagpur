'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { auth } from '@/lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';

type AuthMode = 'signin' | 'signup' | 'forgot';

export default function SignInPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasRedirected, setHasRedirected] = useState(false);

  // Check if user is already logged in on mount (only once)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !hasRedirected) {
        setHasRedirected(true);
        // Redirect based on user type - check Firestore for user type
        const userType = localStorage.getItem('userType') || 'user';
        router.push(`/dashboard/${userType}`);
      }
    });
    return () => unsubscribe();
  }, [router, hasRedirected]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password);
        // User type will be set by onAuthStateChanged listener
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set default user type
        localStorage.setItem('userType', 'user');
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email);
        setSuccess('Password reset email sent. Check your inbox.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">FM</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">FixMyStay</h1>
          <p className="text-slate-600 mt-2">
            {mode === 'signin' && 'Welcome back'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                      required
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? 'Please wait...' : (
                  mode === 'signin' ? 'Sign In' : 
                  mode === 'signup' ? 'Create Account' : 
                  'Send Reset Link'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              {mode === 'signin' && (
                <>
                  <p className="text-sm text-slate-600">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setMode('signup')}
                      className="text-sky-600 hover:underline font-medium"
                    >
                      Sign Up
                    </button>
                  </p>
                  <p className="text-sm text-slate-600 mt-2">
                    <button 
                      onClick={() => setMode('forgot')}
                      className="text-sky-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </p>
                </>
              )}
              {mode === 'signup' && (
                <p className="text-sm text-slate-600">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setMode('signin')}
                    className="text-sky-600 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </p>
              )}
              {mode === 'forgot' && (
                <p className="text-sm text-slate-600">
                  Remember your password?{' '}
                  <button 
                    onClick={() => setMode('signin')}
                    className="text-sky-600 hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-slate-500 mt-6">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-sky-600 hover:underline">
            Terms of Service
          </Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-sky-600 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}