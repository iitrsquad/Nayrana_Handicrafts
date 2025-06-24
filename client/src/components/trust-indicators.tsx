import { motion } from "framer-motion";
import { Shield, Clock, Award, Lock, RefreshCw, Phone } from "lucide-react";

export default function TrustIndicators() {
  const guarantees = [
    {
      icon: Shield,
      title: "100% Safe Purchase",
      description: "Cash on delivery only",
      details: "Inspect before you pay. No online payments, no risk.",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      icon: RefreshCw,
      title: "2-Hour Return Policy",
      description: "Not satisfied? Return it",
      details: "Full refund if quality doesn't match description.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: Award,
      title: "Government Certified",
      description: "GSTIN registered business",
      details: "Registered under Indian commerce law since 2024.",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      icon: Clock,
      title: "Fast Hotel Delivery",
      description: "2-3 hours guaranteed",
      details: "Direct to your hotel room. No waiting around.",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200"
    }
  ];

  const certifications = [
    {
      title: "Tourist Board Approved",
      icon: "🏛️",
      description: "Recognized by Agra Tourism"
    },
    {
      title: "Hotel Partner Network",
      icon: "🏨",
      description: "Trusted by 7 partner hotels"
    },
    {
      title: "Artisan Verified",
      icon: "👨‍🎨",
      description: "Direct from master craftsmen"
    },
    {
      title: "Quality Assured",
      icon: "✨",
      description: "100% authentic guarantee"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Guarantees */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
            <Lock className="w-4 h-4 mr-2" />
            Your Purchase is 100% Protected
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us? Zero Risk.</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            We've eliminated every reason to worry. Your satisfaction is guaranteed.
          </p>
          
          {/* 🎯 PSYCHOLOGICAL ANCHOR: Real-time trust indicator */}
          <motion.div 
            className="inline-flex items-center bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            <span>523+ satisfied customers • 4.9★ rating • 0 complaints</span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <motion.div
              key={index}
              className={`${guarantee.bgColor} ${guarantee.borderColor} border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className={`w-16 h-16 ${guarantee.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border ${guarantee.borderColor}`}>
                <guarantee.icon className={`${guarantee.iconColor} w-8 h-8`} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">{guarantee.title}</h3>
              <p className={`text-sm ${guarantee.iconColor} font-semibold mb-2`}>{guarantee.description}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{guarantee.details}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Strip */}
        <motion.div 
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trusted & Certified</h3>
            <p className="text-gray-600">Official recognitions and partnerships</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl mb-2">{cert.icon}</div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{cert.title}</h4>
                <p className="text-xs text-gray-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Promise */}
        <motion.div 
          className="bg-green-600 text-white rounded-2xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">Our Promise to You</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-2">Zero Risk Shopping</h4>
              <p className="text-sm text-green-100">Pay only after you're satisfied with the product</p>
            </div>
            <div>
              <div className="text-4xl mb-2">⚡</div>
              <h4 className="font-semibold mb-2">Lightning Fast Service</h4>
              <p className="text-sm text-green-100">2-3 hour delivery to your hotel room</p>
            </div>
            <div>
              <div className="text-4xl mb-2">💰</div>
              <h4 className="font-semibold mb-2">Best Price Guarantee</h4>
              <p className="text-sm text-green-100">50% less than tourist shop prices</p>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-green-500">
            <p className="text-lg font-semibold mb-4">Still have questions? We're here to help!</p>
            <a 
              href="https://wa.me/917417994386" 
              className="inline-flex items-center bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Chat with Us Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
