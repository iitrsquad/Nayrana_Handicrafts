import { useEffect, useRef, useState } from "react";

// Mock review data
const REVIEWS = [
  {
    name: "Maria",
    country: "🇪🇸",
    quote: "Got my marble elephant at half the tourist price. Delivered to my room in 2.5 hours!",
    stars: 5,
  },
  {
    name: "John",
    country: "🇺🇸",
    quote: "The inlay work is stunning and half the guide price. Will recommend!",
    stars: 5,
  },
  {
    name: "Rina",
    country: "🇯🇵",
    quote: "Perfect gift for my family. Came to my hotel fast. Trusted vendor.",
    stars: 5,
  },
];

const STAR_COLOR = "#FFB800";

export default function FloatingTestimonialBox() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (paused) return;
    
    setProgress(0);
    let progressValue = 0;
    
    progressRef.current = setInterval(() => {
      progressValue += 100 / 60; // 6 seconds = 60 intervals of 100ms
      setProgress(progressValue);
    }, 100);

    timeoutRef.current = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % REVIEWS.length);
        setFade(true);
        setProgress(0);
      }, 400);
    }, 6000); // Changed to 6 seconds

    return () => { 
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [index, paused]);

  const review = REVIEWS[index];

  return (
    <div
      className="floating-testimonial-box"
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 9998, // Slightly lower than WhatsApp to avoid conflicts
        maxWidth: 320,
        minWidth: 220,
        fontFamily: "Inter, Roboto, Helvetica, Arial, sans-serif",
        pointerEvents: "none",
      }}
    >
      <div
        className="testimonial-inner"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          pointerEvents: "auto",
          background: "linear-gradient(135deg, #f6fff8 60%, #e6f3e9 100%)",
          border: "1.5px solid #e6f3e9",
          borderRadius: 12,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
          padding: "16px 20px",
          minHeight: 100,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Progress Bar */}
        <div 
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 3,
            backgroundColor: "#4ade80",
            borderRadius: "12px 12px 0 0",
            width: `${progress}%`,
            transition: "width 0.1s linear",
          }}
        />
        
        {/* Trust Badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-green-700 font-semibold flex items-center">
            <img 
              src="/assets/products/whatsapp-icon-green.svg" 
              alt="WhatsApp" 
              className="w-3 h-3 mr-1"
            />
            Verified via WhatsApp
          </span>
          <span className="text-xs text-amber-600 font-semibold">Rated 5★ by 500+ tourists</span>
        </div>
        
        <div className="text-gray-700 text-[15px] mb-2" style={{ fontStyle: "italic", lineHeight: 1.5 }}>💬 "{review.quote}"</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 text-sm">— {review.name} {review.country}</span>
            <span className="flex ml-2">
              {[...Array(review.stars)].map((_, i) => (
                <svg key={i} width="15" height="15" viewBox="0 0 20 20" fill={STAR_COLOR} className="mr-0.5">
                  <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,19.02 10,15.27 4.18,19.02 6,12.14 0.49,7.64 7.41,7.36" />
                </svg>
              ))}
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .floating-testimonial-box {
            bottom: 10px !important;
            right: 10px !important;
            max-width: 90vw !important;
            font-size: 85% !important;
          }
          .testimonial-inner {
            padding: 12px 16px !important;
            min-height: 80px !important;
          }
        }
      `}</style>
    </div>
  );
} 