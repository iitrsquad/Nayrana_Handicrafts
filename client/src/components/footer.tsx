import { MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      {/* Clean Trust Banner */}
      <div className="bg-emerald-900/30 border-b border-emerald-800/50 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-emerald-300 font-semibold text-sm mb-1">
            🎯 IIT Student Initiative - Protecting Tourists from ₹50k Emporium Scams
          </p>
          <p className="text-slate-400 text-xs">
            GSTIN Verified • Direct Artisan Sourcing • Fair Pricing Since 2025
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {/* Founder Story - Simplified */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🕌</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Nayrana Handicrafts</h3>
                <p className="text-sm text-slate-400">Fair Price Guarantee</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm leading-relaxed">
              Started by IIT student Saad who discovered tourists were paying <span className="text-red-400 font-semibold">₹50,000</span> for items worth <span className="text-green-400 font-semibold">₹5,000!</span> Direct artisan sourcing means you pay 2-3x LESS than showroom 
              prices, not retail markup.
            </p>
            
                          <div className="bg-emerald-900/20 rounded-lg p-4 border border-emerald-800/30">
                <p className="text-emerald-300 font-semibold text-sm mb-2">
                  💰 Our Promise: <span className="text-green-400">₹5,000-15,000</span> (Not <span className="text-red-400 line-through">₹50,000</span>)
                </p>
                <p className="text-xs text-slate-400">
                  Fair margins (₹700-1000) because my father is a mechanic - we understand honest work.
                </p>
            </div>
          </div>

          {/* Contact & Order */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Order via WhatsApp</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">💬</span>
                </div>
          <div>
                  <p className="text-slate-300 font-medium text-sm">+91 7417994386</p>
                  <p className="text-xs text-slate-500">Saad (Founder)</p>
                </div>
          </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-red-400" />
                </div>
          <div>
                  <p className="text-slate-300 font-medium text-sm">Hotel Delivery in Agra</p>
                  <p className="text-xs text-slate-500">2-3 hours • All major hotels</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-800/30">
              <h5 className="text-green-300 font-semibold text-sm mb-2">Popular Items</h5>
              <div className="space-y-1 text-xs text-slate-400">
                <p>• Taj Mahal Miniatures (₹2,500-8,000)</p>
                <p>• Marble Jewelry Boxes (₹1,500-5,000)</p>
                <p>• Inlay Coasters Set (₹800-2,000)</p>
                <p>• Custom Inlay Work (₹3,000+)</p>
          </div>

              <a 
                href="https://wa.me/917417994386?text=Hi Saad, I'm interested in your handicrafts. Can you show me some options?"
                className="inline-flex items-center justify-center mt-3 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-semibold transition-all hover:scale-105 w-full md:w-auto"
              >
                <span className="mr-2">💬</span>
                Get Fair Prices Now
              </a>
            </div>
          </div>
        </div>

        {/* Simple Bottom */}
        <div className="border-t border-slate-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-slate-300 font-medium">
                © 2025 Nayrana Handicrafts
              </p>
              <p className="text-xs text-slate-500">
                IIT Student Initiative • GSTIN: 05NGHPK5369E1Z1
              </p>
          </div>
            
            <div className="flex items-center space-x-6 text-xs text-slate-500">
              <a href="#" className="hover:text-slate-300 transition-colors">Return Policy</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Contact</a>
              <span>Made with ❤️ in Agra</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
