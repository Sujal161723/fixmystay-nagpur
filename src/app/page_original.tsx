import Link from "next/link";
import Button from "@/components/ui/Button";
import { Search, Shield, Clock, Headphones } from "lucide-react";
import Footer from "@/components/layout/Footer";

const categories = [
  { name: "Hotels", icon: "🏨", href: "/listings?category=hotels" },
  { name: "PG", icon: "🏠", href: "/listings?category=pg" },
  { name: "Guest Houses", icon: "🏡", href: "/listings?category=guest-houses" },
  { name: "Serviced Apts", icon: "🏢", href: "/listings?category=serviced-apartments" },
  { name: "Hostels", icon: "🛏️", href: "/listings?category=hostels" },
  { name: "Villas", icon: "🏰", href: "/listings?category=villas" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Optimized for mobile */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              Find Your Perfect Stay in Nagpur
            </h1>
            <p className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Discover verified hotels, PGs, and serviced apartments with instant booking and 24/7 support
            </p>

            {/* Search Bar - Compact on mobile */}
            <div className="bg-white rounded-2xl p-2 md:p-3 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-2 md:py-3 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="date"
                    className="flex-1 md:flex-none px-4 py-2 md:py-3 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base min-w-0"
                  />
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="whitespace-nowrap px-4 md:px-6 py-2 md:py-3 text-sm md:text-base"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-sm opacity-80">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Verified Properties
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> Instant Booking
              </span>
              <span className="flex items-center gap-1">
                <Headphones className="w-4 h-4" /> 24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category - Horizontal Slider */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center md:text-left">
            Browse by Category
          </h2>
          
          {/* Horizontal scroll container with snap */}
          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 scrollbar-hide">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={category.href}
                  className="snap-start flex-shrink-0 w-32 md:w-auto"
                >
                  <div className="bg-white rounded-2xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 cursor-pointer h-full flex flex-col items-center justify-center text-center border border-gray-100">
                    <span className="text-3xl md:text-4xl mb-2 md:mb-3">{category.icon}</span>
                    <span className="text-sm md:text-base font-semibold text-gray-800">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Mobile scroll indicators */}
            <div className="md:hidden flex justify-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-blue-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-40 md:h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative">
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold">
                    ₹1,299/night
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">Property {i}</h3>
                  <p className="text-sm text-gray-500 mb-3 truncate">Nagpur, Maharashtra</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm font-medium">4.{i}</span>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Button variant="outline" size="lg" className="px-6 md:px-8">
              View All Properties
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-8 md:py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
            Why Choose FixMyStay?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Shield, title: "Verified Properties", desc: "All properties are verified for quality and safety" },
              { icon: Clock, title: "Instant Booking", desc: "Book instantly without waiting for confirmation" },
              { icon: Headphones, title: "24/7 Support", desc: "Round the clock customer support" },
              { icon: Search, title: "Best Prices", desc: "Competitive pricing with no hidden charges" },
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm md:text-base">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to find your perfect stay?
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-6 md:mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust FixMyStay for their accommodation needs in Nagpur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" size="lg" className="px-6">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="px-6 border-white text-white hover:bg-white hover:text-blue-600">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
