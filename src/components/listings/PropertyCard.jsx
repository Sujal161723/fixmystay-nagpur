'use client';

import Link from 'next/link';
import { Badge, Button } from '@/components/ui';

/**
 * PropertyCard Component
 * Displays a single property card with image, title, location, price, and amenities
 */
export default function PropertyCard({ property, variant = 'horizontal' }) {
  if (!property) return null;

  const {
    id,
    title,
    location,
    area,
    price,
    priceType,
    category,
    imageUrl,
    amenities = [],
    rating,
    reviews = 0,
    isVerified,
  } = property;

  // Format price based on priceType
  const formatPrice = () => {
    if (priceType === 'month') {
      return `Rs. ${price.toLocaleString('en-IN')}/month`;
    } else if (priceType === 'night') {
      return `Rs. ${price.toLocaleString('en-IN')}/night`;
    } else {
      return `Rs. ${price.toLocaleString('en-IN')}`;
    }
  };

  // Display location - prefer area over location
  const displayLocation = area || location || 'Nagpur';

  // Horizontal card (for search results)
  if (variant === 'horizontal') {
    return (
      <Link href={`/listing/${id}`} className="card group flex flex-col md:flex-row h-full md:h-64 border-slate-100 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="w-full md:w-80 bg-muted relative overflow-hidden h-48 md:h-full">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
          )}
          {isVerified && (
            <div className="absolute top-2 left-2">
              <Badge variant="primary" className="text-xs">Verified</Badge>
            </div>
          )}
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                {category && (
                  <Badge variant="default" className="mb-2">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                )}
                <h2 className="text-xl font-bold">{title}</h2>
              </div>
              {rating && (
                <div className="text-right">
                  <span className="text-sm font-black">{rating.toFixed(1)}</span>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">
                    Rating{reviews > 0 && ` (${reviews})`}
                  </p>
                </div>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-4 italic font-medium">
              {displayLocation}
            </p>
            {amenities.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {amenities.slice(0, 3).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {amenity}
                  </Badge>
                ))}
                {amenities.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{amenities.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-between items-end border-t border-slate-50 pt-4">
            <div>
              <span className="text-2xl font-black">{formatPrice()}</span>
            </div>
            <Button className="py-2 px-6 text-sm font-bold">View Details</Button>
          </div>
        </div>
      </Link>
    );
  }

  // Vertical card (for grid layouts)
  return (
    <Link href={`/listing/${id}`} className="group cursor-pointer">
      <div className="aspect-[4/3] bg-muted rounded-2xl mb-4 overflow-hidden relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500"></div>
        )}
        {isVerified && (
          <div className="absolute top-2 left-2">
            <Badge variant="primary" className="text-xs">Verified</Badge>
          </div>
        )}
      </div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-lg font-bold">{title}</h3>
        {rating && (
          <Badge variant="default">{rating.toFixed(1)} Rating</Badge>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-3 font-medium italic underline underline-offset-4 decoration-slate-200">
        {displayLocation}
      </p>
      <div className="flex items-center gap-4">
        <span className="text-xl font-black">{formatPrice()}</span>
      </div>
    </Link>
  );
}

/**
 * PropertyCardSkeleton Component
 * Loading placeholder for PropertyCard
 */
export function PropertyCardSkeleton({ variant = 'horizontal' }) {
  if (variant === 'horizontal') {
    return (
      <div className="card flex flex-col md:flex-row h-64 border-slate-100 animate-pulse">
        <div className="w-full md:w-80 bg-slate-200 h-48 md:h-full rounded-lg"></div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-6 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-slate-200 rounded w-16"></div>
              <div className="h-6 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
          <div className="flex justify-between items-end border-t border-slate-50 pt-4">
            <div className="h-8 bg-slate-200 rounded w-32"></div>
            <div className="h-10 bg-slate-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer animate-pulse">
      <div className="aspect-[4/3] bg-slate-200 rounded-2xl mb-4"></div>
      <div className="h-5 bg-slate-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
      <div className="h-6 bg-slate-200 rounded w-1/4"></div>
    </div>
  );
}