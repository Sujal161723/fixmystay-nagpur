'use client';

import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { Badge, Button } from '@/components/ui';
import { useProperty } from '@/hooks/useProperty';
import { COMMON_AMENITIES } from '@/models/property';

export default function DetailPage() {
  const params = useParams();
  const router = useRouter();
  const { property, loading, error } = useProperty(params.id);

  // Format price based on priceType
  const formatPrice = () => {
    if (!property) return null;
    const { price, priceType } = property;
    if (priceType === 'month') {
      return `Rs. ${price.toLocaleString('en-IN')}/month`;
    } else if (priceType === 'night') {
      return `Rs. ${price.toLocaleString('en-IN')}/night`;
    } else {
      return `Rs. ${price.toLocaleString('en-IN')}`;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <Navbar />
        <main className="container-custom py-10">
          <div className="animate-pulse">
            <div className="h-10 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <div className="min-h-screen pt-20">
        <Navbar />
        <main className="container-custom py-10">
          <div className="text-center py-16">
            <div className="text-4xl mb-4">😕</div>
            <h1 className="text-2xl font-bold mb-2">Property Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || 'The property you are looking for does not exist.'}
            </p>
            <Button onClick={() => router.push('/search')}>
              Browse Other Properties
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const {
    title,
    description,
    location,
    area,
    images = [],
    amenities = [],
    rating,
    reviews = 0,
    isVerified,
    contactPhone,
    contactEmail,
  } = property;

  const displayLocation = area || location || 'Nagpur';
  const mainImage = images[0] || property.imageUrl;
  const galleryImages = images.slice(1, 7);

  return (
    <div className="min-h-screen pt-20">
      <Navbar />
      
      <main className="container-custom py-10">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {isVerified && (
                <Badge variant="primary">Verified</Badge>
              )}
              {property.category && (
                <Badge variant="default">
                  {property.category.charAt(0).toUpperCase() + property.category.slice(1)}
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{displayLocation}</p>
          </div>
          <div className="flex gap-4">
            <button className="btn-outline py-2 px-4 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
            <button className="btn-outline py-2 px-4 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Save
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-12">
          <div className="col-span-2 row-span-2 bg-muted rounded-l-2xl relative overflow-hidden">
            {mainImage ? (
              <img src={mainImage} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-slate-300"></div>
            )}
          </div>
          {galleryImages.slice(0, 5).map((img, index) => (
            <div key={index} className="bg-muted relative overflow-hidden">
              {img ? (
                <img src={img} alt={`${title} ${index + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-slate-200"></div>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {description || 'Experience comfort and convenience in the heart of Nagpur. This property offers modern amenities and is perfectly located for both business travelers and families. Close to major landmarks, shopping centers, and transportation hubs.'}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-border pb-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {amenities.length > 0 ? (
                  amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))
                ) : (
                  COMMON_AMENITIES.slice(0, 6).map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Location */}
            <div className="pb-8">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <div className="aspect-video bg-muted rounded-2xl relative overflow-hidden border border-border">
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                  <span className="text-muted-foreground font-bold uppercase tracking-widest text-sm">
                    Interactive Map - {displayLocation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="relative">
            <div className="card p-8 sticky top-32 shadow-2xl border border-border">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-3xl font-black italic">{formatPrice()}</span>
                </div>
                <div className="text-right">
                  {rating && (
                    <>
                      <div className="font-bold text-sm">{rating.toFixed(1)} Rating</div>
                      <div className="text-xs text-muted-foreground">{reviews} reviews</div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex border-b border-border">
                    <div className="flex-1 p-3 border-r border-border">
                      <span className="block text-[10px] font-black uppercase text-muted-foreground">Check-in</span>
                      <input type="text" placeholder="Add date" className="text-sm outline-none w-full bg-transparent" />
                    </div>
                    <div className="flex-1 p-3">
                      <span className="block text-[10px] font-black uppercase text-muted-foreground">Check-out</span>
                      <input type="text" placeholder="Add date" className="text-sm outline-none w-full bg-transparent" />
                    </div>
                  </div>
                  <div className="p-3">
                    <span className="block text-[10px] font-black uppercase text-muted-foreground">Guests</span>
                    <select className="text-sm outline-none w-full bg-transparent appearance-none">
                      <option>1 guest</option>
                      <option>2 guests</option>
                      <option>3 guests</option>
                      <option>4+ guests</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="btn-primary w-full py-4 rounded-xl font-bold mb-4">
                {property.priceType === 'night' ? 'Book Now' : 'Contact Owner'}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                {contactPhone && (
                  <button className="btn-outline w-full py-3 rounded-xl font-bold text-xs">
                    WhatsApp
                  </button>
                )}
                {contactEmail && (
                  <button className="btn-outline w-full py-3 rounded-xl font-bold text-xs">
                    Email Host
                  </button>
                )}
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6 italic">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}