import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface DeliveryProof {
  id: number;
  image: string;
  customerName: string;
  location: string;
  date: string;
  orderNumber: string;
  savings: string;
  bgColor: string;
  iconColor: string;
  icon: string;
  duration: number; // Duration in milliseconds
}

const deliveryProofs: DeliveryProof[] = [
  {
    id: 1,
    image: "/assets/products/nayrana-real-delivery-photo.png",
    customerName: "Emma Thompson",
    location: "Taj Ganj Area",
    date: "May 27, 2025",
    orderNumber: "NH2408",
    savings: "₹3,200 saved",
    bgColor: "green",
    iconColor: "green",
    icon: "📦",
    duration: 4000 // 4 seconds - delivery photo with more text to read
  },
  {
    id: 2,
    image: "/assets/products/foreign-customer-handicraft-delivery.png",
    customerName: "Sarah Mitchell",
    location: "Fatehabad Road",
    date: "May 29, 2025",
    orderNumber: "NH2412",
    savings: "₹2,800 saved vs guide price",
    bgColor: "blue",
    iconColor: "blue",
    icon: "🤝",
    duration: 4000 // 4 seconds - delivery photo with more text to read
  },
  {
    id: 3,
    image: "/assets/products/nayrana-premium-packaging-unboxing.png",
    customerName: "Premium Packaging Process",
    location: "Nayrana Workshop",
    date: "Quality Assurance",
    orderNumber: "Every Order",
    savings: "Museum-quality presentation",
    bgColor: "amber",
    iconColor: "amber",
    icon: "🎁",
    duration: 3500 // 3.5 seconds - visual focus on packaging process
  },
  {
    id: 4,
    image: "/assets/products/customer-after-getting-product.png",
    customerName: "Happy Customer",
    location: "Hotel Room",
    date: "June 1, 2025",
    orderNumber: "NH2415",
    savings: "Authentic satisfaction captured",
    bgColor: "purple",
    iconColor: "purple",
    icon: "😊",
    duration: 4500 // 4.5 seconds - emotional impact, customer satisfaction
  }
];

export default function DeliveryProofSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide functionality with different timings per slide
  useEffect(() => {
    if (!isPlaying || isHovered) return;
    
    const currentSlide = deliveryProofs[currentIndex];
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deliveryProofs.length);
    }, currentSlide.duration);

    return () => clearInterval(interval);
  }, [currentIndex, isPlaying, isHovered]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + deliveryProofs.length) % deliveryProofs.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % deliveryProofs.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentProof = deliveryProofs[currentIndex];

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto mb-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Slider Container */}
      <motion.div 
        className={`bg-white rounded-xl p-4 border-2 shadow-lg overflow-hidden ${
          currentProof.bgColor === 'green' ? 'border-green-200' : 
          currentProof.bgColor === 'blue' ? 'border-blue-200' : 
          currentProof.bgColor === 'amber' ? 'border-amber-200' : 'border-purple-200'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with Controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentProof.bgColor === 'green' ? 'bg-green-100' : 
              currentProof.bgColor === 'blue' ? 'bg-blue-100' : 
              currentProof.bgColor === 'amber' ? 'bg-amber-100' : 'bg-purple-100'
            }`}>
              <span className="text-lg">{currentProof.icon}</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                {currentProof.bgColor === 'green' ? 'REAL DELIVERY PROOF' : 
                 currentProof.bgColor === 'blue' ? 'HAPPY CUSTOMER MOMENT' : 
                 currentProof.bgColor === 'amber' ? 'PREMIUM PACKAGING EXPERIENCE' : 'CUSTOMER SATISFACTION PROOF'}
              </div>
              <div className={`text-xs font-medium ${
                currentProof.bgColor === 'green' ? 'text-green-600' : 
                currentProof.bgColor === 'blue' ? 'text-blue-600' : 
                currentProof.bgColor === 'amber' ? 'text-amber-600' : 'text-purple-600'
              }`}>
                {currentProof.bgColor === 'amber' ? '✅ Artisan Crafted • Premium Quality' : 
                 currentProof.bgColor === 'purple' ? '✅ Client Photo • Genuine Happiness' : '✅ Authentic Customer • Hotel Delivery'}
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlayPause}
              className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              title={isPlaying ? "Pause auto-slide" : "Resume auto-slide"}
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 text-gray-600" />
              ) : (
                <Play className="w-3 h-3 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Image Container with Animation */}
        <div className="relative rounded-lg overflow-hidden border border-gray-200 aspect-[4/3]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentProof.id}
              src={currentProof.image}
              alt={`Delivery to ${currentProof.customerName}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              loading="lazy"
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Slide Indicator */}
          <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium">
            {currentIndex + 1} / {deliveryProofs.length}
          </div>
        </div>

        {/* Customer Details with Animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProof.id}
            className="mt-3 text-xs text-gray-600 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="font-medium">
              {currentProof.bgColor === 'amber' ? '🏭 Process:' : 
               currentProof.bgColor === 'purple' ? '📸 Photo by:' : '🎁 Delivered to:'} <span className={`${
                currentProof.bgColor === 'green' ? 'text-green-600' : 
                currentProof.bgColor === 'blue' ? 'text-blue-600' : 
                currentProof.bgColor === 'amber' ? 'text-amber-600' : 'text-purple-600'
              }`}>{currentProof.customerName}</span> • {currentProof.location}
            </div>
            <div className="text-gray-500 mt-1">
              {currentProof.bgColor === 'amber' ? 
                `🎯 ${currentProof.date} • Applied to ${currentProof.orderNumber} • ${currentProof.savings}` :
                currentProof.bgColor === 'purple' ? 
                `📱 ${currentProof.date} • WhatsApp Order #${currentProof.orderNumber} • ${currentProof.savings}` :
                `📅 ${currentProof.date} • WhatsApp Order #${currentProof.orderNumber} • ${currentProof.savings}`
              }
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {deliveryProofs.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? currentProof.bgColor === 'green' 
                  ? 'bg-green-500 w-6' 
                  : currentProof.bgColor === 'blue'
                  ? 'bg-blue-500 w-6'
                  : currentProof.bgColor === 'amber'
                  ? 'bg-amber-500 w-6'
                  : 'bg-purple-500 w-6'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            title={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar with Dynamic Duration */}
      {isPlaying && !isHovered && (
        <div className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${
              currentProof.bgColor === 'green' ? 'bg-green-500' : 
              currentProof.bgColor === 'blue' ? 'bg-blue-500' : 
              currentProof.bgColor === 'amber' ? 'bg-amber-500' : 'bg-purple-500'
            }`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: currentProof.duration / 1000, ease: "linear" }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
} 