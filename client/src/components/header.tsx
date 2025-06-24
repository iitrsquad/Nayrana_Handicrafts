export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand + Core Trust */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">🕌</span>
              </div>
              <div className="ml-2">
                <div className="text-xl font-bold text-gray-900">Nayrana Handicrafts</div>
                <div className="text-xs text-green-700 font-medium">✅ GSTIN Verified • Hotel Trusted</div>
              </div>
            </div>
            
            {/* Key promise */}
            <div className="hidden md:block">
              <span className="bg-amber-50 text-amber-800 text-sm font-semibold px-3 py-1 rounded-full border border-amber-200">
                🎯 No Tourist Trap Pricing
              </span>
            </div>
          </div>
          
          {/* Right: Contact + Action */}
          <div className="flex items-center space-x-3">
            {/* Phone with guarantee */}
            <div className="hidden sm:block text-right text-sm">
              <div className="text-gray-900 font-medium">Chat & Pay on Delivery</div>
              <a href="https://wa.me/917417994386" className="text-green-600 flex items-center justify-end hover:text-green-700 transition-colors">
                <img 
                  src="/assets/products/whatsapp-icon-green.svg" 
                  alt="WhatsApp" 
                  className="w-4 h-4 mr-1"
                />
                +91 74179-94386
              </a>
            </div>
            
            {/* Primary CTA */}
            <a 
              href="https://wa.me/917417994386" 
              className="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-green-700 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <img 
                src="/assets/products/whatsapp-icon-green.svg" 
                alt="WhatsApp" 
                className="w-4 h-4 mr-2"
              />
              Order via WhatsApp
            </a>
          </div>
        </div>
        
        {/* Mobile trust bar */}
        <div className="sm:hidden pb-2 flex justify-center space-x-3 text-xs">
          <span className="text-green-700 font-medium">✅ GSTIN Verified</span>
          <span className="text-blue-700 font-medium">🏨 Hotel Approved</span>
          <span className="text-amber-700 font-medium">💰 Pay on Delivery</span>
        </div>
      </div>
    </header>
  );
}
