'use client';

import { useState } from 'react';
import { Badge, Button } from '@/components/ui';
import { NAGPUR_AREAS, COMMON_AMENITIES } from '@/models/property';

/**
 * PropertyFilters Component
 * Horizontal filter bar for search results
 */
export default function PropertyFilters({ 
  filters = {}, 
  onFilterChange,
  categories = []
}) {
  const [activeFilters, setActiveFilters] = useState(filters);

  const handleFilterClick = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? null : value,
    };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePriceRangeChange = (range) => {
    const newFilters = { ...activeFilters, priceRange: range };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="border-b border-border bg-white sticky top-20 z-40">
      <div className="container-custom py-4">
        {/* Filter Buttons Row */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {/* Price Range Filter */}
          <div className="relative group">
            <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-full whitespace-nowrap hover:opacity-90 transition-opacity">
              Price Range
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg p-4 hidden group-hover:block z-50">
              <div className="space-y-2">
                <button 
                  onClick={() => handlePriceRangeChange(null)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  All Prices
                </button>
                <button 
                  onClick={() => handlePriceRangeChange({ min: 0, max: 10000 })}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  Under Rs. 10,000
                </button>
                <button 
                  onClick={() => handlePriceRangeChange({ min: 10000, max: 20000 })}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  Rs. 10,000 - Rs. 20,000
                </button>
                <button 
                  onClick={() => handlePriceRangeChange({ min: 20000, max: 50000 })}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  Rs. 20,000 - Rs. 50,000
                </button>
                <button 
                  onClick={() => handlePriceRangeChange({ min: 50000 })}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-lg"
                >
                  Above Rs. 50,000
                </button>
              </div>
            </div>
          </div>

          {/* Property Type Filter */}
          <button 
            onClick={() => handleFilterClick('category', 'hotel')}
            className={`px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeFilters.category === 'hotel' 
                ? 'bg-primary text-white border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            Hotels
          </button>

          <button 
            onClick={() => handleFilterClick('category', 'pg')}
            className={`px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeFilters.category === 'pg' 
                ? 'bg-primary text-white border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            PG
          </button>

          <button 
            onClick={() => handleFilterClick('category', 'room')}
            className={`px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeFilters.category === 'room' 
                ? 'bg-primary text-white border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            Rooms
          </button>

          <button 
            onClick={() => handleFilterClick('category', 'real-estate')}
            className={`px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeFilters.category === 'real-estate' 
                ? 'bg-primary text-white border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            Real Estate
          </button>

          {/* Area/Location Filter */}
          <div className="relative group">
            <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent transition-colors">
              Nagpur Areas
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg p-4 hidden group-hover:block z-50 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {NAGPUR_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => handleFilterClick('area', area)}
                    className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeFilters.area === area
                        ? 'bg-primary text-white'
                        : 'hover:bg-accent'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Amenities Filter */}
          <div className="relative group">
            <button className="px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap hover:bg-accent transition-colors">
              Amenities
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-lg p-4 hidden group-hover:block z-50 max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {COMMON_AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-border"
                      onChange={(e) => {
                        const currentAmenities = activeFilters.amenities || [];
                        if (e.target.checked) {
                          setActiveFilters({
                            ...activeFilters,
                            amenities: [...currentAmenities, amenity],
                          });
                        } else {
                          setActiveFilters({
                            ...activeFilters,
                            amenities: currentAmenities.filter(a => a !== amenity),
                          });
                        }
                      }}
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Verified Only Filter */}
          <button 
            onClick={() => handleFilterClick('verified', true)}
            className={`px-4 py-2 border border-border text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
              activeFilters.verified 
                ? 'bg-primary text-white border-primary' 
                : 'hover:bg-accent'
            }`}
          >
            ✓ Verified Only
          </button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button 
              onClick={clearAllFilters}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-xs font-bold uppercase text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value) return null;
              if (key === 'amenities' && Array.isArray(value)) {
                return value.map((v, i) => (
                  <Badge key={`${key}-${i}`} variant="outline" className="text-xs">
                    {v}
                  </Badge>
                ));
              }
              return (
                <Badge key={key} variant="outline" className="text-xs">
                  {key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}