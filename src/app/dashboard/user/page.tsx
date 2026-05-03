'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/Badge';
import {
  User,
  Phone,
  Mail,
  Save,
  LogOut,
  Calendar,
  MessageSquare,
  Heart,
  Wallet,
  CreditCard,
  MapPin,
  Clock,
  Menu,
  X,
  ChevronRight,
  Home,
  RefreshCw,
  CheckCircle,
  AlertCircle,
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
  onSnapshot,
  Timestamp,
  serverTimestamp,
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

interface Inquiry {
  id: string;
  propertyId: string;
  name: string;
  phone: string;
  message: string;
  status: 'pending' | 'replied' | 'closed';
  createdAt: Timestamp;
  property?: {
    name: string;
    city: string;
    images: string[];
  };
}

interface SavedProperty {
  id: string;
  name: string;
  city: string;
  price: number;
  rating?: number;
  images: string[];
  location?: {
    city: string;
    state?: string;
  };
}

type TabType = 'profile' | 'bookings' | 'enquiries' | 'wishlist' | 'wallet' | 'payment';

// Helper functions
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN').format(price);
};

const formatDate = (date: Date | Timestamp): string => {
  const d = date instanceof Timestamp ? date.toDate() : date;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// Sidebar navigation items
const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
  { id: 'bookings', label: 'My Bookings', icon: <Calendar className="w-5 h-5" /> },
  { id: 'enquiries', label: 'My Enquiries', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'wishlist', label: 'Wishlist', icon: <Heart className="w-5 h-5" /> },
  { id: 'wallet', label: 'My Wallet', icon: <Wallet className="w-5 h-5" /> },
  { id: 'payment', label: 'Make a Payment', icon: <CreditCard className="w-5 h-5" /> },
];

