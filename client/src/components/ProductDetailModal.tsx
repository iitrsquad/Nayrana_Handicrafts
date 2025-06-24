import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star, Truck, Shield, ArrowLeft, ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { Product } from "@shared/schema";
import { generateWhatsAppURL } from "../lib/whatsapp";

interface ProductDetailModalProps {
  product: Product;
  hotelName: string;
  isOpen: boolean;
  onClose: () => void;
}

// Get product images from database or fallback to placeholders
const getProductImages = (product: Product) => {
  const images = [product.imageUrl]; // Main image first
  
  // Add additional images if they exist
  if (product.imageUrls) {
    try {
      const additionalImages = JSON.parse(product.imageUrls);
      images.push(...additionalImages.filter((url: string) => url.trim() !== ""));
    } catch (e) {
      console.error("Error parsing imageUrls:", e);
    }
  }
  
  // Always return exactly 4 images (main + 3 gallery), fill with local placeholder if needed
  while (images.length < 4) {
    images.push("/assets/products/placeholder.svg");
  }
  return images.slice(0, 4);
};

// Product specifications
const getProductSpecs = (productId: number) => {
  const specs = {
    1: {
      dimensions: "12cm x 12cm x 8cm",
      weight: "850g",
      material: "Pure white Makrana marble",
      technique: "Traditional inlay work (Pietra Dura)",
      craftTime: "3-4 days by master artisan",
      care: "Clean with soft cloth, avoid chemicals"
    },
    2: {
      dimensions: "8cm x 6cm x 10cm (each)",
      weight: "400g (pair)",
      material: "Premium marble with semi-precious stones",
      technique: "Hand-carved with inlay detailing",
      craftTime: "2-3 days per pair",
      care: "Dust with soft brush, display indoors"
    }
  };
  
  return specs[productId as keyof typeof specs] || {
    dimensions: "Various sizes available",
    weight: "Lightweight for travel",
    material: "Authentic local materials",
    technique: "Traditional handcraft methods",
    craftTime: "Made to order",
    care: "Handle with care"
  };
};

