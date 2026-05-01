'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Input, SearchInput, Select } from '@/components/ui/Input';
import {
  Table,
  DataTable,
} from '@/components/ui/Table';
import {
  Modal,
  ConfirmModal,
} from '@/components/ui/Modal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { partnerService, type PartnerRequest } from '@/lib/firebase';
import {
  Users,
  Building2,
  Calendar,
  MessageSquare,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Download,
  MoreVertical,
  Clock,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

// Mock data
const vendorApplications = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    property: 'Oceanview Villa',
    location: 'Malibu, CA',
    submittedDate: '2024-06-10',
    status: 'pending' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    property: 'Mountain Retreat',
    location: 'Aspen, CO',
    submittedDate: '2024-06-09',
    status: 'pending' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    property: 'Urban Loft',
    location: 'New York, NY',
    submittedDate: '2024-06-08',
    status: 'approved' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

const listings = [
  {
    id: 1,
    name: 'Oceanview Villa',
    vendor: 'Beach Properties LLC',
    location: 'Malibu, CA',
    price: 350,
    guests: 6,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Mountain Retreat',
    vendor: 'Mountain Escapes',
    location: 'Aspen, CO',
    price: 450,
    guests: 8,
    status: 'pending' as const,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Urban Loft',
    vendor: 'City Stays',
    location: 'New York, NY',
    price: 280,
    guests: 4,
    status: 'rejected' as const,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Desert Oasis',
    vendor: 'Desert Dreams',
    location: 'Scottsdale, AZ',
    price: 320,
    guests: 6,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600038ffc6?w=400&h=300&fit=crop',
  },
];

const bookings = [
  {
    id: 'BK-2024-001',
    guest: 'Emily Brown',
    property: 'Oceanview Villa',
    vendor: 'Beach Properties LLC',
    checkIn: '2024-06-15',
    checkOut: '2024-06-22',
    amount: 2450,
    status: 'approved' as const,
  },
  {
    id: 'BK-2024-002',
    guest: 'James Wilson',
    property: 'Mountain Retreat',
    vendor: 'Mountain Escapes',
    checkIn: '2024-06-18',
    checkOut: '2024-06-25',
    amount: 3150,
    status: 'pending' as const,
  },
  {
    id: 'BK-2024-003',
    guest: 'Lisa Anderson',
    property: 'Desert Oasis',
    vendor: 'Desert Dreams',
    checkIn: '2024-06-20',
    checkOut: '2024-06-23',
    amount: 960,
    status: 'cancelled' as const,
  },
];

const inquiries = [
  {
    id: 1,
    subject: 'Question about Oceanview Villa',
    from: 'John Doe',
    property: 'Oceanview Villa',
    message: 'Is the pool heated during winter months?',
    date: '2024-06-10',
    status: 'unread' as const,
  },
  {
    id: 2,
    subject: 'Booking modification request',
    from: 'Jane Smith',
    property: 'Mountain Retreat',
    message: 'Can I extend my stay by 2 nights?',
    date: '2024-06-09',
    status: 'read' as const,
  },
  {
    id: 3,
    subject: 'Check-in instructions',
    from: 'Mike Johnson',
    property: 'Urban Loft',
    message: 'What time is check-in?',
    date: '2024-06-08',
    status: 'replied' as const,
  },
];

const stats = [
  { label: 'Total Vendors', value: '156', change: '+12%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Active Listings', value: '342', change: '+8%', icon: Building2, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Total Bookings', value: '1,284', change: '+15%', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Pending Inquiries', value: '24', change: '-3%', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
];

export default function StaffDashboard() {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<number | null>(null);

  const handleApprove = () => {
    // Handle approve logic
    setShowApproveModal(false);
    setSelectedVendor(null);
  };

  const handleReject = () => {
    // Handle reject logic
    setShowRejectModal(false);
    setSelectedVendor(null);
  };

  const bookingColumns = [
    { key: 'id', header: 'Booking ID' },
    {
      key: 'guest',
      header: 'Guest',
      render: (booking: typeof bookings[0]) => (
        <span className="font-medium text-slate-900">{booking.guest}</span>
      ),
    },
    { key: 'property', header: 'Property' },
    {
      key: 'checkIn',
      header: 'Check-in',
      render: (booking: typeof bookings[0]) => (
        <span className="text-slate-600">{booking.checkIn}</span>
      ),
    },
    {
      key: 'checkOut',
      header: 'Check-out',
      render: (booking: typeof bookings[0]) => (
        <span className="text-slate-600">{booking.checkOut}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (booking: typeof bookings[0]) => (
        <span className="font-medium">${booking.amount.toLocaleString()}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (booking: typeof bookings[0]) => (
        <StatusBadge status={booking.status} size="sm" />
      ),
    },
  ];

  return (
    <DashboardLayout title="Admin Dashboard" userType="staff">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Dashboard</h2>
            <p className="text-slate-500 mt-1">Manage vendors, listings, and bookings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-slate-500">{stat.label}</p>
                    <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Vendor Approvals */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Vendor Approvals</CardTitle>
                <CardDescription>Review and approve vendor applications</CardDescription>
              </div>
              <StatusBadge status="pending" size="sm" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorApplications.map((vendor) => (
                <div
                  key={vendor.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={vendor.avatar}
                    alt={vendor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{vendor.name}</p>
                        <p className="text-sm text-slate-500">{vendor.email}</p>
                      </div>
                      <StatusBadge status={vendor.status} size="sm" />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {vendor.property}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Submitted {vendor.submittedDate}
                      </span>
                    </div>
                  </div>
                  {vendor.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => {
                          setSelectedVendor(vendor.id);
                          setShowApproveModal(true);
                        }}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => {
                          setSelectedVendor(vendor.id);
                          setShowRejectModal(true);
                        }}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Listings Management</CardTitle>
                  <CardDescription>Manage all property listings</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {listings.slice(0, 4).map((listing) => (
                  <div
                    key={listing.id}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900 truncate">{listing.name}</p>
                        <StatusBadge status={listing.status} size="sm" />
                      </div>
                      <p className="text-sm text-slate-500">{listing.location}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                        <span>${listing.price}/night</span>
                        <span className="text-slate-400">•</span>
                        <span>{listing.guests} guests</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                View All Listings
              </Button>
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Inquiries</CardTitle>
                  <CardDescription>Customer support tickets</CardDescription>
                </div>
                <StatusBadge status="pending" size="sm" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      inquiry.status === 'unread' ? 'bg-sky-50 border border-sky-200' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{inquiry.subject}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          From: {inquiry.from} • {inquiry.property}
                        </p>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-1">{inquiry.message}</p>
                      </div>
                      <div className="ml-4">
                        <span className={`text-xs ${
                          inquiry.status === 'unread' ? 'text-sky-600' :
                          inquiry.status === 'replied' ? 'text-green-600' :
                          'text-slate-500'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                View All Inquiries
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Booking Monitoring */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Booking Monitoring</CardTitle>
                <CardDescription>Track all platform bookings</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 w-64"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={bookingColumns}
              data={bookings}
              keyExtractor={(booking) => booking.id}
              searchPlaceholder="Search bookings..."
            />
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={showApproveModal}
        onClose={() => {
          setShowApproveModal(false);
          setSelectedVendor(null);
        }}
        onConfirm={handleApprove}
        title="Approve Vendor"
        description="Are you sure you want to approve this vendor application? They will be able to list properties on the platform."
        confirmText="Approve Vendor"
        variant="success"
      />

      <ConfirmModal
        isOpen={showRejectModal}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedVendor(null);
        }}
        onConfirm={handleReject}
        title="Reject Vendor"
        description="Are you sure you want to reject this vendor application? This action cannot be undone."
        confirmText="Reject Application"
        variant="danger"
      />
    </DashboardLayout>
  );
}