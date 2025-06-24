import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeLoadingScreenProps {
  onComplete: () => void;
}

const WelcomeLoadingScreen: React.FC<WelcomeLoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const welcomeTexts = [
    "Connecting you to authentic Agra artisans...",
    "Verifying government certifications...",
    "Loading exclusive handicraft collections...",
    "Preparing your personalized experience..."
  ];

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Cycle through welcome texts
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % welcomeTexts.length);
    }, 1200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-amber-300 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-orange-300 rounded-full"></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border border-yellow-300 transform rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-amber-300 transform rotate-12"></div>
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-8">
          {/* Animated Logo/Brand Name */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative Inlay Border */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-xl blur-sm opacity-30"></div>
              <div className="relative bg-white rounded-xl p-6 border-4 border-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-border">
                <div className="bg-white rounded-lg p-6">
                  {/* Stylized Brand Name with Inlay Design */}
                  <div className="relative">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 via-orange-600 to-yellow-700 bg-clip-text text-transparent mb-2">
                      Nayrana
                    </h1>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400"></div>
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                      <div className="w-6 h-0.5 bg-gradient-to-l from-orange-400 to-yellow-400"></div>
                    </div>
                    <p className="text-lg text-amber-800 font-medium">Handicrafts</p>
                    
                    {/* Decorative Inlay Corners */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-amber-400"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-orange-400"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-orange-400"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-xl text-amber-800 font-medium mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Authentic Agra Heritage • Direct from Artisans
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="flex justify-center items-center gap-6 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 font-medium">Government Verified</span>
            </div>
            <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-blue-700 font-medium">IIT Founded</span>
            </div>
          </motion.div>

          {/* Loading Progress */}
          <motion.div
            className="mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {/* Progress Bar with Inlay Style */}
            <div className="relative w-full h-3 bg-amber-100 rounded-full overflow-hidden border border-amber-200">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 rounded-full relative"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
            
            {/* Progress Text */}
            <div className="mt-3 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentText}
                  className="text-sm text-amber-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {welcomeTexts[currentText]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-amber-300"></div>
            <div className="w-3 h-3 bg-amber-400 rounded-full border-2 border-amber-600"></div>
            <div className="w-4 h-4 bg-orange-400 rounded-full border-2 border-orange-600"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full border-2 border-yellow-600"></div>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-amber-300"></div>
          </motion.div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute -top-10 -right-10 w-6 h-6 bg-amber-300 rounded-full opacity-60"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-10 -left-10 w-4 h-4 bg-orange-300 rounded-full opacity-60"
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 0.3, 0.6]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Elegant fade-out overlay */}
        {progress >= 100 && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomeLoadingScreen; 