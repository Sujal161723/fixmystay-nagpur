'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, Building, Shield, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, userRole, logout, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
    setShowMobileMenu(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'staff':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">
            <Shield className="w-3 h-3" /> Staff
          </span>
        );
      case 'vendor':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">
            <Building className="w-3 h-3" /> Vendor
          </span>
        );
      default:
        return null;
    }
  };

  const navLinks = [
    { href: '/search?category=hotel', label: 'Hotels' },
    { href: '/search?category=pg', label: 'PG Stays' },
    { href: '/search?category=room', label: 'Rooms' },
    { href: '/search?category=real-estate', label: 'Real Estate' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-glass backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-primary"
        >
          FIXMYSTAY
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary"
          >
            {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {loading ? (
            <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
          ) : user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">
                    {user.displayName || user.email}
                  </p>
                  {getRoleBadge(userRole)}
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-bold text-gray-800">
                        {user.displayName || user.email}
                      </p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-lg transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>

                      {userRole === 'staff' && (
                        <Link
                          href="/dashboard/staff"
                          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-lg transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Shield className="w-4 h-4" />
                          Staff Panel
                        </Link>
                      )}

                      {userRole === 'vendor' && (
                        <Link
                          href="/dashboard/vendor"
                          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-lg transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Building className="w-4 h-4" />
                          Manage Properties
                        </Link>
                      )}

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-lg transition-colors"
                        onClick={() => setShowDropdown(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden md:inline-block text-sm font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="hidden md:inline-block btn-primary py-2 px-5 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <nav className="container-custom py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium hover:text-primary transition-colors py-2"
                onClick={() => setShowMobileMenu(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-sm font-medium hover:text-primary transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    My Profile
                  </Link>
                  {userRole === 'staff' && (
                    <Link
                      href="/dashboard/staff"
                      className="block text-sm font-medium hover:text-primary transition-colors py-2"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Staff Panel
                    </Link>
                  )}
                  {userRole === 'vendor' && (
                    <Link
                      href="/dashboard/vendor"
                      className="block text-sm font-medium hover:text-primary transition-colors py-2"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Manage Properties
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm font-medium text-red-600 py-2"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block text-sm font-medium hover:text-primary transition-colors py-2"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block btn-primary text-center py-3 rounded-xl text-sm"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}