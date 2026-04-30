'use client';

import { useRouter } from 'next/navigation';
import { Hotel, Home, Building2, Palmtree, Gem, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'hotel',
    name: 'Hotels',
    description: 'Daily & weekly stays',
    icon: Hotel,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-600',
    hoverColor: 'hover:border-blue-400 hover:bg-blue-100',
    accentBg: 'bg-blue-100',
    count: '250+',
  },
  {
    id: 'pg',
    name: 'PG / Rooms',
    description: 'Monthly rentals',
    icon: Home,
    color: 'amber',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-600',
    hoverColor: 'hover:border-amber-400 hover:bg-amber-100',
    accentBg: 'bg-amber-100',
    count: '500+',
  },
  {
    id: 'real-estate',
    name: 'Flats for Sale',
    description: 'Investment properties',
    icon: Building2,
    color: 'emerald',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-600',
    hoverColor: 'hover:border-emerald-400 hover:bg-emerald-100',
    accentBg: 'bg-emerald-100',
    count: '150+',
  },
  {
    id: 'resort',
    name: 'Resorts',
    description: 'Weekend getaways',
    icon: Palmtree,
    color: 'teal',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-600',
    hoverColor: 'hover:border-teal-400 hover:bg-teal-100',
    accentBg: 'bg-teal-100',
    count: '80+',
  },
  {
    id: 'hall',
    name: 'Marriage Halls',
    description: 'Event venues',
    icon: Gem,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-600',
    hoverColor: 'hover:border-purple-400 hover:bg-purple-100',
    accentBg: 'bg-purple-100',
    count: '120+',
  },
];

export default function ServiceGrid() {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/search?category=${categoryId}`);
  };

  return (
    <section className="py-16 -mt-20 relative z-20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-3">
            Explore by Category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find the perfect accommodation that suits your needs in Nagpur
          </p>
        </div>

        {/* Service Grid - 5 columns with rounded-3xl cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative bg-white border ${category.borderColor} rounded-3xl p-6 text-left transition-all duration-300 ${category.hoverColor} hover:shadow-lg hover:-translate-y-1`}
              >
                {/* Count Badge */}
                <div className={`inline-flex items-center px-2 py-1 rounded-full ${category.accentBg} mb-4`}>
                  <span className={`text-xs font-bold ${category.textColor}`}>
                    {category.count}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-14 h-14 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${category.textColor}`} />
                </div>

                {/* Title & Description */}
                <h3 className={`text-lg font-black ${category.textColor} mb-1`}>
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>

                {/* Arrow Indicator */}
                <div className={`flex items-center gap-1 ${category.textColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>

                {/* Verified Badge */}
                <div className="absolute top-4 right-4">
                  <svg 
                    className={`w-4 h-4 ${category.textColor} opacity-60`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">All listings verified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="font-medium">Secure bookings</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            <span className="font-medium">No hidden charges</span>
          </div>
        </div>
      </div>
    </section>
  );
}