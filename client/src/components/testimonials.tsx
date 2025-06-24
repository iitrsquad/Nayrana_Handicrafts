import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Shield, CheckCircle, MapPin } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      rating: 5,
      text: "Saved ₹2,400 compared to my tour guide's price! The marble Taj Mahal was delivered to my hotel room in 2.5 hours. Quality is incredible - you can see the intricate inlay work up close. Will definitely order again!",
      name: "Sarah Mitchell",
      location: "London, UK",
      flag: "🇬🇧",
      verified: true,
      hotel: "Taj Hotel & Convention Centre",
      purchaseDate: "3 days ago",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face&auto=format&q=80"
    },
    {
      rating: 5,
      text: "As someone who travels frequently, I've been overcharged countless times. Nayrana Handicrafts is a breath of fresh air - transparent pricing, professional service, and genuine products. The wooden elephant pair is beautifully crafted!",
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      flag: "🇪🇸",
      verified: true,
      hotel: "The Oberoi Amarvilas",
      purchaseDate: "1 week ago",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face&auto=format&q=80"
    },
    {
      rating: 5,
      text: "Perfect souvenirs for my family! WhatsApp ordering was incredibly convenient - no need to haggle in crowded markets. The pashmina shawls are genuine and soft. Cash on delivery gave me complete peace of mind.",
      name: "Jennifer Kim",
      location: "Sydney, Australia", 
      flag: "🇦🇺",
      verified: true,
      hotel: "Pearl Heritage Hotel",
      purchaseDate: "5 days ago",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face&auto=format&q=80"
    }
  ];

  return (
    <section data-section="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Trust Indicators */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Shield className="w-4 h-4 mr-2" />
            100% Verified Reviews
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Tourists Choose Us</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from travelers who discovered authentic handicrafts and saved money
          </p>
          
          {/* Trust Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">523</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">₹2.1L</div>
              <div className="text-sm text-gray-600">Total Saved</div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 relative overflow-hidden">
                {/* Verified Badge */}
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </div>
                
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600 font-semibold">{testimonial.rating}.0</span>
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                  
                  {/* Customer Info */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200 mr-3"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 flex items-center">
                        {testimonial.name} <span className="ml-2 text-lg">{testimonial.flag}</span>
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  
                  {/* Purchase Details */}
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Hotel:</span>
                      <span>{testimonial.hotel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Purchased:</span>
                      <span className="text-green-600 font-semibold">{testimonial.purchaseDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Join 500+ Smart Tourists Who Saved Money
            </h3>
            <p className="text-gray-600 mb-6">
              Skip the tourist traps. Order authentic handicrafts directly from artisans.
            </p>
            <a 
              href="https://wa.me/917417994386" 
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <img 
                src="/assets/products/whatsapp-icon-green.svg" 
                alt="WhatsApp" 
                className="w-5 h-5 mr-2"
              />
              Start Shopping Now
            </a>
            <p className="text-xs text-gray-500 mt-3">
              💰 Cash on Delivery • 🛡️ 100% Safe • ⚡ 2-3 Hour Delivery
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
