'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Search, X, Loader2 } from 'lucide-react';
import { LocationData, searchLocations, formatLocation } from '@/lib/location';

interface LocationSearchProps {
  onLocationSelect: (location: LocationData) => void;
  currentLocation?: LocationData | null;
  placeholder?: string;
  className?: string;
}

export default function LocationSearch({
  onLocationSelect,
  currentLocation,
  placeholder = 'Search city...',
  className = '',
}: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  const searchPlaces = useCallback(async (searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await searchLocations(searchQuery);
      setSuggestions(results);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        searchPlaces(query);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchPlaces]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
  };

  const handleSelect = (location: LocationData) => {
    setQuery(formatLocation(location));
    setIsOpen(false);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
        <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={currentLocation ? formatLocation(currentLocation) : placeholder}
          className="flex-1 bg-transparent outline-none text-slate-900 placeholder:text-slate-400 min-w-0"
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="w-4 h-4 text-sky-500 animate-spin flex-shrink-0" />
        )}
        {query && (
          <button
            onClick={handleClear}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 max-h-64 overflow-y-auto z-50">
          {suggestions.length > 0 ? (
            <div className="p-2">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                Suggested Locations
              </p>
              {suggestions.map((location, index) => (
                <button
                  key={`${location.city}-${location.state}-${index}`}
                  onClick={() => handleSelect(location)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full text-left px-3 py-3 rounded-lg transition-colors flex items-center gap-3 ${
                    index === highlightedIndex
                      ? 'bg-sky-50 text-sky-700'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">
                      {location.city}
                      {location.state && `, ${location.state}`}
                    </p>
                    {location.formattedAddress && (
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {location.formattedAddress}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 && !isLoading ? (
            <div className="p-4 text-center text-slate-500">
              <Search className="w-6 h-6 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No locations found</p>
              <p className="text-xs mt-1">Try a different search term</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}