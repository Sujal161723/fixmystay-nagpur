import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-border z-50">
      <div className="container-custom h-full flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tight text-primary">
          FIXMYSTAY
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/search?category=hotels" className="text-sm font-medium hover:text-primary transition-colors">Hotels</Link>
          <Link href="/search?category=pg" className="text-sm font-medium hover:text-primary transition-colors">PG Stays</Link>
          <Link href="/search?category=rooms" className="text-sm font-medium hover:text-primary transition-colors">Rooms</Link>
          <Link href="/search?category=real-estate" className="text-sm font-medium hover:text-primary transition-colors">Real Estate</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/auth/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
          <Link href="/auth/signup" className="btn-primary py-2 px-5 text-sm">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}
