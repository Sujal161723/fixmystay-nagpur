'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import {
  DollarSign,
  Calendar,
  Building2,
  TrendingUp,
  Plus,
  MoreVertical,
  User,
  Phone,
  Mail,
  Check,
  X,
  Eye,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Mock data with Indian Rupees and Indian locations
const revenueData = [
  { month: 'Jan', revenue: 315000 },
  { month: 'Feb', revenue: 285000 },
  { month: 'Mar', revenue: 382500 },
  { month: 'Apr', revenue: 360000 },
  { month: 'May', revenue: 465000 },
  { month: 'Jun', revenue: 442500 },
];

const occupancyData = [
  { month: 'Jan', rate: 65 },
  { month: 'Feb', rate: 72 },
  { month: 'Mar', rate: 85 },
  { month: 'Apr', rate: 78 },
  { month: 'May', rate: 92 },
  { month: 'Jun', rate: 88 },
];

const bookings = [
  {
    id: 1,
    guest: 'Priya Sharma',
    property: 'Goa Beach Villa',
    checkIn: '2024-06-15',
    checkOut: '2024-06-22',
    guests: 4,
    total: 138750,
    status: 'approved' as const,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    guest: 'Rahul Verma',
    property: 'Manali Mountain Retreat',
    checkIn: '2024-06-18',
    checkOut: '2024-06-25',
    guests: 2,
    total: 180000,
    status: 'pending' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    guest: 'Ananya Patel',
    property: 'Mumbai Urban Loft',
    checkIn: '2024-06-20',
    checkOut: '2024-06-23',
    guests: 2,
    total: 66750,
    status: 'pending' as const,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
  },
  {
    id: 4,
    guest: 'Vikram Singh',
    property: 'Jaipur Heritage Haveli',
    checkIn: '2024-06-10',
    checkOut: '2024-06-14',
    guests: 3,
    total: 90000,
    status: 'completed' as const,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

const properties = [
  {
    id: 1,
    name: 'Goa Beach Villa',
    location: 'Goa, India',
    price: 26250,
    occupancy: 92,
    revenue: 637500,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Manali Mountain Retreat',
    location: 'Manali, Himachal Pradesh',
    price: 33750,
    occupancy: 78,
    revenue: 465000,
    status: 'active' as const,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Mumbai Urban Loft',
    location: 'Mumbai, Maharashtra',
    price: 21000,
    occupancy: 85,
    revenue: 382500,
    status: 'pending' as const,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
  },
];

const stats = [
  { label: 'Total Revenue', value: '₹18,50,000', change: '+12%', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Total Bookings', value: '48', change: '+8%', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Active Listings', value: '6', change: '+2', icon: Building2, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Occupancy Rate', value: '85%', change: '+5%', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-50' },
];

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredBookings = activeTab === 'all'
    ? bookings
    : bookings.filter(b => b.status === activeTab);

  return (
    <DashboardLayout title="Partner Dashboard" userType="vendor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Partner!</h2>
            <p className="text-slate-500 mt-1">Manage your properties and bookings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Eye className="w-4 h-4" />}>
              View Analytics
            </Button>
            <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Property
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
                    <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`₹${(value as number).toLocaleString()}`, 'Revenue']}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0ea5e9"
                      strokeWidth={2}
                      dot={{ fill: '#0ea5e9', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>Monthly occupancy percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} unit="%" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                      }}
                      formatter={(value) => [`${value}%`, 'Occupancy']}
                    />
                    <Bar dataKey="rate" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Manage your reservation requests</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="mb-4">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="space-y-3">
                {filteredBookings.slice(0, 4).map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={booking.avatar}
                      alt={booking.guest}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{booking.guest}</p>
                          <p className="text-sm text-slate-500">{booking.property}</p>
                        </div>
                        <StatusBadge status={booking.status} size="sm" />
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                        <span>{booking.checkIn} → {booking.checkOut}</span>
                        <span className="text-slate-400">•</span>
                        <span>{booking.guests} guests</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-medium">₹{booking.total.toLocaleString()}</span>
                      </div>
                    </div>
                    {booking.status === 'pending' && (
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Properties */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>My Properties</CardTitle>
                  <CardDescription>Your listings</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="group">
                    <div className="flex gap-3">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-slate-900 truncate">{property.name}</p>
                            <p className="text-xs text-slate-500">{property.location}</p>
                          </div>
                          <StatusBadge status={property.status} size="sm" />
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-slate-600">
                          <span>₹{property.price.toLocaleString()}/night</span>
                          <span className="text-slate-400">•</span>
                          <span>{property.occupancy}% occ.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" fullWidth className="mt-4">
                View All Properties
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}