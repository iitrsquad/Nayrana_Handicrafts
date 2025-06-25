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
    <section id="products" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Handcrafted
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block sm:inline">
                {" "}Collection
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
              Authentic Agra artistry, delivered directly to your hotel room
            </p>
            
            {/* Single, elegant social proof */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">89+ happy guests</span>
              </div>
              <div className="flex items-center text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium">Same day delivery</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Clean Category Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200">
            <div className="flex space-x-1 overflow-x-auto">
              <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium shadow-sm text-sm whitespace-nowrap transition-all duration-300">
                All Items
              </button>
              <button className="px-6 py-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm whitespace-nowrap">
                Marble Work
              </button>
              <button className="px-6 py-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm whitespace-nowrap">
                Wood Art
              </button>
              <button className="px-6 py-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 text-sm whitespace-nowrap">
                Textiles
              </button>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white animate-pulse rounded-2xl h-96 shadow-lg"></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {displayProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
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

        {/* Clean CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for something specific?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Chat with our artisans for custom pieces and exclusive items
            </p>
            
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
              onClick={() => {
                const whatsappUrl = `https://wa.me/917417994386?text=Hi! I'm staying at ${hotelName} and looking for handcrafted items. Can you show me your available collection?`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <img 
                src="/assets/products/whatsapp-icon-green.svg" 
                alt="WhatsApp" 
                className="w-5 h-5 mr-3"
              />
              Chat with Artisans
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Response time: Under 5 minutes during 9 AM - 9 PM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
