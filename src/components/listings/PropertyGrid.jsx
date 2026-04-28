'use client';

import PropertyCard, { PropertyCardSkeleton } from './PropertyCard';

/**
 * PropertyGrid Component
 * Displays a grid of property cards with loading states and empty states
 */
export default function PropertyGrid({ 
  properties, 
  loading = false, 
  error = null,
  variant = 'vertical',
  columns = 3,
  emptyMessage = 'No properties found in Nagpur.',
}) {
  // Column classes based on variant
  const getGridClasses = () => {
    if (variant === 'horizontal') {
      return 'grid grid-cols-1 gap-6';
    }
    
    switch (columns) {
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
      case 4:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
    }
  };

  // Show loading skeletons
  if (loading) {
    return (
      <div className={getGridClasses()}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PropertyCardSkeleton key={i} variant={variant} />
        ))}
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center py-16 bg-accent rounded-2xl">
        <p className="text-red-600 font-bold mb-2">Error loading properties</p>
        <p className="text-muted-foreground text-sm">{error}</p>
      </div>
    );
  }

  // Show empty state
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-16 bg-accent rounded-2xl">
        <div className="text-4xl mb-4">🏠</div>
        <p className="text-lg font-bold mb-2">No properties available</p>
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }

  // Show properties
  return (
    <div className={getGridClasses()}>
      {properties.map((property) => (
        <PropertyCard 
          key={property.id} 
          property={property} 
          variant={variant}
        />
      ))}
    </div>
  );
}

/**
 * PropertyListHeader Component
 * Displays results count and sort options
 */
export function PropertyListHeader({ 
  count, 
  sortBy = 'Popularity', 
  onSortChange,
  title = 'results found'
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-bold tracking-tight">
        {count} {title}
      </h1>
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase text-muted-foreground">Sort by:</span>
        <select 
          className="bg-transparent font-bold text-sm outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => onSortChange?.(e.target.value)}
        >
          <option>Popularity</option>
          <option>Price Low to High</option>
          <option>Price High to Low</option>
          <option>Newest First</option>
          <option>Highest Rated</option>
        </select>
      </div>
    </div>
  );
}

/**
 * LoadMoreButton Component
 * Button to load more properties
 */
export function LoadMoreButton({ onClick, loading = false, hasMore = true }) {
  if (!hasMore) return null;

  return (
    <div className="text-center mt-12">
      <button
        onClick={onClick}
        disabled={loading}
        className="btn-outline py-3 px-8 rounded-xl font-bold hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Loading...' : 'Load More Properties'}
      </button>
    </div>
  );
}