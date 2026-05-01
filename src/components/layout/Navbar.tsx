'use client';

import React, { useState } from 'react';
import { Search, Bell, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import Button from '../ui/Button';

interface NavbarProps {
  title?: string;
  userType?: 'user' | 'vendor' | 'staff';
  onMobileMenuToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  title = 'Dashboard',
  userType = 'user',
  onMobileMenuToggle,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userMenuItems = [
    { icon: <User className="w-4 h-4" />, label: 'Profile', href: '/profile' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/settings' },
    { divider: true },
    { icon: <LogOut className="w-4 h-4" />, label: 'Logout', href: '/logout', danger: true },
  ];

  const notifications = [
    { id: 1, title: 'New booking request', message: 'John Doe booked your property', time: '5 min ago', unread: true },
    { id: 2, title: 'Payment received', message: '$450 from Jane Smith', time: '1 hour ago', unread: true },
    { id: 3, title: 'Review received', message: '5-star review from Mike Johnson', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      {/* Left side - Mobile menu & title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Page title */}
        <h1 className="text-xl font-semibold text-slate-900 hidden sm:block">
          {title}
        </h1>
      </div>

      {/* Right side - Search, Notifications, User */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search bar - hidden on mobile */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 cursor-pointer ${
                      notification.unread ? 'bg-sky-50/50' : ''
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{notification.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-slate-100">
                <button className="text-sm text-sky-500 font-medium hover:text-sky-600">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">
              John Doe
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">John Doe</p>
                <p className="text-xs text-slate-500 capitalize">{userType} Account</p>
              </div>
              <div className="py-1">
                {userMenuItems.map((item, index) => {
                  if (item.divider) {
                    return <div key={index} className="border-t border-slate-100 my-1" />;
                  }
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        item.danger
                          ? 'text-red-600 hover:bg-red-50'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showUserMenu || showNotifications) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </header>
  );
};

export default Navbar;