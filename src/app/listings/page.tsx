'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
  Heart,
  ArrowLeft,
  Home,
  Hotel,
  Users,
  Building,
  TreePine,
  Tent,
  Castle,
  Building2,
  ArrowUpDown,
  TrendingUp,
  DollarSign,
  Wallet,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Category definitions
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

// Budget filter options
const budgetFilters = [
  { id: 'under500', label: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1000', label: '₹500 – ₹1000', min: 500, max: 1000 },
  { id: '1000-3000', label: '₹1000 – ₹3000', min: 1000, max: 3000 },
  { id: '3000plus', label: '₹3000+', min: 3000, max: Infinity },
];

// Sort options
const sortOptions = [
  { id: 'nearest', label: 'Nearest First', icon: MapPin },
  { id: 'top-rated', label: 'Top Rated', icon: Star },
  { id: 'price-high', label: 'Price: High → Low', icon: ArrowUpDown },
];

function ListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('nearest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';
    setSelectedCategory(category);
    setSelectedCity(city);
  }, [searchParams]);

  // Fetch properties from Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let q;
        
        if (selectedCategory) {
          q = query(
            collection(db, 'listings'),
            where('type', '==', selectedCategory),
            where('status', '==', 'approved'),
            limit(50)
          );
        } else {
          q = query(
            collection(db, 'listings'),
            where('status', '==', 'approved'),
            limit(50)
          );
        }
        
        const querySnapshot = await getDocs(q);
        const listings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(listings);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [selectedCategory]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let result = [...properties];

    // Filter by city
    if (selectedCity) {
      result = result.filter(p => 
        p.location?.city?.toLowerCase().includes(selectedCity.toLowerCase()) ||
        p.city?.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(p => 
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by budget
    if (selectedBudget) {
      const budget = budgetFilters.find(b => b.id === selectedBudget);
      if (budget) {
        result = result.filter(p => {
          const price = p.price || 0;
          return price >= budget.min && price <= budget.max;
        });
      }
    }

    // Sort
    switch (selectedSort) {
      case 'top-rated':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'nearest':
      default:
        // Sort by rating as proxy for "best" when location data isn't available
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [properties, selectedCity, searchQuery, selectedBudget, selectedSort]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentCategory = categories.find(c => c.id === selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    const params = new URLSearchParams();
    params.set('category', categoryId);
    if (selectedCity) params.set('city', selectedCity);
    router.push(`/listings?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSelectedBudget('');
    setSelectedSort('nearest');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FM</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg">FixMyStay</span>
            </Link>
            <nav className="ml-auto flex items-center gap-6">
              <Link href="/listings" className="text-slate-600 hover:text-slate-900">Stays</Link>
              <Link href="/become-partner" className="text-slate-600 hover:text-slate-900">Partner</Link>
              <Link href="/signin" className="text-slate-600 hover:text-slate-900">Sign In</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {currentCategory ? `${currentCategory.name} in India` : 'All Properties'}
          </h1>
          <p className="text-slate-600 mt-2">
            {filteredProperties.length} properties found
            {selectedCity && ` in ${selectedCity}`}
          </p>
        </div>

        {/* Categories Quick Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            <button
              onClick={() => {
                setSelectedCategory('');
                router.push('/listings');
              }}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                !selectedCategory
                  ? 'bg-sky-500 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`px-4 py-2 rounded-full font-medium whitespace-nowrap flex items-center gap-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-sky-500 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-sky-300'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search properties..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* City Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Enter city..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Smart Filters */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-4">
              {/* Budget Filters */}
              <span className="text-sm font-medium text-slate-600">Budget:</span>
              {budgetFilters.map((budget) => (
                <button
                  key={budget.id}
                  onClick={() => {
                    setSelectedBudget(selectedBudget === budget.id ? '' : budget.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedBudget === budget.id
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {budget.label}
                </button>
              ))}

              {/* Sort Options */}
              <span className="text-sm font-medium text-slate-600 ml-4">Sort:</span>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedSort(option.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors ${
                    selectedSort === option.id
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <option.icon className="w-3.5 h-3.5" />
                  {option.label}
                </button>
              ))}

              {/* Clear Filters */}
              {(selectedBudget || selectedSort !== 'nearest' || searchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ml-auto"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="h-40 bg-slate-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedProperties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProperties.map((property) => (
                <Card key={property.id} hover className="group">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop'}
                      alt={property.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white">
                      <Heart className="w-4 h-4 text-slate-400 hover:text-pink-500" />
                    </button>
                    {property.type && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-sky-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          {categories.find(c => c.id === property.type)?.name || property.type}
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-slate-900">{property.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {property.location?.city || property.city}
                    </p>
                    <div className="flex items-center gap-1 text-amber-500 mt-2">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span className="text-sm font-medium">{property.rating || 'N/A'}</span>
                      {property.reviewCount && (
                        <span className="text-slate-400 text-sm">({property.reviewCount})</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <span className="text-lg font-bold text-slate-900">₹{(property.price || 0).toLocaleString()}</span>
                        <span className="text-slate-500 text-sm">/night</span>
                      </div>
                      <Button size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-sky-500 text-white'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900">No properties listed yet</h2>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">&copy; 2024 FixMyStay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading properties...</p>
        </div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}