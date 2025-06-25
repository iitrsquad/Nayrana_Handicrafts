export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40 safe-area-top">
      {/* iOS Safe Area Top Padding */}
      <div className="pt-safe-top">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between min-h-[60px] sm:h-16 py-2 sm:py-0">
            {/* Left: Brand + Core Trust */}
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <div className="flex items-center flex-shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm sm:text-lg font-bold">🕌</span>
                </div>
                <div className="ml-2 min-w-0">
                  <div className="text-base sm:text-xl font-bold text-gray-900 truncate">
                    Nayrana
                    <span className="hidden xs:inline"> Handicrafts</span>
                  </div>
                  <div className="text-xs text-green-700 font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1 flex-shrink-0"></span>
                    <span className="truncate">GSTIN Verified • Hotel Trusted</span>
                  </div>
                </div>
              </div>
              
              {/* Key promise - Hidden on small screens */}
              <div className="hidden lg:block flex-shrink-0">
                <span className="bg-amber-50 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full border border-amber-200 whitespace-nowrap">
                  🎯 No Tourist Trap Pricing
                </span>
              </div>
            </div>
            
            {/* Right: Contact + Action */}
            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              {/* Phone with guarantee - Hidden on mobile */}
              <div className="hidden md:block text-right text-sm">
                <div className="text-gray-900 font-medium whitespace-nowrap">Chat & Pay on Delivery</div>
                <a 
                  href="https://wa.me/917417994386" 
                  className="text-green-600 flex items-center justify-end hover:text-green-700 transition-colors"
                >
                  <img 
                    src="/assets/products/whatsapp-icon-green.svg" 
                    alt="WhatsApp" 
                    className="w-4 h-4 mr-1 flex-shrink-0"
                  />
                  <span className="whitespace-nowrap">+91 74179-94386</span>
                </a>
              </div>
              
              {/* Primary CTA - Responsive */}
              <a 
                href="https://wa.me/917417994386" 
                className="bg-green-600 text-white px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center hover:bg-green-700 shadow-sm transition-all duration-200 hover:shadow-md min-h-[44px] touch-manipulation"
                style={{
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <img 
                  src="/assets/products/whatsapp-icon-green.svg" 
                  alt="WhatsApp" 
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0"
                />
                <span className="whitespace-nowrap">
                  <span className="hidden xs:inline">Order via </span>WhatsApp
                </span>
              </a>
            </div>
          </div>
          
          {/* Mobile trust bar - Better spacing and layout */}
          <div className="md:hidden pb-3 pt-1">
            <div className="flex justify-center items-center space-x-4 text-xs bg-gray-50 rounded-lg py-2 px-3 mx-2">
              <span className="text-green-700 font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></span>
                GSTIN Verified
              </span>
              <span className="text-blue-700 font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1"></span>
                Hotel Approved
              </span>
              <span className="text-amber-700 font-medium flex items-center">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1"></span>
                Pay on Delivery
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
