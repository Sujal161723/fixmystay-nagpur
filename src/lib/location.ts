/**
 * Smart Location Service
 * Handles geolocation detection, reverse geocoding, and location persistence
 */

export interface LocationData {
  city: string;
  state: string;
  country: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
}

const LOCATION_STORAGE_KEY = 'fixmystay_location';
const LOCATION_TIMESTAMP_KEY = 'fixmystay_location_timestamp';
const LOCATION_TTL = 24 * 60 * 60 * 1000; // 24 hours TTL

/**
 * Get stored location from localStorage
 */
export function getStoredLocation(): LocationData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
    const timestamp = localStorage.getItem(LOCATION_TIMESTAMP_KEY);
    
    if (!stored || !timestamp) return null;
    
    // Check if location is still valid (within TTL)
    const age = Date.now() - parseInt(timestamp);
    if (age > LOCATION_TTL) {
      clearStoredLocation();
      return null;
    }
    
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Store location in localStorage
 */
export function storeLocation(location: LocationData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    localStorage.setItem(LOCATION_TIMESTAMP_KEY, Date.now().toString());
  } catch {
    // localStorage not available
  }
}

/**
 * Clear stored location
 */
export function clearStoredLocation(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(LOCATION_STORAGE_KEY);
    localStorage.removeItem(LOCATION_TIMESTAMP_KEY);
  } catch {
    // localStorage not available
  }
}

/**
 * Get user's geolocation
 */
export function getGeolocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information is unavailable'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out'));
            break;
          default:
            reject(new Error('An unknown error occurred'));
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  });
}

/**
 * Reverse geocode coordinates to get city name using OpenStreetMap Nominatim API
 * (Free, no API key required)
 */
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<LocationData> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=en`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const data = await response.json();
    const address = data.address || {};

    // Extract city from various possible fields
    const city =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.county ||
      'Unknown';

    const state =
      address.state ||
      address.region ||
      address.province ||
      '';

    const country =
      address.country ||
      address.country_name ||
      '';

    return {
      city,
      state,
      country,
      lat,
      lng,
      formattedAddress: data.display_name,
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    // Return a default location on error
    return {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    };
  }
}

/**
 * Auto-detect user location
 * 1. Check localStorage for recent location
 * 2. If not found or expired, use geolocation + reverse geocoding
 */
export async function detectLocation(): Promise<LocationData> {
  // Check for stored location first
  const stored = getStoredLocation();
  if (stored) {
    return stored;
  }

  // Try to get fresh location
  try {
    const coords = await getGeolocation();
    const location = await reverseGeocode(coords.lat, coords.lng);
    storeLocation(location);
    return location;
  } catch (error) {
    console.warn('Location detection failed:', error);
    // Return default location
    const defaultLocation: LocationData = {
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
    };
    storeLocation(defaultLocation);
    return defaultLocation;
  }
}

/**
 * Search for locations using Google Places API (via Places Service)
 * This is a client-side implementation that uses the browser's fetch
 */
export async function searchLocations(query: string): Promise<LocationData[]> {
  if (!query || query.length < 2) return [];

  try {
    // Using OpenStreetMap Nominatim for place search (free, no API key)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&countrycodes=in&addressdetails=1`,
      {
        headers: {
          'Accept-Language': 'en',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Location search failed');
    }

    const data = await response.json();
    
    return data.map((result: any) => ({
      city:
        result.address?.city ||
        result.address?.town ||
        result.address?.village ||
        result.address?.county ||
        result.name ||
        'Unknown',
      state: result.address?.state || result.address?.region || '',
      country: result.address?.country || 'India',
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      formattedAddress: result.display_name,
    }));
  } catch (error) {
    console.error('Location search error:', error);
    return [];
  }
}

/**
 * Format location for display
 */
export function formatLocation(location: LocationData): string {
  const parts = [location.city, location.state].filter(Boolean);
  return parts.join(', ') || 'Unknown Location';
}

/**
 * Check if two locations match (for filtering)
 */
export function locationsMatch(loc1: LocationData, loc2: LocationData): boolean {
  // Match by city name (case-insensitive)
  if (loc1.city.toLowerCase() === loc2.city.toLowerCase()) {
    return true;
  }
  
  // Match by coordinates if available
  if (loc1.lat && loc2.lat && loc1.lng && loc2.lng) {
    return (
      Math.abs(loc1.lat - loc2.lat) < 0.1 &&
      Math.abs(loc1.lng - loc2.lng) < 0.1
    );
  }
  
  return false;
}
