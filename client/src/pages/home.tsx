import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import React from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import TrustIndicators from "@/components/trust-indicators";
import ComparisonTable from "@/components/comparison-table";
import ProductGrid from "@/components/product-grid";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
// import FloatingTestimonialBox from "@/components/FloatingTestimonialBox";
import TestimonialSection from "@/components/testimonials";
import AIChatWidget from "@/components/AIChatWidget";
import WelcomeLoadingScreen from "@/components/WelcomeLoadingScreen";
import FirstOrderStory from "@/components/FirstOrderStory";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowDown } from "lucide-react";

// Simple process section component
function ProcessSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600">Simple 3-step process to get authentic handicrafts</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">1. WhatsApp Us</h3>
            <p className="text-gray-600">Send us a message with your hotel details</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">2. Choose Products</h3>
            <p className="text-gray-600">Browse our collection and select what you like</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">3. Hotel Delivery</h3>
            <p className="text-gray-600">Pay cash on delivery. 2-3 hours guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🎯 MOBILE OPTIMIZATION: Floating Quick Access Button
function FloatingQuickAccess() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentAction, setCurrentAction] = useState(0);

  // Show after user scrolls 400px (past hero)
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Rotate between "Browse Products" and "Skip to Products"
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAction((prev) => (prev + 1) % 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const actions = [
    { text: "Browse Products", icon: ShoppingBag },
    { text: "Skip to Products", icon: ArrowDown }
  ];

  return (
    <motion.div
      className={`fixed bottom-24 right-4 z-30 md:hidden ${isVisible ? 'block' : 'hidden'}`}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Button
        onClick={scrollToProducts}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 animate-pulse"
        size="sm"
      >
        {currentAction === 0 ? <ShoppingBag className="w-4 h-4 mr-2" /> : <ArrowDown className="w-4 h-4 mr-2" />}
        {actions[currentAction].text}
      </Button>
    </motion.div>
  );
}

export default function Home() {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const hotelCode = searchParams.get("hotel") || "pearl";

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };
  
  const hotelNames: Record<string, string> = {
    'pearl': 'Pearl Heritage Hotel',
    'taj': 'Taj Hotel & Convention Centre',
    'oberoi': 'The Oberoi Amarvilas'
  };
  
  const hotelName = hotelNames[hotelCode] || 'Pearl Heritage Hotel';

  return (
    <>
      {showWelcome ? (
        <WelcomeLoadingScreen onComplete={handleWelcomeComplete} />
      ) : (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="main-content">
          <HeroSection hotelName={hotelName} />
          
            {/* 🎯 UX OPTIMIZATION: Products moved to 2nd position - Create desire BEFORE trust */}
            <div id="products" className="scroll-mt-20">
              <ProductGrid hotelName={hotelName} />
            </div>
        <TrustIndicators />
            <TestimonialSection />
          <FirstOrderStory />
            <ProcessSection />
        <ComparisonTable />
        <FAQSection />
        </div>
        <Footer />
        <AIChatWidget />
          <FloatingQuickAccess />
      </div>
      )}
    </>
  );
}
