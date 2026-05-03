'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Heart,
  Settings,
  Building2,
  PlusCircle,
  DollarSign,
  BarChart3,
  Users,
  CheckCircle,
  FileText,
  MessageSquare,
  ChevronLeft,
  LogOut,
  Menu,
} from 'lucide-react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  userType: 'user' | 'vendor' | 'staff';
}

const userNavItems: NavItem[] = [
  { icon: <Calendar className="w-5 h-5" />, label: 'My Bookings', href: '/dashboard/user' },
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Profile', href: '/dashboard/user/profile' },
  { icon: <Heart className="w-5 h-5" />, label: 'Saved Properties', href: '/dashboard/user/saved' },
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'My Activity', href: '/dashboard/user/activity' },
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Help & Support', href: '/dashboard/user/support' },
];

const vendorNavItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', href: '/dashboard/vendor' },
  { icon: <PlusCircle className="w-5 h-5" />, label: 'Add Property', href: '/dashboard/vendor/add-property' },
  { icon: <Building2 className="w-5 h-5" />, label: 'My Properties', href: '/dashboard/vendor/properties' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', href: '/dashboard/vendor/bookings', badge: 5 },
  { icon: <DollarSign className="w-5 h-5" />, label: 'Earnings', href: '/dashboard/vendor/earnings' },
  { icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics', href: '/dashboard/vendor/analytics' },
];

const staffNavItems: NavItem[] = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', href: '/dashboard/staff' },
  { icon: <CheckCircle className="w-5 h-5" />, label: 'Vendor Approvals', href: '/dashboard/staff/approvals', badge: 12 },
  { icon: <Building2 className="w-5 h-5" />, label: 'Listings', href: '/dashboard/staff/listings' },
  { icon: <Calendar className="w-5 h-5" />, label: 'Bookings', href: '/dashboard/staff/bookings' },
  { icon: <MessageSquare className="w-5 h-5" />, label: 'Inquiries', href: '/dashboard/staff/inquiries', badge: 8 },
  { icon: <Users className="w-5 h-5" />, label: 'Users', href: '/dashboard/staff/users' },
];

const Sidebar: React.FC<SidebarProps> = ({ userType }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = userType === 'user' ? userNavItems : userType === 'vendor' ? vendorNavItems : staffNavItems;

  const getNavItems = () => {
    switch (userType) {
      case 'user':
        return userNavItems;
      case 'vendor':
        return vendorNavItems;
      case 'staff':
        return staffNavItems;
      default:
        return userNavItems;
    }
  };

  const items = getNavItems();

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full bg-white border-r border-slate-200
        transition-all duration-300 z-40
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        hidden lg:flex flex-col
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">FM</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {collapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-sky-50 text-sky-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                  title={collapsed ? item.label : undefined}
                >
                  <span className={isActive ? 'text-sky-500' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto bg-sky-100 text-sky-600 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {collapsed && item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 p-3">
        <button
          className={`
            flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors
            ${collapsed ? 'justify-center' : ''}
          `}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;