'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Settings, Building, Shield } from 'lucide-react';

export default function Navbar() {
  const { user, userRole, logout, loading } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase">
            <Shield className="w-3 h-3" /> Admin
          </span>
        );
      case 'hotel_owner':
        return (
          <span className="flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">
            <Building className="w-3 h-3" /> Owner
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-border z-50">
      <div className="container-custom h-full flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-primary"
        >
          FIXMYSTAY
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/search?category=hotels"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Hotels
          </Link>
          <Link
            href="/search?category=pg"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            PG Stays
          </Link>
          <Link
            href="/search?category=rooms"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Rooms
          </Link>
          <Link
            href="/search?category=real-estate"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Real Estate
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
          ) : user ? (
            <div className="relative">
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
                  <div className="absolute right-0 top-14 w-56 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                    <div className="p-4 border-b border-border">
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

                      {userRole === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-accent rounded-lg transition-colors"
                          onClick={() => setShowDropdown(false)}
                        >
                          <Shield className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}

                      {userRole === 'hotel_owner' && (
                        <Link
                          href="/admin"
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

                    <div className="border-t border-border p-2">
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
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="btn-primary py-2 px-5 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}