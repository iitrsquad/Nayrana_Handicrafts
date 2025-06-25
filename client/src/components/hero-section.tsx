import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  hotelName: string;
}

export default function HeroSection({ hotelName }: HeroSectionProps) {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const message = `Hi, I need help with ordering handicrafts. I'm staying at ${hotelName}.`;
    const phoneNumber = '917417994386';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const [showGstinModal, setShowGstinModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Keep the rotation for potential future use
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Subtle Trust Banner */}
      <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 py-2 z-40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Government Verified • Hotel Trusted • Pay on Delivery</span>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto mt-16 sm:mt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div 
            className="text-center lg:text-left space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Clean Authority Badge */}
            <motion.div 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-medium"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Award className="w-4 h-4 mr-2" />
              Government Certified Artisans
            </motion.div>

            {/* Hero Headline - Clean Typography */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Authentic Agra
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Handicrafts
              </span>
            </motion.h1>

            {/* Simplified Value Proposition */}
            <motion.p 
              className="text-xl lg:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Direct from our workshop to your hotel room.
              <br />
              <span className="font-medium text-gray-900">No markups. No tourist traps.</span>
            </motion.p>

            {/* Single Social Proof */}
            <motion.div 
              className="flex items-center justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex -space-x-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold border-3 border-white shadow-lg">🇺🇸</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold border-3 border-white shadow-lg">🇬🇧</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold border-3 border-white shadow-lg">🇫🇷</div>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold border-3 border-white shadow-lg">+89</div>
              </div>
              <div>
                <div className="flex items-center text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">Happy hotel guests</p>
              </div>
            </motion.div>

            {/* Single Clear CTA */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              <Button 
                onClick={openWhatsApp}
                className="bg-green-600 text-white px-8 py-4 text-lg hover:bg-green-700 hover:scale-105 transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl w-full sm:w-auto"
                size="lg"
              >
                <img 
                  src="/assets/products/whatsapp-icon-green.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5 mr-3"
                />
                Start Shopping via WhatsApp
              </Button>
              
              {/* Subtle Secondary Action */}
              <div className="mt-4 text-center sm:text-left">
                <button 
                  onClick={scrollToProducts}
                  className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-4 transition-colors"
                >
                  Browse our collection
                </button>
              </div>
            </motion.div>

            {/* Minimal Trust Indicators */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">2-3hrs</div>
                <div className="text-sm text-gray-600">Hotel Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50%</div>
                <div className="text-sm text-gray-600">Save vs Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Authentic</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Clean Product Showcase */}
          <motion.div 
            className="relative lg:mt-0 mt-12"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/hero-handicraft-lantern.png" 
                alt="Authentic Agra Handicraft" 
                className="w-full h-auto" 
                loading="lazy"
                style={{ filter: 'contrast(1.05) brightness(1.02) saturate(1.1)' }}
              />
              
              {/* Elegant Price Badge */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm text-gray-900 px-6 py-4 rounded-2xl shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <div className="text-sm text-gray-600 mb-1">Starting from</div>
                <div className="text-2xl font-bold text-green-600">₹1,899</div>
                <div className="text-xs text-gray-500">vs ₹3,500 at tourist shops</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Minimal GSTIN Verification */}
      <div className="absolute top-20 right-4 z-30">
        <button
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-green-200 text-green-700 text-sm font-medium px-4 py-2 rounded-full shadow-lg hover:bg-green-50 transition-all duration-300"
          onClick={() => setShowGstinModal(true)}
          aria-label="Government Verified Business"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Verified</span>
        </button>
      </div>

      {/* Clean GSTIN Modal */}
      {showGstinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div 
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setShowGstinModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Government Verified</h3>
              <p className="text-gray-600 mb-4">Registered & Licensed Business</p>
              <div className="bg-gray-50 rounded-xl p-4 text-left space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">GSTIN:</span> 05NGHPK5369E1Z1
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Business:</span> Nayrana Handicrafts
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Est:</span> 2024
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
