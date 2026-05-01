'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Search, MapPin, Calendar, Users } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Luxury Stays in Nagpur',
    subtitle: 'Experience premium hospitality with verified hotels and resorts',
    cta: 'Book Now',
    ctaLink: '/search?category=hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80',
    location: 'Futala Lake Area',
    category: 'hotel',
  },
  {
    id: 2,
    title: 'Verified PGs near MIHAN & IT Park',
    subtitle: 'Affordable and safe accommodations for students and professionals',
    cta: 'Check Availability',
    ctaLink: '/search?category=pg',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1920&q=80',
    location: 'MIHAN Zone',
    category: 'pg',
  },
  {
    id: 3,
    title: 'Investment Opportunities in Besa & Wardha Road',
    subtitle: 'Premium real estate properties with high ROI potential',
    cta: 'Enquire Today',
    ctaLink: '/search?category=real-estate',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1920&q=80',
    location: 'Wardha Road',
    category: 'real-estate',
  },
  {
    id: 4,
    title: 'Premium Marriage Halls',
    subtitle: 'Stunning venues for your special celebrations',
    cta: 'View Gallery',
    ctaLink: '/search?category=hall',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1920&q=80',
    location: 'Dharampeth',
    category: 'hall',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play when user interacts
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section 
      className="relative w-full h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Next.js Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container-custom">
              <div className="max-w-2xl">
                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">{slide.location}</span>
                </div>

                {/* Title with text shadow for readability */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4 text-shadow-lg">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-xl font-medium text-shadow">
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-3 bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-white/90 transition-all duration-200 active:scale-[0.97] shadow-lg text-base sm:text-lg"
                >
                  {slide.cta}
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
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
      <div className="absolute bottom-6 md:bottom-10 right-4 md:right-8 z-30 text-white/60 text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}