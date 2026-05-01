'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/Badge';
import {
  Calendar,
  MapPin,
  Clock,
  Heart,
  Star,
  Plus,
  ChevronRight,
  User,
  Settings,
  LogOut,
  Bell,
  CreditCard,
  HelpCircle,
} from 'lucide-react';

// Mock data with Indian context
const upcomingBookings = [
  {
    id: 1,
    property: 'Goa Beach Villa',
    location: 'Goa, India',
    checkIn: '15 Jun 2024',
    checkOut: '22 Jun 2024',
    guests: 4,
    price: 138750,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    status: 'approved' as const,
  },
  {
    id: 2,
    property: 'Manali Mountain Retreat',
    location: 'Manali, Himachal Pradesh',
    checkIn: '28 Jun 2024',
    checkOut: '5 Jul 2024',
    guests: 2,
    price: 180000,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    status: 'pending' as const,
  },
];

const pastBookings = [
  {
    id: 3,
    property: 'Mumbai Urban Loft',
    location: 'Mumbai, Maharashtra',
    checkIn: '10 May 2024',
    checkOut: '15 May 2024',
    price: 66750,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    rating: 5,
  },
  {
    id: 4,
    property: 'Jaipur Heritage Haveli',
    location: 'Jaipur, Rajasthan',
    checkIn: '20 Apr 2024',
    checkOut: '25 Apr 2024',
    price: 90000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    rating: 4,
  },
];

const wishlistedProperties = [
  {
    id: 1,
    name: 'Kerala Backwater Houseboat',
    location: 'Alleppey, Kerala',
    price: 45000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    name: 'Udaipur Lake Palace',
    location: 'Udaipur, Rajasthan',
    price: 75000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582719491105-c720860f689b?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    name: 'Andaman Beach Resort',
    location: 'Havelock Island, Andaman',
    price: 55000,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1522708319821-79323520d777?w=400&h=300&fit=crop',
  },
];

const stats = [
  { label: 'Upcoming Trips', value: '2', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Total Spent', value: '₹4.2L', icon: CreditCard, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Wishlisted', value: '3', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
  { label: 'Reviews Given', value: '8', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
];

// Consistent number formatter - always uses international format
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <DashboardLayout title="My Dashboard" userType="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, Traveler!</h2>
            <p className="text-slate-500 mt-1">Manage your bookings and explore new stays</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Bell className="w-4 h-4" />}>
              Notifications
            </Button>
            <Button variant="primary" leftIcon={<Calendar className="w-4 h-4" />}>
              Book a Stay
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} hover>
              <CardContent className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>Manage your reservations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Past Stays
              </button>
            </div>

            <div className="space-y-4">
              {activeTab === 'upcoming' ? (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={booking.image}
                      alt={booking.property}
                      className="w-full sm:w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{booking.property}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </p>
                        </div>
                        <StatusBadge status={booking.status} size="sm" />
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.checkIn} → {booking.checkOut}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {booking.guests} guests
                        </span>
                        <span className="font-semibold text-slate-900">
                          ₹{isClient ? formatPrice(booking.price) : booking.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Modify
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                pastBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <img
                      src={booking.image}
                      alt={booking.property}
                      className="w-full sm:w-32 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{booking.property}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500" />
                          <span className="text-sm font-medium">{booking.rating}.0</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.checkIn} → {booking.checkOut}
                        </span>
                        <span className="font-semibold text-slate-900">
                          ₹{isClient ? formatPrice(booking.price) : booking.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        Book Again
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {activeTab === 'upcoming' && upcomingBookings.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">No upcoming bookings</p>
                <Button className="mt-4" variant="primary">
                  Book Your First Stay
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Wishlist Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Properties you've saved</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-sky-500">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistedProperties.map((property) => (
                <div
                  key={property.id}
                  className="group bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative">
                    <img
                      src={property.image}
                      alt={property.name}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-slate-900">{property.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </p>
                      <div className="flex items-center justify-between mt-3">
                        <div>
                          <span className="font-bold text-slate-900">₹{isClient ? formatPrice(property.price) : property.price}</span>
                          <span className="text-slate-500 text-sm">/night</span>
                        </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-sm font-medium">{property.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" fullWidth className="mt-3">
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card hover className="cursor-pointer">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                <User className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Profile</p>
                <p className="text-sm text-slate-500">Edit details</p>
              </div>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Settings className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Settings</p>
                <p className="text-sm text-slate-500">Preferences</p>
              </div>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Support</p>
                <p className="text-sm text-slate-500">Get help</p>
              </div>
            </CardContent>
          </Card>

          <Card hover className="cursor-pointer">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="font-medium text-slate-900">Sign Out</p>
                <p className="text-sm text-slate-500">Logout</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}