// Skeleton loader component
const SkeletonLoader = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded ${className}`} />
);

const BookingSkeleton = () => (
  <div className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl">
    <SkeletonLoader className="w-full sm:w-32 h-24 flex-shrink-0" />
    <div className="flex-1 space-y-3">
      <SkeletonLoader className="w-3/4 h-5" />
      <SkeletonLoader className="w-1/2 h-4" />
      <div className="flex gap-4">
        <SkeletonLoader className="w-1/3 h-4" />
        <SkeletonLoader className="w-1/4 h-4" />
      </div>
    </div>
  </div>
);

const PropertyCardSkeleton = () => (
  <div className="bg-slate-50 rounded-xl overflow-hidden">
    <SkeletonLoader className="w-full h-40" />
    <div className="p-4 space-y-3">
      <SkeletonLoader className="w-3/4 h-5" />
      <SkeletonLoader className="w-1/2 h-4" />
      <div className="flex justify-between">
        <SkeletonLoader className="w-1/3 h-5" />
        <SkeletonLoader className="w-1/4 h-5" />
      </div>
    </div>
  </div>
);

export default function DashboardUserPage() {
  const auth = useAuth();
  const user = auth.user;
  const userProfile = auth.userProfile;
  const authLoading = auth.loading;
  const logout = auth.logout;
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  // Auth protection - redirect to signin if not logged in (only once)
  useEffect(() => {
    if (!authLoading && !user && !hasRedirected) {
      setHasRedirected(true);
      router.push('/signin');
    }
  }, [authLoading, user, hasRedirected, router]);

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  // If no user after loading, don't render (redirect will happen)
  if (!user) {
    return null;
  }

  // State
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Lazy-loaded data states
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Inquiry[]>([]);
  const [wishlist, setWishlist] = useState<SavedProperty[]>([]);
  
  // Loading states per section
  const [loadingSections, setLoadingSections] = useState<Record<string, boolean>>({
    bookings: false,
    enquiries: false,
    wishlist: false,
  });
  const [fetchedSections, setFetchedSections] = useState<Record<string, boolean>>({
    bookings: false,
    enquiries: false,
    wishlist: false,
  });
  
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [walletFetched, setWalletFetched] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentType, setPaymentType] = useState<'booking' | 'wallet'>('wallet');
  const [processingPayment, setProcessingPayment] = useState(false);
  const walletUnsubRef = useRef<(() => void) | null>(null);

  // Memoized profile initialization
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

  // Lazy load bookings only when tab is selected
  const loadBookings = useCallback(async () => {
    if (!user || fetchedSections.bookings) return;
    
    setLoadingSections(prev => ({ ...prev, bookings: true }));
    try {
      const bookingsQuery = query(
        collection(db, 'bookings'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const bookingsData: Booking[] = [];

      for (const docSnap of bookingsSnapshot.docs) {
        const data = docSnap.data();
        const booking = {
          id: docSnap.id,
          ...data,
          checkIn: data.checkIn?.toDate ? data.checkIn.toDate() : new Date(data.checkIn),
          checkOut: data.checkOut?.toDate ? data.checkOut.toDate() : new Date(data.checkOut),
        } as Booking;

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
      setFetchedSections(prev => ({ ...prev, bookings: true }));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoadingSections(prev => ({ ...prev, bookings: false }));
    }
  }, [user, fetchedSections.bookings]);

  // Lazy load enquiries only when tab is selected
  const loadEnquiries = useCallback(async () => {
    if (!user || fetchedSections.enquiries) return;
    
    setLoadingSections(prev => ({ ...prev, enquiries: true }));
    try {
      const inquiriesQuery = query(
        collection(db, 'inquiries'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
      const inquiriesSnapshot = await getDocs(inquiriesQuery);
      const inquiriesData: Inquiry[] = [];

      for (const docSnap of inquiriesSnapshot.docs) {
        const data = docSnap.data();
        const inquiry = {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
        } as Inquiry;

        if (data.propertyId) {
          const propertyRef = doc(db, 'listings', data.propertyId);
          const propertySnap = await getDoc(propertyRef);
          if (propertySnap.exists()) {
            const propertyData = propertySnap.data();
            inquiry.property = {
              name: propertyData.name,
              city: propertyData.location?.city || propertyData.city || 'N/A',
              images: propertyData.images || [],
            };
          }
        }
        inquiriesData.push(inquiry);
      }
      setEnquiries(inquiriesData);
      setFetchedSections(prev => ({ ...prev, enquiries: true }));
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoadingSections(prev => ({ ...prev, enquiries: false }));
    }
  }, [user, fetchedSections.enquiries]);

  // Lazy load wishlist and wallet only when tab is selected
  const loadWishlistAndWallet = useCallback(async () => {
    if (!user || (fetchedSections.wishlist && walletFetched)) return;
    
    if (!fetchedSections.wishlist) {
      setLoadingSections(prev => ({ ...prev, wishlist: true }));
    }
    
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        
        // Load wishlist
        if (!fetchedSections.wishlist) {
          const savedPropertyIds = userData.savedProperties || [];
          if (savedPropertyIds.length > 0) {
            const wishlistData: SavedProperty[] = [];
            for (const propId of savedPropertyIds) {
              const propRef = doc(db, 'listings', propId);
              const propSnap = await getDoc(propRef);
              if (propSnap.exists()) {
                const propData = propSnap.data();
                wishlistData.push({
                  id: propSnap.id,
                  name: propData.name,
                  city: propData.location?.city || propData.city || 'N/A',
                  price: propData.price,
                  rating: propData.rating,
                  images: propData.images || [],
                  location: propData.location,
                });
              }
            }
            setWishlist(wishlistData);
          }
          setFetchedSections(prev => ({ ...prev, wishlist: true }));
        }
        
        // Set up real-time wallet listener
        if (!walletFetched) {
          const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setWalletBalance(data.walletBalance || 0);
            }
          });
          walletUnsubRef.current = unsubscribe;
          setWalletFetched(true);
        }
      }
    } catch (error) {
      console.error('Error fetching wishlist/wallet:', error);
    } finally {
      setLoadingSections(prev => ({ ...prev, wishlist: false }));
    }
  }, [user, fetchedSections.wishlist, walletFetched]);

  // Cleanup wallet listener on unmount
  useEffect(() => {
    return () => {
      if (walletUnsubRef.current) {
        walletUnsubRef.current();
      }
    };
  }, []);

  // Handle Add Money to Wallet (Razorpay Integration)
  const handleAddMoney = useCallback(async () => {
    const amount = parseInt(paymentAmount);
    if (!amount || amount <= 0 || !user) return;

    setProcessingPayment(true);
    try {
      // Create Razorpay order via API
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, userId: user.uid, type: 'wallet' }),
      });

      const order = await response.json();

      if (!order.success) {
        throw new Error(order.error || 'Failed to create payment order');
      }

      // Load Razorpay script dynamically
      const loadRazorpay = () => {
        return new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const loaded = await loadRazorpay();
      if (!loaded || !(window as any).Razorpay) {
        throw new Error('Failed to load payment gateway');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'FixMyStay',
        description: 'Add Money to Wallet',
        order_id: order.id,
        handler: async (res: any) => {
          try {
            // Verify payment on server
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_order_id: res.razorpay_order_id,
                razorpay_signature: res.razorpay_signature,
                userId: user.uid,
                amount,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              // Wallet balance will auto-update via real-time listener
              setPaymentAmount('');
              alert('Money added successfully!');
            } else {
              throw new Error(verifyData.error || 'Payment verification failed');
            }
          } catch (err: any) {
            console.error('Payment verification error:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: profileForm.name,
          email: profileForm.email,
          contact: profileForm.phone,
        },
        theme: {
          color: '#0EA5E9',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed. Please try again.');
    } finally {
      setProcessingPayment(false);
    }
  }, [paymentAmount, user, profileForm]);

  // Handle tab change - lazy load data
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Lazy load data based on tab
    if (tab === 'bookings') loadBookings();
    else if (tab === 'enquiries') loadEnquiries();
    else if (tab === 'wishlist' || tab === 'wallet') loadWishlistAndWallet();
  };

  // Handle profile update
  const handleProfileUpdate = useCallback(async (e: React.FormEvent) => {
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

      await updateFirebaseProfile(user, {
        displayName: profileForm.name,
      });

      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSavingProfile(false);
    }
  }, [user, profileForm]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, router]);

  // Render content based on active tab
  const renderContent = useMemo(() => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </div>
                  {!isEditingProfile && (
                    <Button
                      variant="outline"
                      size="sm"
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
                      <div className="md:col-span-2">
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
          </div>
        );

      case 'bookings':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your reservations</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSections.bookings ? (
                  <div className="space-y-4">
                    <BookingSkeleton />
                    <BookingSkeleton />
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium">No bookings yet</p>
                    <p className="text-slate-500 text-sm mt-1">Your bookings will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl"
                      >
                        <img
                          src={
                            booking.property?.images?.[0] ||
                            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'
                          }
                          alt={booking.property?.name || 'Property'}
                          className="w-full sm:w-32 h-24 rounded-lg object-cover"
                          loading="lazy"
                        />
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
                            <StatusBadge status={booking.status} size="sm" />
                          </div>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                            </span>
                            <span className="font-semibold text-slate-900">
                              ₹{formatPrice(booking.totalPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'enquiries':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Enquiries</CardTitle>
                <CardDescription>Track your property inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSections.enquiries ? (
                  <div className="space-y-4">
                    <BookingSkeleton />
                    <BookingSkeleton />
                  </div>
                ) : enquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium">No enquiries yet</p>
                    <p className="text-slate-500 text-sm mt-1">Your enquiries will appear here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((inquiry) => (
                      <div
                        key={inquiry.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-slate-50 rounded-xl"
                      >
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900">
                                {inquiry.property?.name || 'Property Enquiry'}
                              </h3>
                              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3" />
                                {inquiry.property?.city || 'N/A'}
                              </p>
                            </div>
                            <StatusBadge status={inquiry.status} size="sm" />
                          </div>
                          <p className="text-sm text-slate-600 mt-3 line-clamp-2">
                            {inquiry.message}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {formatDate(inquiry.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Wishlist</CardTitle>
                <CardDescription>Saved properties you're interested in</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingSections.wishlist ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <PropertyCardSkeleton />
                    <PropertyCardSkeleton />
                    <PropertyCardSkeleton />
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium">No saved properties</p>
                    <p className="text-slate-500 text-sm mt-1">Properties you save will appear here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((property) => (
                      <div
                        key={property.id}
                        className="bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative h-40">
                          <img
                            src={property.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'}
                            alt={property.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full">
                            <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-900">{property.name}</h3>
                          <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                            <MapPin className="w-3 h-3" />
                            {property.city}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div>
                              <span className="font-bold text-slate-900">₹{formatPrice(property.price)}</span>
                              <span className="text-slate-500 text-sm">/night</span>
                            </div>
                            {property.rating && (
                              <div className="flex items-center gap-1 text-amber-500">
                                <span className="text-sm font-medium">{property.rating}</span>
                                <span className="text-sm">★</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      case 'wallet':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Wallet</CardTitle>
                <CardDescription>Your wallet balance and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-10 h-10 text-sky-600" />
                  </div>
                  <p className="text-sm text-slate-500">Current Balance</p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">
                    ₹{formatPrice(walletBalance)}
                  </p>
                </div>
                
                {/* Add Money Section */}
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-medium text-slate-900 mb-4">Add Money to Wallet</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">
                        Amount (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="w-full pl-8 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                    
                    {/* Quick amount buttons */}
                    <div className="flex gap-2">
                      {[100, 500, 1000, 2000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setPaymentAmount(amt.toString())}
                          className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-sky-50 hover:border-sky-300 transition-colors"
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    
                    <Button 
                      variant="primary" 
                      fullWidth 
                      leftIcon={<CreditCard className="w-4 h-4" />}
                      onClick={handleAddMoney}
                      disabled={processingPayment || !paymentAmount || parseInt(paymentAmount) <= 0}
                    >
                      {processingPayment ? 'Processing...' : 'Add Money'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>Pay for bookings or add wallet balance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Payment Type
                    </label>
                    <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500">
                      <option value="">Select payment type</option>
                      <option value="booking">Booking Payment</option>
                      <option value="wallet">Add to Wallet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Amount (₹)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      leftIcon={<span className="text-slate-500">₹</span>}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button className="p-4 border border-slate-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-colors">
                        <CreditCard className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                        <span className="text-sm text-slate-600">Card</span>
                      </button>
                      <button className="p-4 border border-slate-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-colors">
                        <Wallet className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                        <span className="text-sm text-slate-600">UPI</span>
                      </button>
                      <button className="p-4 border border-slate-200 rounded-lg hover:border-sky-500 hover:bg-sky-50 transition-colors">
                        <Home className="w-6 h-6 mx-auto mb-2 text-slate-600" />
                        <span className="text-sm text-slate-600">Net Banking</span>
                      </button>
                    </div>
                  </div>
                  <Button variant="primary" fullWidth className="mt-4">
                    Proceed to Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  }, [activeTab, loadingSections, bookings, enquiries, wishlist, walletBalance, isEditingProfile, profileForm, savingProfile, handleProfileUpdate]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <div
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/hero/(my account).png')`,
        }}
      >
        <div className="absolute inset-0 bg-slate-900/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {profileForm.name || 'My Account'}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm md:text-base opacity-90">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {profileForm.email}
              </span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {profileForm.phone || 'Not set'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="font-medium text-slate-900">
              {navItems.find((item) => item.id === activeTab)?.label}
            </span>
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-500" />
            ) : (
              <Menu className="w-5 h-5 text-slate-500" />
            )}
          </button>

          {/* Sidebar */}
          <div
            className={`
              lg:w-64 flex-shrink-0
              ${mobileMenuOpen ? 'fixed inset-0 z-50 bg-white p-4' : 'hidden lg:block'}
            `}
          >
            <div className="lg:sticky lg:top-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${
                      activeTab === item.id
                        ? 'bg-sky-50 text-sky-600 font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <span className={activeTab === item.id ? 'text-sky-500' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  {item.label}
                  {activeTab === item.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {mobileMenuOpen && (
              <div
                className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}
            {renderContent}
          </div>
        </div>
      </div>
    </div>
  );
}