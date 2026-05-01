'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.success) {
      // Redirect based on role - the AuthContext will handle this
      router.push('/');
    } else {
      setError(result.error || 'Failed to sign in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-8">
        <div className="mb-10 text-center">
          <Link href="/" className="text-2xl font-black text-primary mb-2 block">FIXMYSTAY</Link>
          <h1 className="text-xl font-bold italic">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link href="/auth/forgot-password" className="text-xs text-primary font-bold hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 pt-8">
          <p className="text-sm text-muted-foreground font-medium italic">
            New to FixMyStay?{' '}
            <Link href="/auth/signup" className="text-primary font-bold ml-1 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}