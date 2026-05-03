'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/Badge';
import {
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
  Save,
  LogOut,
  Heart,
  Star,
  ChevronRight,
  Bell,
  CreditCard,
  HelpCircle,
  Settings,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';

// Types
interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  guestName: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Timestamp;
  property?: {
    name: string;
    city: string;
    images: string[];
  };
}

interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

// Helper function to format price with Indian numbering system
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN').format(price);
};

// Helper function to format date
const formatDate = (date: Date | Timestamp): string => {
  const d = date instanceof Timestamp ? date.toDate() : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Status badge configuration matching requirements
const getStatusBadge = (status: string) => {
  const config: Record<string, { label: string; variant: 'success' | 'warning' | 'error' }> = {
    confirmed: { label: 'Confirmed', variant: 'success' },
    pending: { label: 'Pending', variant: 'warning' },
    cancelled: { label: 'Cancelled', variant: 'error' },
    completed: { label: 'Completed', variant: 'success' },
  };

  const { label, variant } = config[status] || { label: status, variant: 'success' };
  return <StatusBadge status={status as any} size="sm" />;
};

export default function UserDashboard() {
  const auth = useAuth();
  const user = auth.user;
  const userProfile = auth.userProfile;
  const logout = auth.logout;
  const authLoading = auth.loading;
  const router = useRouter();

  // State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'past'>('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch bookings from Firebase
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // Query bookings for current user
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const bookingsData: Booking[] = [];

        for (const docSnap of snapshot.docs) {
          const data = docSnap.data();
          const booking = {
            id: docSnap.id,
            ...data,
            checkIn: data.checkIn?.toDate ? data.checkIn.toDate() : new Date(data.checkIn),
            checkOut: data.checkOut?.toDate ? data.checkOut.toDate() : new Date(data.checkOut),
          } as Booking;

          // Fetch property details
          if (data.propertyId) {
            const propertyRef = doc(db, 'listings', data.propertyId);
            const propertySnap = await getDoc(propertyRef);
            if (propertySnap.exists()) {
              const propertyData = propertySnap.data();
              booking.property = {
                name: propertyData.name,
                city: propertyData.location?.city || propertyData.city || 'N/A',
                images: propertyData.images || [],
              };
            }
          }

          bookingsData.push(booking);
        }

        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  // Initialize profile form
  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        name: userProfile.displayName || userProfile.name || userProfile.firstName + ' ' + userProfile.lastName || '',
        email: userProfile.email || user?.email || '',
        phone: userProfile.phoneNumber || userProfile.phone || '',
      });
    } else if (user) {
      setProfileForm({
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
      });
    }
  }, [userProfile, user]);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    const now = new Date();
    const checkOutDate = booking.checkOut;

    if (activeTab === 'upcoming') {
      return checkOutDate >= now && booking.status !== 'cancelled';
    }
    if (activeTab === 'past') {
      return checkOutDate < now || booking.status === 'cancelled' || booking.status === 'completed';
    }
    return true;
  });

  // Calculate stats
  const stats = {
    upcoming: bookings.filter((b) => new Date(b.checkOut) >= new Date() && b.status !== 'cancelled').length,
    totalSpent: bookings
      .filter((b) => b.status === 'completed' || b.status === 'confirmed')
      .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  };

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSavingProfile(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        name: profileForm.name,
        phoneNumber: profileForm.phone,
        displayName: profileForm.name,
        updatedAt: new Date().toISOString(),
      });

      // Also update Firebase Auth profile
      await updateFirebaseProfile(user, {
        displayName: profileForm.name,
      });

      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSavingProfile(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Loading state
  if (authLoading || loading) {
    return (
      <DashboardLayout title="My Dashboard" userType="user">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Dashboard" userType="user">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.displayName || userProfile?.name || 'Traveler'}!
            </h2>
            <p className="text-slate-500 mt-1">Manage your bookings and profile</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Bell className="w-4 h-4" />}>
              Notifications
            </Button>
            <Button
              variant="outline"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card hover={false}>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-sky-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.upcoming}</p>
                <p className="text-sm text-slate-500">Upcoming Trips</p>
              </div>
            </CardContent>
          </Card>

          <Card hover={false}>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  ₹{isClient ? formatPrice(stats.totalSpent) : '0'}
                </p>
                <p className="text-sm text-slate-500">Total Spent</p>
              </div>
            </CardContent>
          </Card>

          <Card hover={false}>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
                <p className="text-sm text-slate-500">Total Bookings</p>
              </div>
            </CardContent>
          </Card>

          <Card hover={false}>
            <CardContent className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stats.cancelled}</p>
                <p className="text-sm text-slate-500">Cancelled</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your account information</CardDescription>
              </div>
              {!isEditingProfile && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Settings className="w-4 h-4" />}
                  onClick={() => setIsEditingProfile(true)}
                >
                  Edit
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isEditingProfile ? (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Full Name
                    </label>
                    <Input
                      value={profileForm.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfileForm({ ...profileForm, name: e.target.value })
                      }
                      placeholder="Enter your name"
                      leftIcon={<User className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      value={profileForm.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setProfileForm({ ...profileForm, phone: e.target.value })
                      }
                      placeholder="Enter phone number"
                      leftIcon={<Phone className="w-4 h-4" />}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      value={profileForm.email}
                      disabled
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                    <p className="text-xs text-slate-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    disabled={savingProfile}
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-sky-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Full Name</p>
                    <p className="font-medium text-slate-900">
                      {profileForm.name || 'Not set'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email Address</p>
                    <p className="font-medium text-slate-900">
                      {profileForm.email || 'Not set'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone Number</p>
                    <p className="font-medium text-slate-900">
                      {profileForm.phone || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

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
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({bookings.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'upcoming'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Upcoming ({stats.upcoming})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'past'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Past ({bookings.length - stats.upcoming})
              </button>
            </div>

            {/* Booking Cards */}
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-slate-500">Loading bookings...</p>
                </div>
              ) : filteredBookings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-900 font-medium">No bookings yet</p>
                  <p className="text-slate-500 text-sm mt-1">
                    Your {activeTab === 'all' ? '' : activeTab} bookings will appear here
                  </p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    {/* Property Image */}
                    <img
                      src={
                        booking.property?.images?.[0] ||
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
                      }
                      alt={booking.property?.name || 'Property'}
                      className="w-full sm:w-32 h-24 rounded-lg object-cover"
                    />

                    {/* Booking Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">
                            {booking.property?.name || 'Property'}
                          </h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {booking.property?.city || 'N/A'}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                        </span>
                        <span className="font-semibold text-slate-900">
                          ₹{isClient ? formatPrice(booking.totalPrice) : booking.totalPrice}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 justify-center">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {booking.status === 'pending' && (
                        <Button size="sm" variant="outline">
                          Modify
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
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

          <Card hover={false} className="cursor-pointer" onClick={handleLogout}>
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