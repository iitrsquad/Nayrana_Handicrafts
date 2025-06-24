import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Shield, Clock, CheckCircle, Star, Award, RefreshCw, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import DeliveryProofSlider from "./DeliveryProofSlider";

interface HeroSectionProps {
  hotelName: string;
}

const recentOrders = [
  { name: "Sarah", country: "🇺🇸", item: "Marble Taj Mahal", time: "12 minutes ago" },
  { name: "Marco", country: "🇮🇹", item: "Wooden Elephant", time: "25 minutes ago" },
  { name: "Yuki", country: "🇯🇵", item: "Pashmina Shawl", time: "1 hour ago" },
  { name: "Emma", country: "🇬🇧", item: "Marble Coaster", time: "2 hours ago" }
];

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
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOrderIndex((prev) => (prev + 1) % recentOrders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-start pt-16 pb-12">
      {/* Live Social Proof Banner */}
      <div className="absolute top-0 left-0 right-0 bg-green-600 text-white py-2 z-40">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>
              {recentOrders[currentOrderIndex].name} {recentOrders[currentOrderIndex].country} just ordered "{recentOrders[currentOrderIndex].item}" • {recentOrders[currentOrderIndex].time}
            </span>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Authority Badge */}
            <motion.div 
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full mb-4 shadow-lg text-sm font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Award className="w-4 h-4 mr-2" />
              Government Certified • Est. 2024
            </motion.div>

            <motion.h1 
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Skip Tourist{" "}
              <span className="text-red-600">Traps</span>
              <br />
              <span className="text-blue-600">Order Real</span> Art
            </motion.h1>

            {/* Trust Headline - Updated with Factory Ownership */}
            <motion.p 
              className="text-2xl text-gray-700 mb-6 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <strong className="text-blue-600">Direct from our factory</strong> to your hotel room by renowned Agra artisans.{" "}
              <strong className="text-green-600">  No guide cuts. No showroom tricks. No scams.</strong>
            </motion.p>

            

            {/* Real-time social proof */}
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white">🇺🇸</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white">🇬🇧</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white">🇫🇷</div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm border-2 border-white">🇩🇪</div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs border-2 border-white">+500</div>
              </div>
              <div>
                <div className="flex items-center text-yellow-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="ml-2 text-gray-700 font-semibold">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">89 tourists</span> saved money this month
                </p>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">2-3hrs</div>
                <div className="text-sm text-gray-600">Hotel Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">50%</div>
                <div className="text-sm text-gray-600">Less than Tours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">5★</div>
                <div className="text-sm text-gray-600">Tourist Rating</div>
              </div>
            </motion.div>

            {/* GSTIN Verification Badge */}
            <div className="flex items-center justify-center mb-6">
              <Badge className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-lg animate-fadeIn">
                🏛️ Government Registered 2024 • GSTIN Verified
              </Badge>
            </div>

            {/* Risk Reversal Promise - Unified Colors & Integrated Government Badge */}
            <motion.div 
              className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {/* Government Verification Header with Urgency */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Your Safety Guaranteed
                </h3>
                <div className="flex flex-col items-end">
                  <div className="flex items-center bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-700">Govt. Verified</span>
                  </div>
                  <div className="text-xs text-orange-600 font-semibold">
                    ⏰ Offer ends tonight at 11:59 PM — hotel-only pricing
                  </div>
                </div>
              </div>
              
              {/* Key Benefits - Unified Green/Blue Color Scheme */}
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div className="flex items-center text-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span>Cash on delivery only</span>
                </div>
                <div className="flex items-center text-green-700">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>2-3 hour delivery</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <Award className="w-4 h-4 mr-2" />
                  <span>100% authentic guarantee</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span>2-hour return policy</span>
                </div>
              </div>
              
              {/* Government Credentials */}
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="grid grid-cols-2 gap-4 text-xs text-green-800">
                  <div>
                    <span className="font-semibold">GSTIN:</span> 05NGHPK5369E1Z1
                  </div>
                  <div>
                    <span className="font-semibold">Established:</span> 2024
                  </div>
                  <div>
                    <span className="font-semibold">License:</span> UP-AGR-2024-HC-0891
                  </div>
                  <div>
                    <span className="font-semibold">Hotel Partners:</span> 15+ Premium
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Customer Faces & CTA Section */}
            <motion.div 
              className="mt-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              {/* Customer Avatars */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">🇺🇸</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">🇫🇷</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">🇯🇵</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">🇬🇧</div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold border-2 border-white">🇩🇪</div>
                </div>
                <div className="ml-3 text-sm">
                  <div className="font-semibold text-gray-900">89+ satisfied customers</div>
                  <div className="text-green-600 text-xs">"Perfect marble elephant for my wife. Delivered to Taj Hotel in 2 hrs!" – Jacob, UK 🇬🇧</div>
                </div>
              </div>

              {/* Delivery Proof Slider */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <DeliveryProofSlider />
              </motion.div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={openWhatsApp}
                  className="bg-green-600 text-white px-8 py-4 text-lg hover:bg-green-700 hover:transform hover:-translate-y-1 transition-all duration-250 hover:shadow-xl rounded-full shadow-lg"
                  size="lg"
                >
                  <img 
                    src="/assets/products/whatsapp-icon-green.svg" 
                    alt="WhatsApp" 
                    className="w-5 h-5 mr-2"
                  />
                  Get Instant Quote
                </Button>
                <Button 
                  onClick={scrollToProducts}
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-4 text-lg hover:bg-blue-600 hover:text-white hover:transform hover:-translate-y-1 transition-all duration-250 hover:shadow-xl rounded-full"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  View Products
                </Button>
              </div>
            </motion.div>

            {/* Tourist Trap Avoidance Guide */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    🚨 FREE Guide: "How to Avoid Tourist Traps in Agra"
                  </h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Download our exclusive 12-page guide revealing the exact tricks tour guides use to overcharge tourists. Learn the real prices, authentic shops, and insider secrets from a local business owner.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-800">✓ Real vs Fake Prices</Badge>
                    <Badge className="bg-blue-100 text-blue-800">✓ Authentic Shop Locations</Badge>
                  </div>
                  <Button 
                    onClick={() => {
                      // Generate WhatsApp message for guide request
                      const guideMessage = `Hi! I'd like to download the FREE "How to Avoid Tourist Traps in Agra" guide. Can you please send me the PDF?`;
                      const whatsappURL = `https://wa.me/917417994386?text=${encodeURIComponent(guideMessage)}`;
                      window.open(whatsappURL, '_blank');
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Get FREE Guide via WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Our Mission Story - IIT Founder */}
            <motion.div 
              className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl font-bold">🎓</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">Our Mission</h4>
                    <Badge className="bg-blue-100 text-blue-800 text-xs font-semibold">Co-Founded by IIT Student & AI Expert</Badge>
                  </div>
                  <div className="bg-white rounded-lg p-5 border border-blue-100 mb-4 shadow-sm">
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 text-3xl text-blue-300 font-serif">"</div>
                      <p className="text-sm text-gray-700 leading-relaxed mb-3 pl-4">
                        <span className="font-semibold text-blue-800">As brothers from Agra - one studying at IIT Roorkee, the other an AI expert -</span> we were shocked by the 300-500% markups foreigners face in our city. While one studied engineering, the other mastered artificial intelligence to solve this real problem.
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed pl-4">
                        Combining IIT engineering principles with cutting-edge AI technology, we've built a transparent platform where tourists get authentic handicrafts at honest prices. With Talha (IIT Alumni) joining our mission to enhance the visual experience, <span className="font-semibold text-green-700">this is brotherhood applied to solve real-world problems.</span>
                      </p>
                      <div className="absolute -bottom-1 -right-1 text-3xl text-blue-300 font-serif">"</div>
                    </div>
                    <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-100">
                      <div className="text-xs text-gray-600 font-medium">
                        — Saad (IIT Roorkee) & Saami (AI Expert), Co-Founders • Talha (IIT Alumni), Team
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center mt-4">
                    <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                      <div className="text-2xl font-bold text-green-600">₹1.8L+</div>
                      <div className="text-xs text-green-700 font-medium mt-1">Saved by Tourists</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="text-2xl font-bold text-blue-600">89+</div>
                      <div className="text-xs text-blue-700 font-medium mt-1">Happy Customers</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <div className="text-2xl font-bold text-purple-600">8+</div>
                      <div className="text-xs text-purple-700 font-medium mt-1">Partner Hotels</div>
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <p className="text-xs text-gray-600 font-medium">
                      🎯 "Making Agra tourism fair, one honest transaction at a time"
                    </p>
              </div>
              </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Product Image with Trust Overlays */}
          <motion.div 
            className="relative lg:mt-0 mt-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/assets/hero-handicraft-lantern.png" 
                alt="Authentic Agra Handicraft - Premium Brass Collection" 
                className="w-full h-auto" 
                loading="lazy"
                style={{ filter: 'contrast(1.1) brightness(1.05) saturate(1.1)' }}
              />
              
              {/* Live Order Notification - High Impact */}
              <motion.div 
                className="absolute top-4 right-4 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, duration: 0.3 }}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  3 orders today
                </motion.div>
              </motion.div>

              {/* Price Comparison - High Impact */}
              <motion.div 
                className="absolute bottom-6 left-6 bg-green-600 text-white px-4 py-3 rounded-xl shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.4 }}
              >
                <div className="text-xs text-green-100 mb-1">Tourist shop price</div>
                <div className="text-sm text-green-200 line-through">₹3,500</div>
                <div className="text-xl font-bold text-white">₹1,899</div>
                <div className="text-xs text-green-100 font-semibold">You save ₹1,601 (46%)</div>
              </motion.div>
                </div>
          </motion.div>
              </div>
            </div>
            
      {/* Government Verification Button - Top Right */}
      <div className="absolute top-16 right-4 z-30">
        <button
          className="flex items-center space-x-2 bg-white border border-green-500 text-green-700 text-sm font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-green-50 transition-colors"
          onClick={() => setShowGstinModal(true)}
          aria-label="Government Verified Business - Click for details"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Govt. Verified</span>
        </button>
      </div>

      {/* GSTIN Modal */}
      {showGstinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              onClick={() => setShowGstinModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                <h3 className="font-bold text-xl text-gray-900">Government Verified</h3>
                <p className="text-sm text-gray-600">Registered Indian Business</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Business Name:</span> Nayrana Handicrafts
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">GSTIN:</span> 05NGHPK5369E1Z1
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Established:</span> 2024
              </p>
            </div>
            <p className="text-xs text-gray-600 text-center">
              Verify our GSTIN on the official <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">GST portal</a>
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
