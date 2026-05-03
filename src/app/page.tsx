'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import {
  Search,
  MapPin,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Hotel,
  TreePine,
  Castle,
  Home,
  Building,
  Users,
  Tent,
  Building2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import LocationSearch from '@/components/LocationSearch';
import { auth, db } from '@/lib/firebase';
import { LocationData, detectLocation, formatLocation } from '@/lib/location';

// Property categories with icons
const categories = [
  { id: 'hotel', name: 'Hotels', icon: Hotel },
  { id: 'pg', name: 'PG', icon: Users },
  { id: 'flat', name: 'Flats', icon: Building },
  { id: 'room', name: 'Rooms', icon: Home },
  { id: 'resort', name: 'Resorts', icon: TreePine },
  { id: 'villa', name: 'Villas', icon: Home },
  { id: 'farmhouse', name: 'Farmhouses', icon: Tent },
  { id: 'marriage_hall', name: 'Marriage Halls', icon: Castle },
];

// Popular Indian cities
const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Pune', 'Nagpur', 'Jaipur', 'Goa', 'Manali'
];

// Hero images configuration - mapped by filename detection
const heroImages = [
  {
    id: 'partner',
    title: 'Become a Partner & Earn',
    subtitle: 'List your property and reach millions of travelers',
    imageSrc: '/images/hero/(Become a Partner & Earn – Visual).png',
  },
  {
    id: 'budget',
    title: 'Budget & Hourly Stays Available',
    subtitle: 'Flexible options for every budget',
    imageSrc: '/images/hero/(Budget & Hourly Stay – Visual).png',
  },
  {
    id: 'verified',
    title: 'Verified Properties Only',
    subtitle: 'Every listing is checked for quality and authenticity',
    imageSrc: '/images/hero/(Verified Property – Visual).png',
  },
  {
    id: 'city',
    title: 'Discover Stays in Your City',
    subtitle: 'From luxury hotels to cozy PGs',
    imageSrc: '/images/hero/(Discover Stay in Your City – Visual).png',
  },
];

// Category mapping for Firestore queries
const categoryToType = {
  hotels: 'hotel',
  resorts: 'resort',
  realEstate: 'flat',
  pg: 'pg',
};

