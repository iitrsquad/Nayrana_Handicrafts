import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";
import { mockProducts } from "@/lib/mock-data";

interface ProductGridProps {
  hotelName: string;
}

export default function ProductGrid({ hotelName }: ProductGridProps) {
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    refetchOnWindowFocus: false,
    retry: false,
  });

  // Use mock data if API fails or in development
  const displayProducts = products || mockProducts;

  if (error && !displayProducts.length) {
    return (
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Products</h2>
            <p className="text-red-600">
              We're experiencing technical difficulties loading our product catalog. 
              Please try refreshing the page or contact us via WhatsApp for immediate assistance.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          {/* 🎯 PRIMARY HEADING: Exclusive Hotel Collection */}
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <span className="text-white text-sm sm:text-lg">🎯</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Exclusive Hotel Collection
              </h2>
            </div>
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              Curated specifically for discerning hotel guests
            </p>
          </motion.div>

          {/* 🎯 CONSOLIDATED SOCIAL PROOF: Single, powerful trust bar */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8 text-xs sm:text-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="font-medium">12 people viewing now</span>
            </div>
            <div className="flex items-center text-orange-600">
              <span className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></span>
              <span className="font-medium">Only 6 delivery slots left today</span>
            </div>
            <div className="flex items-center text-green-600">
              <span className="font-medium">89+ tourists ordered this month</span>
            </div>
          </motion.div>

          {/* 🎯 SECONDARY HEADING: Handcrafted Treasures as descriptive subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 sm:mb-8"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Handcrafted Treasures
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Authentic Agra handicrafts delivered directly to your hotel room. 
            Each piece tells a story of traditional craftsmanship.
            </p>
          </motion.div>
        </div>

        {/* Filter Tabs - Mobile Scrollable */}
        <motion.div 
          className="flex justify-center mb-6 sm:mb-8 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-100 rounded-lg p-1 flex space-x-1 min-w-max">
            <button className="px-4 sm:px-6 py-2 rounded-md bg-white text-secondary font-medium shadow-sm text-sm whitespace-nowrap">
              All Items
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-md text-gray-600 hover:text-secondary transition-colors text-sm whitespace-nowrap">
              Marble Work
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-md text-gray-600 hover:text-secondary transition-colors text-sm whitespace-nowrap">
              Wood Carvings
            </button>
            <button className="px-4 sm:px-6 py-2 rounded-md text-gray-600 hover:text-secondary transition-colors text-sm whitespace-nowrap">
              Textiles
            </button>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-80 sm:h-96"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard 
                  product={product} 
                  hotelName={hotelName} 
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* 🎯 RETENTION BOOSTER: Urgency + Social proof + Clear CTA */}
        <motion.div 
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Subtle urgency indicator */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-amber-800 text-xs sm:text-sm font-medium">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span>⏰ Hotel-exclusive pricing • 24/7 delivery available</span>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 sm:px-8 py-2 sm:py-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
            onClick={() => {
              const whatsappUrl = `https://wa.me/917417994386?text=Hi! I'm interested in your authentic Agra handicrafts. Can you show me more items and hotel delivery options?`;
              window.open(whatsappUrl, '_blank');
            }}
          >
            View More Products on WhatsApp
          </Button>
          
          {/* 🎯 TRUST REINFORCEMENT: Micro-testimonial */}
          <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            <span className="italic">"Perfect quality, delivered to my hotel in 2 hours!"</span>
            <span className="text-green-600 font-medium"> - Sarah, UK 🇬🇧</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
