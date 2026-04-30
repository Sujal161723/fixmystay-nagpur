'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Search, MapPin, Calendar, Users, Building, Star } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Luxury Stays in Nagpur',
    subtitle: 'Experience premium hospitality with verified hotels across the city',
    cta: 'Book Now',
    category: 'hotel',
    bgColor: 'from-blue-600 to-blue-800',
    accentColor: 'blue',
    // Futala Lake sunset vibe - luxury hotels
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    searchPlaceholder: 'Search luxury hotels in Nagpur...',
  },
  {
    id: 2,
    title: 'Verified PGs near MIHAN & IT Park',
    subtitle: 'Affordable & safe accommodation for students & young professionals',
    cta: 'Check Availability',
    category: 'pg',
    bgColor: 'from-amber-600 to-orange-700',
    accentColor: 'amber',
    // Modern IT Park architecture vibe
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1920&q=80',
    searchPlaceholder: 'Find PGs near MIHAN, IT Park...',
  },
  {
    id: 3,
    title: 'Investment Opportunities in Besa & Wardha Road',
    subtitle: 'Premium real estate listings for smart investors',
    cta: 'Enquire Today',
    category: 'real-estate',
    bgColor: 'from-emerald-600 to-green-800',
    accentColor: 'emerald',
    // Modern architecture / real estate vibe
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80',
    searchPlaceholder: 'Search properties in Besa, Wardha Road...',
  },
  {
    id: 4,
    title: 'Premium Marriage Halls',
    subtitle: 'Unforgettable venues for your special celebrations',
    cta: 'View Gallery',
    category: 'hall',
    bgColor: 'from-purple-600 to-pink-700',
    accentColor: 'purple',
    // Elegant event venue vibe
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80',
    searchPlaceholder: 'Find marriage halls in Nagpur...',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const currentSlideData = slides[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}&category=${currentSlideData.category}`);
    } else {
      router.push(`/search?category=${currentSlideData.category}`);
    }
  };

  const handleCtaClick = () => {
    router.push(`/search?category=${currentSlideData.category}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  return (
    <section 
      className="relative h-[85vh] min-h-[600px] max-h-[900px] overflow-hidden"
      role="region"
      aria-label="Featured listings carousel"
      tabIndex={0}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay - Dynamic based on slide accent */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} opacity-70`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-20 h-full container-custom flex flex-col justify-center">
            <div className="max-w-3xl">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-sm font-bold text-white mb-6">
                {slide.accentColor === 'blue' && <Star className="w-4 h-4" />}
                {slide.accentColor === 'amber' && <Users className="w-4 h-4" />}
                {slide.accentColor === 'emerald' && <Building className="w-4 h-4" />}
                {slide.accentColor === 'purple' && <MapPin className="w-4 h-4" />}
                <span className="uppercase tracking-wider">{slide.category === 'real-estate' ? 'Real Estate' : slide.category === 'pg' ? 'PG & Hostels' : slide.category === 'hall' ? 'Event Venues' : 'Hotels'}</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Integrated Search Bar */}
              <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-3 max-w-2xl mb-8">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/10 rounded-2xl">
                    <Search className="w-5 h-5 text-white/70 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder={slide.searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="flex-1 bg-transparent outline-none text-white placeholder:text-white/50 text-base"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-white text-slate-900 px-6 py-3 rounded-2xl font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleCtaClick}
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform duration-200 shadow-lg"
              >
                {slide.cta}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-10 h-3 bg-white'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
        <span className="text-white text-sm font-bold">
          {currentSlide + 1} / {slides.length}
        </span>
      </div>
    </section>
  );
}