// Horizontal Slider Component
function HorizontalSlider({ category, title, firestoreType }: { category: string, title: string, firestoreType: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const q = query(
          collection(db, 'listings'),
          where('type', '==', firestoreType),
          where('status', '==', 'approved'),
          limit(8)
        );
        const querySnapshot = await getDocs(q);
        const listings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(listings);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [firestoreType]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[280px] w-[280px]">
              <div className="bg-slate-200 rounded-xl h-40 animate-pulse"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
                <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <Link href={`/listings?category=${firestoreType}`}>
          <button className="text-sky-600 hover:text-sky-700 font-medium text-sm">
            View All →
          </button>
        </Link>
      </div>

      {properties.length > 0 ? (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {properties.map((property) => (
            <Link href={`/listings?id=${property.id}`} key={property.id}>
              <Card hover className="min-w-[280px] w-[280px] cursor-pointer group">
                <div className="relative overflow-hidden rounded-t-xl">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                    alt={property.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 truncate">{property.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {property.location?.city || property.city}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <span className="text-lg font-bold text-slate-900">₹{property.price?.toLocaleString() || 'N/A'}</span>
                      <span className="text-slate-500 text-xs">/night</span>
                    </div>
                    {property.rating && (
                      <span className="text-sm text-amber-500">★ {property.rating}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl p-12 text-center border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900">No properties listed yet</h3>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Auto-slide for banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);
  const [user, setUser] = useState<any>(null);


  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Detect user location on mount using smart location system
  useEffect(() => {
    const initLocation = async () => {
      try {
        if (typeof window !== 'undefined') {
          const userLocation = await detectLocation();
          setLocation(userLocation);
          setSearchLocation(formatLocation(userLocation));
        }
      } catch (error) {
        console.error('Location detection error:', error);
        const defaultLocation: LocationData = {
          city: 'Mumbai',
          state: 'Maharashtra',
          country: 'India',
        };
        setLocation(defaultLocation);
        setSearchLocation('Mumbai, Maharashtra');
      } finally {
        setIsLoading(false);
      }
    };

    initLocation();
  }, []);

  const handleLocationSelect = (newLocation: LocationData) => {
    setLocation(newLocation);
    setSearchLocation(formatLocation(newLocation));
  };

  const handleSearch = () => {
    if (location) {
      router.push(`/listings?city=${encodeURIComponent(location.city)}&state=${encodeURIComponent(location.state)}`);
    } else {
      router.push('/listings');
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/listings?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/listings" className="text-slate-600 hover:text-slate-900 transition-colors">Stays</Link>
              <Link href="/become-partner" className="text-slate-600 hover:text-slate-900 transition-colors">Partner</Link>
              <Link href="/help" className="text-slate-600 hover:text-slate-900 transition-colors">Help Center</Link>
              <Link href="/safety" className="text-slate-600 hover:text-slate-900 transition-colors">Safety</Link>
              <Link href="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <Link
                  href="/my-account"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-medium">
                    {user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="font-medium truncate max-w-[100px]">
                    {user.email?.split('@')[0] || 'Account'}
                  </span>
                </Link>
              ) : (
                <>
                  <Link href="/signin" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">
                    Sign In
                  </Link>
                  <Link
                    href="/signin"
                    className="bg-sky-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-sky-600 transition-colors"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-4 py-4 space-y-4">
              <Link href="/listings" className="block text-slate-600 hover:text-slate-900">Stays</Link>
              <Link href="/become-partner" className="block text-slate-600 hover:text-slate-900">Partner</Link>
              <Link href="/help" className="block text-slate-600 hover:text-slate-900">Help Center</Link>
              <Link href="/safety" className="block text-slate-600 hover:text-slate-900">Safety</Link>
              <Link href="/faq" className="block text-slate-600 hover:text-slate-900">FAQ</Link>
              <div className="pt-4 border-t border-slate-100">
                {user ? (
                  <Link
                    href="/my-account"
                    className="block bg-sky-500 text-white px-4 py-2 rounded-lg font-medium text-center"
                  >
                    My Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" className="block text-slate-600 hover:text-slate-900 font-medium mb-3">
                      Sign In
                    </Link>
                    <Link
                      href="/signin"
                      className="block bg-sky-500 text-white px-4 py-2 rounded-lg font-medium text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Sliding Banner */}
      <section className="pt-16">
        <div className="relative h-[400px] md:h-[500px] overflow-hidden">
          {heroImages.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background image with soft black overlay */}
              <div className="absolute inset-0">
                <img
                  src={slide.imageSrc}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25"></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-white/95 mb-8 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

        </div>

        {/* Search Bar - Overlapping */}
        <div className="relative -mt-20 px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <LocationSearch
                  onLocationSelect={handleLocationSelect}
                  currentLocation={location}
                  placeholder="Search city or location..."
                />

                <button
                  onClick={handleSearch}
                  className="bg-sky-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-sky-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search Properties
                </button>
              </div>
            </div>

            {location && (
              <div className="mt-4 text-center">
                <p className="text-sm text-slate-500">
                  Showing properties near{' '}
                  <span className="font-semibold text-slate-900">
                    {formatLocation(location)}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Browse by Category</h2>
            <p className="mt-4 text-slate-600">Find the perfect stay for your needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-sky-300 hover:shadow-md transition-all group"
              >
                <category.icon className="w-8 h-8 mx-auto mb-3 text-slate-400 group-hover:text-sky-500 transition-colors" />
                <p className="font-medium text-sm text-slate-700 group-hover:text-slate-900">{category.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Banner Slider Sections - Real Data from Firestore */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Hotels Section */}
          <HorizontalSlider
            category="hotels"
            title="Explore Hotels"
            firestoreType="hotel"
          />

          {/* Resorts & Event Spaces Section */}
          <HorizontalSlider
            category="resorts"
            title="Resorts & Event Spaces"
            firestoreType="resort"
          />

          {/* Real Estate Section */}
          <HorizontalSlider
            category="realEstate"
            title="Flats & Property"
            firestoreType="flat"
          />

          {/* PG & Rooms Section */}
          <HorizontalSlider
            category="pg"
            title="PG & Budget Rooms"
            firestoreType="pg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">FM</span>
                </div>
                <span className="font-semibold text-white text-lg">FixMyStay</span>
              </div>
              <p className="text-sm mb-4">
                Your trusted platform for exceptional stays across India.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Partners</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/become-partner" className="hover:text-white transition-colors">Become a Partner</Link></li>
                <li><Link href="/dashboard/vendor" className="hover:text-white transition-colors">Partner Portal</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; 2024 FixMyStay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}