import { motion } from 'framer-motion';
import { Calendar, MapPin, Heart, Star } from 'lucide-react';

const FirstOrderStory = () => {
  // WhatsApp order function
  const handleOrderNow = () => {
    const message = `Hi! I saw Emma's success story on your website and I'm interested in ordering authentic Agra handicrafts. I'd like to save money like she did (₹6,103) and get 2-hour delivery to my hotel. Can you help me with:

🏛️ Marble Taj Mahal Replica (like Emma's)
🐘 Wooden Elephant Pairs  
🧣 Pashmina Shawls
🎁 Other authentic pieces

I'm staying in Agra and want to avoid tourist traps. Please send me your current offers!`;
    
    const whatsappURL = `https://wa.me/917417994386?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  // Scroll to testimonials section
  const handleSeeMoreStories = () => {
    const testimonialsSection = document.querySelector('[data-section="testimonials"]');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll to testimonials by class name
      const testimonials = document.querySelector('.testimonials, [class*="testimonial"]');
      if (testimonials) {
        testimonials.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4" />
            Our Journey Began - May 27th, 2024
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Story That Started It All
          </h2>
          <p className="text-xl text-gray-600">
            From a simple idea to helping tourists avoid exploitation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Emma from Germany - Our First Customer
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    Hotel Taj Resorts, Fatehabad Road, Agra
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <span className="font-semibold text-amber-700">"I was quoted ₹8,000 for a marble Taj Mahal replica at a tourist shop near the monument. Something felt wrong."</span>
                </p>
                
                <p>
                  Emma found our website through her hotel concierge and was skeptical - another online shop promising authentic handicrafts? But our government verification, IIT student story, and transparent pricing convinced her to try.
                </p>
                
                <p>
                  <span className="font-semibold text-green-700">She ordered the same marble replica for ₹1,897 - saving ₹6,103!</span>
                </p>
                
                <p>
                  When our delivery partner Rajesh arrived at her hotel with the beautifully packaged piece, Emma couldn't believe the quality. The marble was genuine, the inlay work was intricate, and it came with an authenticity certificate.
                </p>
                
                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                  <p className="font-medium text-amber-800 italic">
                    "This is exactly what I hoped to find in Agra - authentic art at honest prices. You saved my trip and my wallet! I'm telling all my friends about Nayrana Handicrafts."
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-sm text-amber-700 ml-2">Emma's Review</span>
                  </div>
                  
                  {/* COD Trust Badge */}
                  <div className="mt-3 pt-3 border-t border-amber-200">
                    <div className="inline-flex items-center bg-green-100 border border-green-300 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                      <span className="mr-1">💰</span>
                      Emma paid Cash on Delivery - Zero Risk!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3">Why This Moment Changed Everything:</h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span>Proved our mission: <strong>authentic handicrafts at fair prices</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span>Validated our <strong>hotel delivery model</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span>Confirmed tourists want <strong>transparency and trust</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <span>Inspired us to help <strong>100+ more tourists since then</strong></span>
                </li>
              </ul>
            </div>
          </motion.div>

                     {/* Professional Photo Section */}
           <motion.div
             className="relative"
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             viewport={{ once: true }}
           >
             {/* Main Photo Container */}
             <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100">
               <img
                 src="/emma-first-order7.jpeg"
                 alt="Emma from Germany receiving her first Nayrana Handicrafts order in Agra"
                 className="w-full h-96 object-cover rounded-3xl"
                 style={{ objectPosition: 'center 30%' }}
               />
               
               {/* Minimalist Overlay */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
               
               {/* Clean Date Badge */}
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                 May 27, 2024
               </div>
               
               {/* Premium First Order Badge */}
               <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                 🥇 FIRST ORDER
               </div>
             </div>
 
             {/* External Stats - No Overlap */}
             <div className="flex justify-between mt-6 gap-4">
               {/* Savings Highlight */}
               <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl px-6 py-4 shadow-xl flex-1 text-center">
                 <div className="text-2xl font-bold">₹6,103</div>
                 <div className="text-sm font-medium opacity-90">MONEY SAVED</div>
               </div>
               
               {/* Delivery Speed */}
               <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl px-6 py-4 shadow-xl flex-1 text-center">
                 <div className="text-2xl font-bold">2 Hours</div>
                 <div className="text-sm font-medium opacity-90">DELIVERY TIME</div>
               </div>
             </div>
             
             {/* Location Info */}
             <div className="mt-4 text-center">
               <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                 <span>📍</span>
                 <span>Hotel Taj Resorts, Fatehabad Road, Agra</span>
               </p>
             </div>
           </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-amber-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Be Our Next Success Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join 100+ happy tourists who've discovered authentic Agra handicrafts at honest prices
            </p>
                         <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 onClick={handleOrderNow}
                 className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
               >
                 Order Your Authentic Piece
               </button>
               <button 
                 onClick={handleSeeMoreStories}
                 className="border-2 border-amber-500 text-amber-700 px-8 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all duration-300 hover:shadow-lg transform hover:scale-105"
               >
                 See More Success Stories
               </button>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FirstOrderStory; 