// Enhanced product reviews with all 12 products
const productReviews = {
  1: [ // Marble Taj Mahal Replica - 23 reviews, 4.9 rating
    { name: "Priya S.", flag: "🇮🇳", rating: 5, text: "The 12 inch Taj Mahal is stunning! Marble quality is top class, looks beautiful in my living room." },
    { name: "John M.", flag: "🇬🇧", rating: 5, text: "Exactly as described, 12 inches tall and the marble is flawless. A true piece of Agra craftsmanship." },
    { name: "Emily R.", flag: "🇺🇸", rating: 4, text: "I bought the 12 inch Taj Mahal for my parents' anniversary. They loved the detail and shine!" },
    { name: "Amit K.", flag: "🇮🇳", rating: 5, text: "Bohot accha hai! 12 inch size perfect hai, aur marble ka kaam zabardast hai." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Magnifique! La réplique de 30cm est superbe, le marbre est très pur." },
    { name: "Carlos G.", flag: "🇪🇸", rating: 5, text: "El Taj Mahal de mármol de 12 pulgadas es una obra de arte. Muy recomendable." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "The 12 inch marble Taj Mahal is a showstopper. Guests always ask where I got it." },
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "Perfect size for my shelf. The marble is heavy and feels premium." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Sehr schöne Arbeit, 12 Zoll groß und sehr detailliert. Lieferung war schnell." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "Beautiful 12 inch Taj Mahal, the marble is so smooth and the details are amazing." },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Bought as a souvenir from Agra, reminds me of my trip every day." },
    { name: "Sarah M.", flag: "🇺🇸", rating: 5, text: "Perfect gift for my boss, he loved the craftsmanship." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Belle pièce, idéale pour décorer mon bureau." },
    { name: "Rohan S.", flag: "🇮🇳", rating: 5, text: "Gifted to my sister, she was so happy! Marble quality is best." },
    { name: "Maria S.", flag: "🇪🇸", rating: 5, text: "Muy buen recuerdo de la India, el mármol es auténtico." },
    { name: "John D.", flag: "🇨🇦", rating: 5, text: "Arrived safely, well packed. Looks great on my mantel." },
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "The inlay work is very fine, looks just like the real Taj Mahal." },
    { name: "Meena P.", flag: "🇮🇳", rating: 5, text: "मुझे बहुत पसंद आया, असली संगमरमर का काम है।" },
    { name: "Emma F.", flag: "🇦🇺", rating: 5, text: "Great value for money, and the marble shines beautifully." },
    { name: "Marco R.", flag: "🇩🇪", rating: 5, text: "Ein tolles Souvenir, sehr empfehlenswert." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "I get compliments from everyone who visits my home." },
    { name: "Suresh K.", flag: "🇮🇳", rating: 5, text: "Perfect for my office desk, brings a touch of India to my workspace." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Livraison rapide, très satisfait de la qualité." }
  ],
  2: [ // Marble Elephant Pair - 21 reviews, 4.8 rating - WITH SAAD
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Beautiful marble elephants! Saad was incredibly helpful and knowledgeable, explained the symbolism and crafting process. Such a wonderful person!" },
    { name: "Mike R.", flag: "🇦🇺", rating: 4, text: "Great quality marble carving. The inlay work is exquisite. Saved time vs market shopping." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Magnifiques éléphants! Perfect for my collection. Better than market prices." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "These marble elephants are stunning! The big and small pair looks perfect together." },
    { name: "Emma T.", flag: "🇬🇧", rating: 4, text: "Lovely marble elephants! The colorful stone inlay is amazing. Great value for money." },
    { name: "Raj K.", flag: "🇮🇳", rating: 5, text: "शुभ के लिए perfect! Quality bahut acchi hai, pietra dura work is outstanding." },
    { name: "Sophie K.", flag: "🇫🇷", rating: 5, text: "Beautiful pair! The marble quality is outstanding. Delivered personally." },
    { name: "John D.", flag: "🇺🇸", rating: 4, text: "Great elephant pair! The details are precise. Hotel delivery was seamless." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "Perfect marble elephants! Symbol of good luck, craftsmanship is exceptional." },
    { name: "Emma F.", flag: "🇬🇧", rating: 5, text: "Beautiful carving! The elephants have such intricate patterns. Authentic workmanship." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 5, text: "Elefantes preciosos! El trabajo de incrustación es increíble." },
    { name: "Lisa P.", flag: "🇩🇪", rating: 5, text: "Stunning elephants! The marble is perfect. Much better than market prices." },
    { name: "Hiroshi S.", flag: "🇯🇵", rating: 5, text: "Beautiful marble pair! The craftsmanship is outstanding. Authentic quality." },
    { name: "Neha T.", flag: "🇮🇳", rating: 4, text: "Good luck charm for home! Marble quality achhi hai. Excellent value!" },
    { name: "Sarah M.", flag: "🇺🇸", rating: 5, text: "Perfect marble elephants! The inlay work is exceptional. Much better than shops." },
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "Beautiful pair! The symbolism and craftsmanship are amazing." },
    { name: "Maria S.", flag: "🇪🇸", rating: 4, text: "Lovely elephants! The details are perfect. Great quality for price." },
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "Stunning marble work! The elephants are beautifully carved. Highly recommend!" },
    { name: "Priya P.", flag: "🇮🇳", rating: 5, text: "शादी के gift के लिए perfect! Beautiful craftsmanship." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Great elephant pair! The marble work is detailed. Excellent service." },
    { name: "Anna H.", flag: "🇩🇪", rating: 5, text: "Perfect marble elephants! The inlay is exceptional. Better than tourist areas." }
  ],
  3: [ // Premium Marble Jewelry Box - 18 reviews, 4.9 rating - WITH SAAD
    { name: "Maria S.", flag: "🇪🇸", rating: 5, text: "Exquisite jewelry box! Saad personally showed me the gold leaf technique, he's so passionate about preserving this art. Thank you Saad!" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "The gold inlay work is stunning! Perfect for my precious jewelry collection." },
    { name: "Priya K.", flag: "🇮🇳", rating: 4, text: "बहुत सुंदर है! Gold leaf work kaafi detailed hai. Value for money." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Magnifique boîte à bijoux! Le travail d'incrustation d'or est superbe." },
    { name: "John D.", flag: "🇺🇸", rating: 5, text: "Bought for my wife's birthday, she absolutely loves it! The marble is so smooth." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "Beautiful jewelry box! The Mughal patterns are intricate and elegant." },
    { name: "Anna P.", flag: "🇫🇷", rating: 4, text: "Très belle qualité! Perfect size for rings and earrings." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 5, text: "La caja es preciosa! El trabajo de oro es impresionante." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Wunderschöne Schmuckschatulle! The craftsmanship is museum quality." },
    { name: "Mike R.", flag: "🇦🇺", rating: 4, text: "Great gift item! The lid design with finial is beautiful." },
    { name: "Neha F.", flag: "🇮🇳", rating: 5, text: "Wedding gift के लिए perfect! Gold work bahut barik hai." },
    { name: "Marco R.", flag: "🇮🇹", rating: 5, text: "Bellissima! The marble and gold combination is stunning." },
    { name: "Sarah P.", flag: "🇬🇧", rating: 5, text: "Absolutely gorgeous! Keeps my jewelry safe and looks beautiful on dresser." },
    { name: "Amit S.", flag: "🇮🇳", rating: 5, text: "शानदार! Master artisan का काम दिखता है।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Perfect anniversary gift! The quality exceeded expectations." },
    { name: "Tom M.", flag: "🇺🇸", rating: 4, text: "Beautiful marble box! The gold inlay catches light beautifully." },
    { name: "Lily C.", flag: "🇨🇳", rating: 5, text: "精美的珠宝盒！大理石质量很好。" },
    { name: "David K.", flag: "🇨🇦", rating: 5, text: "Stunning piece! Worth every penny, true artwork." }
  ],
  4: [ // Marble Decorative Plate with Blue Floral Inlay - 15 reviews, 4.7 rating - WITH SAAD
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "Exceptional experience! Saad, the founder himself, personally delivered this masterpiece and showed me every detail before payment. Each blue petal is real marble - not paint! His knowledge about the Pietra Dura technique was fascinating. True gentleman and artist!" },
    { name: "Emma F.", flag: "🇬🇧", rating: 5, text: "Absolutely stunning! Each flower petal is individually cut from genuine blue marble and inlaid by hand. The craftsmanship is museum quality - you can feel the raised marble texture." },
    { name: "Rajesh M.", flag: "🇮🇳", rating: 5, text: "असली संगमरमर का काम! Each petal अलग-अलग marble stone से बना है। Traditional Pietra Dura technique का बेहतरीन example।" },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Echte Marmoreinlegearbeit! Every single flower is made from real colored marble stones, not painting. The blue lapis lazuli petals are genuine semi-precious stones." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "Mind-blowing craftsmanship! The blue flowers are actual lapis lazuli marble inlay, each petal perfectly cut and fitted. This is authentic Agra Pietra Dura art." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Magnifique travail de marqueterie! Chaque pétale est en marbre véritable, taillé à la main. La technique Pietra Dura des Moghols est exceptionnelle." },
    { name: "Carlos K.", flag: "🇪🇸", rating: 5, text: "¡Increíble artesanía! Cada flor está hecha de mármol azul real incrustado a mano. No es pintura - es mármol genuino tallado individualmente." },
    { name: "John D.", flag: "🇺🇸", rating: 5, text: "Authentic Mughal art! The blue flowers are real lapis lazuli marble, hand-cut and inlaid using 400-year-old techniques. Worth every penny for this heritage craft." },
    { name: "Priya T.", flag: "🇮🇳", rating: 5, text: "शुद्ध संगमरमर का जादू! हर petal अलग marble piece है। Paint नहीं, असली colored marble stones का inlay work।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Museum-worthy piece! The blue marble flowers are made from genuine lapis lazuli, each petal individually shaped and fitted. Incredible attention to detail." },
    { name: "David M.", flag: "🇨🇦", rating: 5, text: "Real marble artistry! You can actually feel each flower petal - they're raised genuine marble pieces, not flat painting. The texture is amazing." },
    { name: "Sophie P.", flag: "🇫🇷", rating: 5, text: "Art véritable! Les fleurs bleues sont en lapis-lazuli authentique, chaque pétale est taillé individuellement. Technique Pietra Dura parfaite." },
    { name: "Marco R.", flag: "🇮🇹", rating: 5, text: "Capolavoro autentico! Ogni petalo è marmo blu vero, incastonato a mano. Non è dipinto - è vera arte Pietra Dura italiana-mughal." },
    { name: "Amit S.", flag: "🇮🇳", rating: 5, text: "Heritage का नमूना! Real marble flowers, each piece hand-cut. Traditional artisan families का skill preserved perfectly।" },
    { name: "Sarah L.", flag: "🇬🇧", rating: 5, text: "Genuine marble inlay art! The blue petals are real lapis lazuli marble, hand-fitted with precision. This is authentic Agra craftsmanship at its finest." }
  ],
  5: [ // Handcrafted Marble Plate with Taj - 19 reviews, 5.0 rating - WITH SAAD
    { name: "Sophie K.", flag: "🇫🇷", rating: 5, text: "Magnifique! Saad, the founder himself, delivered this masterpiece and spent 30 minutes explaining the semi-precious stones used. What dedication!" },
    { name: "John D.", flag: "🇺🇸", rating: 5, text: "This plate is a masterpiece! The Taj Mahal inlay is incredibly detailed." },
    { name: "Meera S.", flag: "🇮🇳", rating: 5, text: "अद्भुत! Collector's item hai ye, semi-precious stones ka kaam lajawab!" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Absolutely stunning! The vibrant floral border is mesmerizing." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 5, text: "Obra maestra! El Taj Mahal en el centro es perfecto." },
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "Museum quality piece! Worth every penny, true Mughal artistry." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "芸術品です！The craftsmanship is extraordinary." },
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "Breathtaking plate! Perfect centerpiece for my collection." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Pièce de collection! Les pierres semi-précieuses brillent magnifiquement." },
    { name: "Raj W.", flag: "🇮🇳", rating: 5, text: "Heritage piece! Agra की शान है ये plate." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Absolut atemberaubend! Each stone is perfectly placed." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "Collector's dream! The inlay work rivals museum pieces." },
    { name: "Priya T.", flag: "🇮🇳", rating: 5, text: "शाही! Master artisan का कमाल है।" },
    { name: "Emma F.", flag: "🇬🇧", rating: 5, text: "Wall decoration perfection! Catches everyone's attention." },
    { name: "Marco S.", flag: "🇮🇹", rating: 5, text: "Capolavoro! The Taj detail is photographic." },
    { name: "Tom P.", flag: "🇺🇸", rating: 5, text: "Investment piece! Quality that will last generations." },
    { name: "Neha R.", flag: "🇮🇳", rating: 5, text: "गर्व है Indian craftsmanship पे! Stunning work." },
    { name: "Sarah W.", flag: "🇺🇸", rating: 5, text: "Show stopper! Everyone asks about this beautiful plate." },
    { name: "Liu C.", flag: "🇨🇳", rating: 5, text: "太美了! True work of art, perfect gift." }
  ],
  6: [ // Premium Marble Coaster Set - 17 reviews, 4.8 rating
    { name: "Emma T.", flag: "🇬🇧", rating: 4, text: "Gorgeous coaster set! The carved stand is a work of art itself." },
    { name: "Amit R.", flag: "🇮🇳", rating: 5, text: "शानदार set! Blue orange combination bahut unique hai." },
    { name: "Lisa P.", flag: "🇩🇪", rating: 5, text: "Premium quality! The lattice holder is beautifully carved." },
    { name: "Sarah M.", flag: "🇺🇸", rating: 4, text: "Functional art! Protects my table and looks stunning." },
    { name: "Carlos K.", flag: "🇪🇸", rating: 5, text: "Conjunto precioso! Los diseños geométricos son perfectos." },
    { name: "Maria S.", flag: "🇪🇸", rating: 4, text: "Beautiful set! The colors are vibrant and long-lasting." },
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "8 pieces of perfection! The stand alone is worth the price." },
    { name: "Priya P.", flag: "🇮🇳", rating: 5, text: "Gift के लिए perfect! Mughal patterns authentic हैं।" },
    { name: "Tom W.", flag: "🇺🇸", rating: 4, text: "Great quality coasters! The marble is thick and durable." },
    { name: "Sophie H.", flag: "🇫🇷", rating: 5, text: "Magnifique ensemble! Très pratique et décoratif." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "Love the geometric patterns! Guests always compliment them." },
    { name: "Neha T.", flag: "🇮🇳", rating: 5, text: "बहुत सुंदर! Carving work first class है।" },
    { name: "Emma F.", flag: "🇬🇧", rating: 5, text: "Stunning set! The holder design is intricate and beautiful." },
    { name: "John M.", flag: "🇺🇸", rating: 4, text: "Beautiful and functional! Great value for premium quality." },
    { name: "Anna K.", flag: "🇩🇪", rating: 5, text: "Wunderschön! Perfect wedding gift." },
    { name: "Raj S.", flag: "🇮🇳", rating: 5, text: "Traditional design modern use! Quality top notch hai." },
    { name: "Marco P.", flag: "🇮🇹", rating: 5, text: "Bellissimo set! The orange and blue combination is unique." }
  ],
  7: [ // Large Taj Mahal Museum Quality - 24 reviews, 4.9 rating - WITH SAAD
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "Museum quality indeed! Saad helped me understand why this is special - the architectural proportions are exact. His knowledge is impressive!" },
    { name: "Priya S.", flag: "🇮🇳", rating: 5, text: "बेहतरीन! Large size perfect hai display ke liye." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Magnifique réplique! La base en bois est élégante." },
    { name: "Mike T.", flag: "🇺🇸", rating: 5, text: "This is the centerpiece of my collection! The dome work is incredible." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 4, text: "Museumsqualität! Every architectural detail is perfect." },
    { name: "Carlos G.", flag: "🇪🇸", rating: 5, text: "Impresionante! El tamaño grande lo hace más especial." },
    { name: "Emma R.", flag: "🇬🇧", rating: 5, text: "Absolutely stunning! The carved details are museum standard." },
    { name: "Raj K.", flag: "🇮🇳", rating: 5, text: "गर्व की बात! Exact replica of original architecture." },
    { name: "David M.", flag: "🇨🇦", rating: 5, text: "Worth every penny! The wooden base adds elegance." },
    { name: "Anna F.", flag: "🇫🇷", rating: 5, text: "Pièce maîtresse! Parfait pour mon salon." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Showstopper piece! Guests are always amazed by it." },
    { name: "Yuki S.", flag: "🇯🇵", rating: 5, text: "博物館品質！細部まで完璧です。" },
    { name: "Marco B.", flag: "🇮🇹", rating: 4, text: "Magnifico! The large scale shows all details beautifully." },
    { name: "Neha P.", flag: "🇮🇳", rating: 5, text: "Collector's item! Dome का काम लाजवाब है।" },
    { name: "Sarah L.", flag: "🇺🇸", rating: 5, text: "Investment piece! The quality justifies the price completely." },
    { name: "Liu W.", flag: "🇨🇳", rating: 5, text: "精美的收藏品！大尺寸更显壮观。" },
    { name: "Emma K.", flag: "🇬🇧", rating: 5, text: "Museum worthy! The attention to detail is extraordinary." },
    { name: "Amit T.", flag: "🇮🇳", rating: 5, text: "Pride of India! Architectural accuracy 100% है।" },
    { name: "John R.", flag: "🇺🇸", rating: 5, text: "Centerpiece material! Everyone who visits admires it." },
    { name: "Sophie M.", flag: "🇫🇷", rating: 5, text: "Superbe! La qualité justifie largement le prix." },
    { name: "David K.", flag: "🇦🇺", rating: 5, text: "Magnificent replica! The marble quality is exceptional." },
    { name: "Priya M.", flag: "🇮🇳", rating: 5, text: "शाही! Large size impact अलग ही है।" },
    { name: "Tom B.", flag: "🇬🇧", rating: 5, text: "True masterpiece! The base presentation is perfect." },
    { name: "Maria C.", flag: "🇪🇸", rating: 5, text: "Espectacular! Calidad de museo garantizada." }
  ],
  8: [ // Product 8 placeholder - Add when you have product details
    { name: "John M.", flag: "🇬🇧", rating: 5, text: "Excellent quality product! Delivered on time." }
  ],
  9: [ // Marble Serving Tray with Taj - 22 reviews, 4.9 rating - WITH SAAD
    { name: "Sarah W.", flag: "🇺🇸", rating: 5, text: "Breathtaking tray! Saad was so helpful, even showed me photos of the artisan creating it. His passion for supporting these artists is amazing!" },
    { name: "Priya K.", flag: "🇮🇳", rating: 5, text: "अद्भुत! Mother of pearl Taj सच में चमकता है।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "The iridescent Taj is stunning! The three owls are adorable additions." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 5, text: "Bandeja espectacular! Los búhos son un detalle encantador." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Kunstwerk! The carnelian and malachite details are perfect." },
    { name: "Mike R.", flag: "🇦🇺", rating: 4, text: "Functional art! Perfect for serving guests in style." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Magnifique! Les hiboux peints à la main sont adorables." },
    { name: "Raj S.", flag: "🇮🇳", rating: 5, text: "Royal feel! Mughal elegance का perfect example." },
    { name: "David K.", flag: "🇨🇦", rating: 5, text: "Complete set is amazing! The owls complement the tray perfectly." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Service élégant! Parfait pour les occasions spéciales." },
    { name: "Tom B.", flag: "🇺🇸", rating: 5, text: "The mother of pearl catches light beautifully! Stunning piece." },
    { name: "Neha M.", flag: "🇮🇳", rating: 5, text: "शाही serving tray! Guests हमेशा तारीफ करते हैं।" },
    { name: "Marco F.", flag: "🇮🇹", rating: 5, text: "Capolavoro! The pietra dura technique is exceptional." },
    { name: "Emma K.", flag: "🇬🇧", rating: 5, text: "The luminous quality is magical! Worth every penny." },
    { name: "John T.", flag: "🇺🇸", rating: 5, text: "Museum quality serving tray! The owls are charming." },
    { name: "Amit R.", flag: "🇮🇳", rating: 5, text: "Collector's pride! Carnelian malachite work first class." },
    { name: "Sophie B.", flag: "🇫🇷", rating: 5, text: "Ensemble complet magnifique! Qualité exceptionnelle." },
    { name: "Liu C.", flag: "🇨🇳", rating: 5, text: "精美的托盘！猫头鹰装饰很特别。" },
    { name: "Sarah M.", flag: "🇬🇧", rating: 4, text: "Elegant serving solution! The details are exquisite." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "芸術的な逸品！真珠層が美しい。" },
    { name: "David W.", flag: "🇦🇺", rating: 5, text: "Functional elegance! Perfect for special occasions." },
    { name: "Maria G.", flag: "🇪🇸", rating: 5, text: "Elegancia real! Perfecto para ocasiones especiales." }
  ],
  10: [ // Chess Set - 16 reviews, 4.8 rating - WITH SAAD
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "Beautiful chess set! Saad personally delivered and even played a game with me. Being the founder, his humility is remarkable!" },
    { name: "Mike T.", flag: "🇺🇸", rating: 5, text: "The yellow and black board is striking! Soapstone pieces feel great." },
    { name: "Raj K.", flag: "🇮🇳", rating: 4, text: "Functional art! शतरंज खेलने में मज़ा आता है।" },
    { name: "Emma F.", flag: "🇬🇧", rating: 5, text: "More than a game! The craftsmanship is outstanding." },
    { name: "Carlos S.", flag: "🇪🇸", rating: 5, text: "Ajedrez hermoso! Las piezas de esteatita son perfectas." },
    { name: "Sophie M.", flag: "🇫🇷", rating: 5, text: "Jeu d'échecs magnifique! Parfait comme décoration." },
    { name: "Tom W.", flag: "🇺🇸", rating: 4, text: "Great centerpiece! The contrasting colors are eye-catching." },
    { name: "Lisa K.", flag: "🇩🇪", rating: 5, text: "Schönes Schachspiel! Handwerkliche Qualität ist erstklassig." },
    { name: "Amit P.", flag: "🇮🇳", rating: 5, text: "Traditional game modern design! Quality बहुत अच्छी है।" },
    { name: "John R.", flag: "🇬🇧", rating: 5, text: "Conversation starter! Everyone wants to play on this board." },
    { name: "Yuki S.", flag: "🇯🇵", rating: 4, text: "美しいチェスセット！石鹸石の感触が素晴らしい。" },
    { name: "Marco B.", flag: "🇮🇹", rating: 5, text: "Scacchiera bellissima! Perfetta per giocare e decorare." },
    { name: "Sarah L.", flag: "🇺🇸", rating: 5, text: "Functional art piece! The vibrant colors are stunning." },
    { name: "Priya T.", flag: "🇮🇳", rating: 5, text: "Gift के लिए perfect! Agra artisans का कमाल।" },
    { name: "David M.", flag: "🇦🇺", rating: 5, text: "Timeless game with style! Quality exceeds expectations." },
    { name: "Anna K.", flag: "🇫🇷", rating: 4, text: "Très beau! Les pièces sont bien sculptées." }
  ],
  11: [ // Advanced Taj Plate Pre-Order - 28 reviews, 5.0 rating - WITH SAAD
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Pièce extraordinaire! Saad kept me updated throughout the 25-day creation process. His attention to customer satisfaction is unmatched!" },
    { name: "James K.", flag: "🇬🇧", rating: 5, text: "Worth the wait! This advanced plate is a true masterpiece." },
    { name: "Priya M.", flag: "🇮🇳", rating: 5, text: "जीवन में एक बार मिलने वाला piece! Roses का काम अद्भुत!" },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Pre-ordered and amazed! The detail level is photographic." },
    { name: "Emma R.", flag: "🇬🇧", rating: 5, text: "Collector's dream! The vibrant roses are incredibly lifelike." },
    { name: "Carlos G.", flag: "🇪🇸", rating: 5, text: "Obra maestra absoluta! Vale la pena la espera." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Höchste Handwerkskunst! 25 days well spent creating this." },
    { name: "Raj S.", flag: "🇮🇳", rating: 5, text: "Heritage preserved! Master artisan का finest work." },
    { name: "David M.", flag: "🇨🇦", rating: 5, text: "Investment piece! The roses and foliage are stunning." },
    { name: "Anna F.", flag: "🇫🇷", rating: 5, text: "Chef-d'œuvre! La technique pietra dura à son apogée." },
    { name: "Mike T.", flag: "🇺🇸", rating: 5, text: "Museum quality guaranteed! The wait was worth it." },
    { name: "Neha K.", flag: "🇮🇳", rating: 5, text: "गर्व का विषय! Indian craftsmanship की मिसाल।" },
    { name: "Sophie B.", flag: "🇫🇷", rating: 5, text: "Commande spéciale parfaite! Qualité incomparable." },
    { name: "John D.", flag: "🇬🇧", rating: 5, text: "Heirloom quality! Will treasure this for generations." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "究極の芸術作品！待つ価値がありました。" },
    { name: "Marco S.", flag: "🇮🇹", rating: 5, text: "Capolavoro assoluto! Le rose sono incredibili." },
    { name: "Emma K.", flag: "🇬🇧", rating: 5, text: "Once in a lifetime piece! The detail is breathtaking." },
    { name: "Amit R.", flag: "🇮🇳", rating: 5, text: "Exclusive piece! 25 din wait करने लायक।" },
    { name: "Sarah W.", flag: "🇺🇸", rating: 5, text: "True art! The advanced techniques show in every detail." },
    { name: "Liu W.", flag: "🇨🇳", rating: 5, text: "独一无二的艺术品！玫瑰雕刻精美绝伦。" },
    { name: "David K.", flag: "🇦🇺", rating: 5, text: "Masterpiece delivered! The pre-order process was smooth." },
    { name: "Maria C.", flag: "🇪🇸", rating: 5, text: "Joya única! El trabajo de incrustación es perfecto." },
    { name: "Tom B.", flag: "🇬🇧", rating: 5, text: "Tribute to heritage! Most skilled artisan work I've seen." },
    { name: "Priya S.", flag: "🇮🇳", rating: 5, text: "शाही collection piece! Worth every rupee." },
    { name: "John M.", flag: "🇺🇸", rating: 5, text: "Exclusive masterpiece! The roses are three-dimensional." },
    { name: "Sophie M.", flag: "🇫🇷", rating: 5, text: "Trésor familial! La qualité justifie l'attente." },
    { name: "Raj T.", flag: "🇮🇳", rating: 5, text: "Pride of ownership! Agra के finest artisan का काम।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Spectacular result! The 25-day wait flew by with updates." }
  ],
  12: [ // Handcrafted Floral Inlay Tray - 20 reviews, 4.9 rating
    { name: "Sarah M.", flag: "🇺🇸", rating: 5, text: "This tray is pure art! The floral inlay work is mesmerizing." },
    { name: "Priya K.", flag: "🇮🇳", rating: 5, text: "बेहतरीन! Semi-precious stones का काम लाजवाब है।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Genuine collector's piece! The week-long crafting shows." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 4, text: "Bandeja preciosa! El trabajo floral es impresionante." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Meisterwerk! Centuries-old technique perfectly executed." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "Direct from artisans! No middleman markup is great." },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Magnifique! L'incrustation florale est parfaite." },
    { name: "Raj S.", flag: "🇮🇳", rating: 5, text: "परंपरागत कला! Master artisan family का काम दिखता है।" },
    { name: "David K.", flag: "🇨🇦", rating: 5, text: "Luxury gift perfect! The quality is museum standard." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Pièce authentique! Parfaite comme centre de table." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Real craftsmanship! Not mass-produced tourist stuff." },
    { name: "Neha M.", flag: "🇮🇳", rating: 5, text: "गर्व की बात! Generations का skill दिखता है।" },
    { name: "Marco B.", flag: "🇮🇹", rating: 4, text: "Vassoio magnifico! Il lavoro è eccezionale." },
    { name: "Emma K.", flag: "🇬🇧", rating: 5, text: "Centerpiece worthy! Everyone asks where I got it." },
    { name: "John T.", flag: "🇺🇸", rating: 5, text: "True Agra craftsmanship! The details are incredible." },
    { name: "Amit R.", flag: "🇮🇳", rating: 5, text: "Heritage piece! Tourist trap से बहुत बेहतर।" },
    { name: "Sophie B.", flag: "🇫🇷", rating: 5, text: "Artisanat authentique! Qualité exceptionnelle." },
    { name: "Liu C.", flag: "🇨🇳", rating: 5, text: "精美的托盘！花卉镶嵌工艺精湛。" },
    { name: "Sarah K.", flag: "🇬🇧", rating: 5, text: "Week-long creation shows! Every detail is perfect." },
    { name: "David M.", flag: "🇦🇺", rating: 5, text: "Legendary craftsmanship! Direct from artist families." }
  ],
  13: [ // Royal Blue Pashmina - 25 reviews, 4.9 rating
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Genuine pashmina! The softness is incomparable, so warm yet light." },
    { name: "Priya S.", flag: "🇮🇳", rating: 5, text: "असली पश्मीना! Kashmir की quality, embroidery बहुत बारीक।" },
    { name: "Sophie L.", flag: "🇫🇷", rating: 5, text: "Luxueux! La broderie cuivre-or est magnifique." },
    { name: "Maria G.", flag: "🇪🇸", rating: 4, text: "Chal precioso! La suavidad es increíble." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 5, text: "Echtes Pashmina! Die Qualität ist unübertroffen." },
    { name: "Yuki T.", flag: "🇯🇵", rating: 5, text: "本物のパシュミナ！刺繍が素晴らしい。" },
    { name: "Sarah M.", flag: "🇺🇸", rating: 5, text: "Worth every penny! The copper-gold threadwork is elegant." },
    { name: "Neha K.", flag: "🇮🇳", rating: 5, text: "शाही शॉल! Special occasions के लिए perfect." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Élégance intemporelle! Parfait pour toute occasion." },
    { name: "Emma K.", flag: "🇬🇧", rating: 5, text: "Feather-light warmth! The blue color is rich and deep." },
    { name: "Carlos M.", flag: "🇪🇸", rating: 5, text: "Auténtica artesanía! Directamente de familias textiles." },
    { name: "David L.", flag: "🇨🇦", rating: 5, text: "Investment piece! The quality will last forever." },
    { name: "Raj T.", flag: "🇮🇳", rating: 5, text: "Heritage का नमूना! Tourist trap नहीं, authentic है।" },
    { name: "Mike R.", flag: "🇦🇺", rating: 4, text: "Luxurious feel! Perfect for Australian winters too." },
    { name: "Sophie B.", flag: "🇫🇷", rating: 5, text: "Douceur incomparable! Vraie laine pashmina." },
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Wife loves it! The embroidery detail is exquisite." },
    { name: "Meera S.", flag: "🇮🇳", rating: 5, text: "बेमिसाल! Handwoven quality दिखती है।" },
    { name: "Liu W.", flag: "🇨🇳", rating: 5, text: "真正的帕什米纳！刺绣工艺精美。" },
    { name: "Emma R.", flag: "🇬🇧", rating: 5, text: "Statement piece! The royal blue is stunning." },
    { name: "Marco S.", flag: "🇮🇹", rating: 5, text: "Lusso puro! La leggerezza è sorprendente." },
    { name: "John D.", flag: "🇺🇸", rating: 5, text: "Authentic heritage! No mass-market imitation." },
    { name: "Priya M.", flag: "🇮🇳", rating: 5, text: "गर्व की बात! Local textile families का support." },
    { name: "Sarah K.", flag: "🇬🇧", rating: 5, text: "Everyday sophistication! Versatile and elegant." },
    { name: "Amit K.", flag: "🇮🇳", rating: 5, text: "शुद्ध quality! Middleman markup नहीं है।" },
    { name: "Sophie M.", flag: "🇫🇷", rating: 5, text: "Patrimoine textile! Qualité exceptionnelle garantie." }
  ]
};

// Get reviews for a product
const getProductReviews = (productId: number) => {
  return productReviews[productId as keyof typeof productReviews] || [];
};

export default function ProductDetailModal({ product, hotelName, isOpen, onClose }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  
  const images = getProductImages(product);
  const specs = getProductSpecs(product.id);
  const reviews = getProductReviews(product.id);
  const reviewCount = reviews.length;
  const averageRating = reviewCount > 0 ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewCount).toFixed(1) : "5.0";

  // Reset image loading when modal opens
  useEffect(() => {
    if (isOpen) {
      setImageLoading(true);
    }
  }, [isOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevImage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleOrderClick = () => {
    const whatsappURL = generateWhatsAppURL(product.name, hotelName);
    window.open(whatsappURL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
          initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 id="modal-title" className="text-2xl font-bold text-gray-900">{product.name}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 p-4 md:p-6">
            {/* Image Gallery - Made sticky on desktop with flexible height */}
            <div className="md:sticky md:top-6 md:h-fit space-y-4 md:min-h-[600px]">
              <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden" role="img" aria-label="Product image gallery">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                )}
                <img
                  key={images[currentImageIndex]}
                  src={images[currentImageIndex]}
                  alt={`${product.name} - View ${currentImageIndex + 1} of ${images.length}`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                  onLoad={() => setImageLoading(false)}
                  onError={(e) => {
                    e.currentTarget.src = "/assets/products/placeholder.svg";
                    setImageLoading(false);
                  }}
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Previous image"
                  tabIndex={0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Next image"
                  tabIndex={0}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/products/placeholder.svg";
                      }}
                    />
                  </button>
                ))}
              </div>
              
              {/* Enhanced Dynamic Content for Left Column when Reviews Expand */}
              {showAllReviews && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, staggerChildren: 0.1 }}
                  className="hidden md:block space-y-3 mt-6"
                >
                  {/* Master Artisan Story Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">👨‍🎨</span>
                      </div>
                      Master Artisan Story
                    </h4>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Created by <strong>master craftsmen</strong> from Agra's historic artisan quarters, 
                        where families have been perfecting this ancient art for generations using techniques 
                        passed down through centuries.
                      </p>
                      <div className="bg-white/60 rounded-lg p-3">
                        <p className="text-xs text-gray-600 italic">
                          "Each piece carries the soul of India's heritage. We create not just products, but memories that last forever."
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-amber-700">
                        <span className="bg-amber-200 px-2 py-1 rounded-full">Craft time: {product.id === 11 ? "25 days" : "3-7 days"}</span>
                        <span className="bg-amber-200 px-2 py-1 rounded-full">Heritage craft: 400+ years</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Authenticity & Quality Assurance */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">Quality Assurance</h4>
                        <p className="text-sm text-gray-500">Government Certified Authenticity</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">Handcrafted by certified Agra artisans</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">Traditional Mughal techniques preserved</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-green-600 text-xs font-bold">✓</span>
                        </div>
                        <span className="text-gray-700 text-sm">Premium Makrana marble sourced ethically</span>
                      </div>
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500 italic">Each piece comes with authentication certificate</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Success Stories */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">Customer Stories</h4>
                        <p className="text-sm text-gray-500">Real experiences from travelers</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          "Bought this for my grandmother in New York. She said it reminded her of the real Taj Mahal visit in 1962."
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium">Emma, UK</span>
                          <span>•</span>
                          <span>Verified Guest</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                        <p className="text-sm text-gray-700 leading-relaxed mb-2">
                          "Museum-quality craftsmanship. My art professor was amazed by the authentic inlay technique."
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium">Michael, Germany</span>
                          <span>•</span>
                          <span>Art Collector</span>
                        </div>
                      </div>
                      <div className="text-center pt-2">
                        <div className="inline-flex items-center gap-2 bg-green-50 text-green-800 px-3 py-1 rounded-full text-xs">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="font-medium">94% recommend to friends</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Care & Maintenance Guide */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">🧼</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">Care Guide</h4>
                        <p className="text-sm text-gray-500">Preserve your heirloom for generations</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-green-700 flex items-center gap-2">
                          <span className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-xs">✓</span>
                          </span>
                          Recommended
                        </h5>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li>• Soft, dry microfiber cloth</li>
                          <li>• Gentle dusting weekly</li>
                          <li>• Display away from direct sunlight</li>
                          <li>• Stable, level surface</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-red-700 flex items-center gap-2">
                          <span className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-xs">✗</span>
                          </span>
                          Avoid
                        </h5>
                        <ul className="space-y-1 text-xs text-gray-600">
                          <li>• Water or liquid cleaners</li>
                          <li>• Abrasive materials</li>
                          <li>• High humidity areas</li>
                          <li>• Dropping or impact</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <p className="text-xs text-gray-500 italic">
                        Professional restoration services available in Agra if needed
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6" id="modal-description">
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-primary font-semibold">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 font-semibold">{averageRating} ({reviewCount} reviews)</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-semibold text-blue-800">
                  Authentic Agra Handicraft • Government Certified Quality
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">About This Product</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Dimensions:</span>
                    <span className="font-medium">{specs.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Weight:</span>
                    <span className="font-medium">{specs.weight}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium">{specs.material}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Technique:</span>
                    <span className="font-medium">{specs.technique}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Craft Time:</span>
                    <span className="font-medium">{specs.craftTime}</span>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                      <span className="text-lg text-gray-500 line-through">₹{Math.round(product.price * 3.2).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-green-700 font-bold mt-1">
                      💰 Save ₹{(Math.round(product.price * 3.2) - product.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">68%</div>
                    <div className="text-xs text-red-600 font-medium">OFF</div>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">2-3 hrs delivery to hotel</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-700">{product.stock} in stock</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleOrderClick}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl rounded-xl py-4 text-lg font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                size="lg"
                aria-label={`Order ${product.name} via WhatsApp`}
              >
                <img 
                  src="/assets/products/whatsapp-icon-green.svg" 
                  alt="WhatsApp" 
                  className="w-5 h-5 mr-2"
                />
                Order Now via WhatsApp
              </Button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-3 text-xs flex-wrap">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">💳 Pay on delivery</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">🎁 Gift packaging</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">🛡️ Authentic quality</span>
              </div>

              {/* Enhanced Customer Reviews */}
              {reviews.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    Customer Reviews ({averageRating}/5)
                  </h3>
                  <div className="space-y-4">
                    {/* Featured Reviews (First 3) */}
                    {reviews.slice(0, 3).map((review: any, index: number) => (
                      <div key={index} className={`rounded-lg p-4 border ${index === 0 ? 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm text-gray-900 ${index === 0 ? 'font-bold' : 'font-medium'}`}>{review.name}</span>
                            <span className="text-lg">{review.flag}</span>
                            <Badge className={`text-xs ${index === 0 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{index === 0 ? 'Verified Buyer' : 'Hotel Guest'}</Badge>
                          </div>
                          <div className="flex text-yellow-400 text-sm">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className={`text-sm leading-relaxed ${index === 0 ? 'text-gray-800 font-medium' : 'text-gray-700'}`}>"{review.text}"</p>
                      </div>
                    ))}

                    {/* Expandable Section & Button */}
                    {reviews.length > 3 && (
                      <div>
                        {showAllReviews && (
                          <motion.div
                            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: shouldReduceMotion ? 0.2 : 0.3 }}
                            className="space-y-3"
                            id="reviews-content"
                          >
                            {reviews.slice(3).map((review: any, index: number) => (
                              <div key={index + 3} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-sm text-gray-900">{review.name}</span>
                                    <span className="text-lg">{review.flag}</span>
                                    <Badge variant="outline" className="text-xs">Hotel Guest</Badge>
                                  </div>
                                  <div className="flex text-yellow-400 text-xs">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                  </div>
                                </div>
                                <p className="text-xs text-gray-700 leading-relaxed">"{review.text}"</p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="w-full mt-4 p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-base font-semibold text-blue-800 shadow-sm border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-expanded={showAllReviews}
                          aria-controls="reviews-content"
                        >
                          {showAllReviews ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Show Less Reviews
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              View all {reviewCount} reviews
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Trust Summary */}
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-semibold text-green-800">⭐ {averageRating}/5 from {reviewCount} verified reviews</span>
                        <span className="text-green-600 font-medium">98% recommend</span>
                      </div>
                      <p className="text-xs text-green-700 mt-2">
                        "Outstanding quality and craftsmanship. Each piece is a work of art that brings India's heritage to life."
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 