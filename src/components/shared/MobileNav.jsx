'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Home, Compass, Calendar, User, Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      href: '/',
      badge: null,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
      href: '/search',
      badge: null,
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      href: '/search',
      badge: null,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      href: user ? '/dashboard' : '/auth/login',
      badge: null,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      href: user ? '/dashboard' : '/auth/login',
      badge: null,
    },
  ];

  const isActive = (item) => {
    if (item.id === 'home' && pathname === '/') return true;
    if (item.id === 'explore' && pathname === '/search') return true;
    if (item.id === 'search' && pathname === '/search') return true;
    if (item.id === 'bookings' && pathname?.startsWith('/dashboard')) return true;
    if (item.id === 'profile' && pathname?.startsWith('/dashboard')) return true;
    return false;
  };

  const handleClick = (item) => {
    if (item.id === 'search') {
      router.push('/search');
    } else {
      router.push(item.href);
    }
  };

  // Don't show on auth pages or dashboard
  if (pathname?.startsWith('/auth') || pathname?.startsWith('/dashboard') || pathname === '/admin') {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item)}
              className={`relative flex flex-col items-center justify-center w-full py-2 px-1 transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon 
                  className={`w-5 h-5 ${active ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} 
                />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium mt-1 ${active ? 'font-bold' : ''}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area padding for iOS home indicator */}
      <style jsx>{`
        .pb-safe {
          padding-bottom: env(safe-area-inset-bottom, 8px);
        }
      `}</style>
    </nav>
  );
}