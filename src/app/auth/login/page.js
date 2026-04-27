import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4">
      <div className="w-full max-w-md bg-white border border-border rounded-2xl shadow-xl p-8">
        <div className="mb-10 text-center">
          <Link href="/" className="text-2xl font-black text-primary mb-2 block">FIXMYSTAY</Link>
          <h1 className="text-xl font-bold italic">Welcome Back</h1>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">Email Address</label>
            <input type="email" placeholder="name@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase text-muted-foreground mb-2">Password</label>
            <input type="password" placeholder="Min. 8 characters" className="input-field" />
            <div className="text-right mt-1">
              <button type="button" className="text-xs text-primary font-bold">Forgot password?</button>
            </div>
          </div>

          <button className="btn-primary w-full py-4 rounded-xl font-bold">Sign In</button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-8">
          <p className="text-sm text-muted-foreground font-medium italic">
            New to FixMyStay? <Link href="/auth/signup" className="text-primary font-bold ml-1">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
