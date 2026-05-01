'use client';

import Link from 'next/link';
import { Building, Home, Building2, Waves, Heart, ChevronRight } from 'lucide-react';

const services = [
  {
    id: 'hotel',
    label: 'Hotels',
    count: '250+',
    icon: Building,
    color: 'blue',
    href: '/search?category=hotel',
    description: 'Daily & weekly stays',
  },
  {
    id: 'pg',
    label: 'PG / Rooms',
    count: '500+',
    icon: Home,
    color: 'amber',
    href: '/search?category=pg',
    description: 'Monthly accommodations',
  },
  {
    id: 'real-estate',
    label: 'Flats for Sale',
    count: '150+',
    icon: Building2,
    color: 'emerald',
    href: '/search?category=real-estate',
    description: 'Investment properties',
  },
  {
    id: 'resort',
    label: 'Resorts',
    count: '80+',
    icon: Waves,
    color: 'teal',
    href: '/search?category=resort',
    description: 'Weekend getaways',
  },
  {
    id: 'hall',
    label: 'Marriage Halls',
    count: '120+',
    icon: Heart,
    color: 'purple',
    href: '/search?category=hall',
    description: 'Event venues',
  },
];

export default function ServiceGrid() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3">
            Explore Our Services
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Find the perfect accommodation for every need - from daily stays to permanent homes
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 max-w-5xl mx-auto">
          {services.map((service) => {
            const Icon = service.icon;
            const bgColor = service.color === 'blue' ? 'bg-blue-50' :
                           service.color === 'amber' ? 'bg-amber-50' :
                           service.color === 'emerald' ? 'bg-emerald-50' :
                           service.color === 'teal' ? 'bg-teal-50' : 'bg-purple-50';
            const borderColor = service.color === 'blue' ? 'border-blue-100 hover:border-blue-200' :
                               service.color === 'amber' ? 'border-amber-100 hover:border-amber-200' :
                               service.color === 'emerald' ? 'border-emerald-100 hover:border-emerald-200' :
                               service.color === 'teal' ? 'border-teal-100 hover:border-teal-200' : 'border-purple-100 hover:border-purple-200';
            const textColor = service.color === 'blue' ? 'text-blue-600' :
                             service.color === 'amber' ? 'text-amber-600' :
                             service.color === 'emerald' ? 'text-emerald-600' :
                             service.color === 'teal' ? 'text-teal-600' : 'text-purple-600';

            return (
              <Link
                key={service.id}
                href={service.href}
                className={`group relative flex flex-col items-center p-4 md:p-6 rounded-3xl border ${borderColor} bg-white hover:shadow-medium transition-all duration-200 active:scale-[0.97] min-h-[140px] md:min-h-[160px]`}
              >
                {/* Icon Container - Larger touch target */}
                <div className={`w-14 h-14 md:w-16 md:h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-7 h-7 md:w-8 md:h-8 ${textColor}`} strokeWidth={2} />
                </div>

                {/* Label */}
                <span className="text-sm md:text-base font-semibold text-slate-800 text-center leading-tight">
                  {service.label}
                </span>

                {/* Count Badge */}
                <span className="mt-1 text-xs font-medium text-muted-foreground">
                  {service.count} listings
                </span>

                {/* Description - Hidden on smallest screens */}
                <span className="hidden md:block mt-1 text-xs text-muted-foreground text-center">
                  {service.description}
                </span>

                {/* Arrow indicator */}
                <ChevronRight className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base hover:underline transition-all"
          >
            View All Properties
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}