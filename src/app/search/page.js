'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PropertyFilters from '@/components/listings/PropertyFilters';
import PropertyGrid, { PropertyListHeader, LoadMoreButton } from '@/components/listings/PropertyGrid';
import { useProperties } from '@/hooks/useProperties';

// Search content component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('q');

  const [filters, setFilters] = useState({
    category: categoryParam || undefined,
    search: searchParam || undefined,
  });

  const {
    properties,
    loading,
    error,
    hasMore,
    loadMore,
  } = useProperties(filters);

  // Update filters when URL params change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryParam || undefined,
      search: searchParam || undefined,
    }));
  }, [categoryParam, searchParam]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      {/* Filters */}
      <PropertyFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <main className="container-custom py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Results List */}
          <div className="flex-1">
            <PropertyListHeader 
              count={properties.length}
              title="properties found in Nagpur"
            />

            <PropertyGrid 
              properties={properties}
              loading={loading}
              error={error}
              variant="horizontal"
              emptyMessage="No properties match your search in Nagpur. Try adjusting your filters."
            />

            <LoadMoreButton 
              onClick={loadMore}
              loading={loading}
              hasMore={hasMore}
            />
          </div>

          {/* Map Sidebar Placeholder */}
          <div className="hidden lg:block w-[400px] bg-muted rounded-2xl sticky top-40 h-[calc(100vh-200px)] overflow-hidden border border-gray-200">
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-muted-foreground font-bold tracking-widest uppercase">Map View Interface</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Main page component with Suspense boundary
export default function Search() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Loading search...</div>
          <div className="animate-pulse h-4 bg-slate-200 rounded w-48 mx-auto"></div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}