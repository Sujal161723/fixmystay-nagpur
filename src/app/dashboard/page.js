'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  User, Heart, Clock, CheckCircle, Building, 
  MapPin, Calendar, IndianRupee, MessageSquare,
  Settings, LogOut, ChevronRight
} from 'lucide-react';

export default function UserDashboard() {
  const { user, loading: authLoading, logout, userRole } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  // Fetch user data
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      setLoading(true);

      // Fetch bookings
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsData = bookingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch inquiries
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch wishlist
      const wishlistQuery = query(
        collection(db, 'wishlists'),
        where('userId', '==', user.uid)
      );
      const wishlistSnapshot = await getDocs(wishlistQuery);
      const wishlistData = wishlistSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setBookings(bookingsData);
      setInquiries(inquiriesData);
      setWishlist(wishlistData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: bookings.length },
    { id: 'inquiries', label: 'Inquiries', icon: MessageSquare, count: inquiries.length },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-accent/30 pt-24 pb-12">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900">
                    {user.displayName || 'Welcome'}
                  </h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="btn-outline py-2 px-4 text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-muted-foreground hover:bg-accent'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? 'bg-white/20'
                        : 'bg-accent'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === 'bookings' && (
            <BookingsTab bookings={bookings} loading={loading} />
          )}

          {activeTab === 'inquiries' && (
            <InquiriesTab inquiries={inquiries} loading={loading} />
          )}

          {activeTab === 'wishlist' && (
            <WishlistTab wishlist={wishlist} loading={loading} />
          )}

          {activeTab === 'profile' && (
            <ProfileTab user={user} userRole={userRole} />
          )}
        </div>
      </div>
    </div>
  );
}

// Bookings Tab
function BookingsTab({ bookings, loading }) {
  if (loading) {
    return <LoadingState />;
  }

  if (bookings.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-muted-foreground">No bookings yet</p>
        <Link href="/search?category=hotel" className="btn-primary mt-4 inline-block">
          Book a Stay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="glass-card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900">{booking.propertyTitle}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {booking.propertyLocation}
              </p>
            </div>
            <span className={`badge text-xs ${
              booking.status === 'confirmed' ? 'badge-success' :
              booking.status === 'pending' ? 'badge-warning' : 'badge-error'
            }`}>
              {booking.status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Check-in</p>
                <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Check-out</p>
                <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <IndianRupee className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Total</p>
                <p className="font-medium">₹{booking.totalPrice?.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Building className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="font-medium capitalize">{booking.propertyType}</p>
              </div>
            </div>
          </div>

          {booking.status === 'confirmed' && (
            <div className="flex gap-3">
              <button className="btn-outline py-2 px-4 text-sm">View Details</button>
              <button className="btn-primary py-2 px-4 text-sm">Contact Host</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Inquiries Tab
function InquiriesTab({ inquiries, loading }) {
  if (loading) {
    return <LoadingState />;
  }

  if (inquiries.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-muted-foreground">No inquiries yet</p>
        <Link href="/search" className="btn-primary mt-4 inline-block">
          Explore Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {inquiries.map((inquiry) => (
        <div key={inquiry.id} className="glass-card p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-slate-900">{inquiry.propertyTitle}</h3>
              <p className="text-sm text-muted-foreground">{inquiry.propertyLocation}</p>
            </div>
            <span className={`badge text-xs ${
              inquiry.status === 'responded' ? 'badge-success' :
              inquiry.status === 'pending' ? 'badge-warning' : 'badge-error'
            }`}>
              {inquiry.status}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 mb-3 line-clamp-2">{inquiry.message}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(inquiry.createdAt).toLocaleDateString()}
            </span>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Wishlist Tab
function WishlistTab({ wishlist, loading }) {
  if (loading) {
    return <LoadingState />;
  }

  if (wishlist.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-muted-foreground">Your wishlist is empty</p>
        <Link href="/search" className="btn-primary mt-4 inline-block">
          Start Exploring
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item.id} className="glass-card overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            {item.propertyImage ? (
              <img src={item.propertyImage} alt={item.propertyTitle} className="w-full h-full object-cover" />
            ) : (
              <Building className="w-full h-full text-muted-foreground p-12" />
            )}
            <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </button>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-slate-900 mb-1">{item.propertyTitle}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.propertyLocation}</p>
            <p className="font-bold text-primary">₹{item.propertyPrice?.toLocaleString()}</p>
            <Link 
              href={`/property/${item.propertyId}`}
              className="btn-outline w-full mt-3 py-2 text-sm text-center block"
            >
              View Property
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// Profile Tab
function ProfileTab({ user, userRole }) {
  return (
    <div className="glass-card p-6">
      <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={user.displayName || ''}
            disabled
            className="input-field bg-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={user.email || ''}
            disabled
            className="input-field bg-accent"
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase text-muted-foreground mb-2">
            Account Type
          </label>
          <input
            type="text"
            value={userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}
            disabled
            className="input-field bg-accent"
          />
        </div>

        <div className="pt-4 border-t border-border">
          <button className="btn-primary py-2 px-4">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <div className="glass-card p-8 text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
    </div>
  );
}