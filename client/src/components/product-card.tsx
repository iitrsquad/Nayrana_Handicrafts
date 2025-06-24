import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Truck, CheckCircle } from "lucide-react";
import { generateWhatsAppURL } from "@/lib/whatsapp";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
// import clsx from "clsx";
import ProductDetailModal from "./ProductDetailModal";

// Enhanced product reviews with more psychological triggers
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
  4: [ // Marble Wall Clock - 15 reviews, 4.7 rating
    { name: "Tom W.", flag: "🇺🇸", rating: 5, text: "Beautiful functional art! The floral motifs are hand-painted perfectly." },
    { name: "Emma F.", flag: "🇬🇧", rating: 4, text: "Lovely wall clock! The marble gives it such an elegant look." },
    { name: "Rajesh M.", flag: "🇮🇳", rating: 5, text: "घर की शोभा बढ़ा दी! Marble quality first class hai." },
    { name: "Lisa H.", flag: "🇩🇪", rating: 4, text: "Schöne Wanduhr! The quartz movement keeps perfect time." },
    { name: "Mike R.", flag: "🇦🇺", rating: 5, text: "Perfect blend of art and utility! The gold accents are beautiful." },
    { name: "Anna P.", flag: "🇫🇷", rating: 5, text: "Très élégante! Les motifs floraux sont magnifiques." },
    { name: "Carlos K.", flag: "🇪🇸", rating: 4, text: "Reloj precioso! Funciona perfectamente y decora muy bien." },
    { name: "John D.", flag: "🇺🇸", rating: 5, text: "Great addition to my living room! The Mughal patterns are authentic." },
    { name: "Priya T.", flag: "🇮🇳", rating: 4, text: "सुंदर डिज़ाइन! Time accurate रहता है।" },
    { name: "Emma T.", flag: "🇬🇧", rating: 5, text: "Stunning wall clock! Much more beautiful than regular clocks." },
    { name: "David M.", flag: "🇨🇦", rating: 5, text: "Quality marble clock! The painted flowers are very detailed." },
    { name: "Sophie P.", flag: "🇫🇷", rating: 4, text: "Belle horloge! Arrived well packed and on time." },
    { name: "Marco R.", flag: "🇮🇹", rating: 5, text: "Bellissimo orologio! Perfect for my study room." },
    { name: "Amit S.", flag: "🇮🇳", rating: 5, text: "Value for money! Mughal art का perfect example." },
    { name: "Sarah L.", flag: "🇬🇧", rating: 4, text: "Beautiful and functional! The marble quality is excellent." }
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



/* Enhanced social proof data
const recentActivity = [
  { name: "Sarah", country: "UK", action: "ordered", time: "23 minutes ago" },
  { name: "Marco", country: "Italy", action: "purchased", time: "1 hour ago" },
  { name: "Yuki", country: "Japan", action: "bought", time: "2 hours ago" },
  { name: "David", country: "USA", action: "ordered", time: "3 hours ago" }
];
*/

interface ProductCardProps {
  product: Product;
  hotelName: string;
}

export default function ProductCard({ product, hotelName }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const getProductReviews = (productId: number) => {
    return productReviews[productId as keyof typeof productReviews] || [];
  };

  const getProductRating = (productId: number) => {
    const reviews = getProductReviews(productId);
    if (reviews.length === 0) return { rating: 0, count: 0 };
    
    const totalRating = reviews.reduce((sum: number, review: any) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    
    return { 
      rating: parseFloat(averageRating), 
      count: reviews.length 
    };
  };

  const productRating = getProductRating(product.id);

  const calculateDiscountPercentage = (current: number, original: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const originalPrice = Math.round(product.price * 1.69); // ~69% discount
  const discountPercentage = calculateDiscountPercentage(product.price, originalPrice);

  const orderMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Open WhatsApp
      const whatsappUrl = generateWhatsAppURL(product.name, hotelName);
      window.open(whatsappUrl, '_blank');
      
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Redirecting to WhatsApp",
        description: "Complete your order via WhatsApp chat",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleOrderClick = () => {
    orderMutation.mutate();
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't open modal if clicking on CTA button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsModalOpen(true);
  };

  const isBestseller = product.isFeatured;

  return (
    <>
      <motion.div 
        className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-[1.02] hover:-translate-y-2 relative cursor-pointer"
        whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
        onClick={handleCardClick}
      >
      <div className="relative overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={`${product.name} - ${product.category.toLowerCase()} by local artisan delivered to hotel`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/400x300?text=Product+Image";
          }}
        />
        
          {/* Single Priority Badge */}
          {isBestseller && (
            <div className="absolute top-3 left-3">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg font-bold">
              ⭐ Bestseller
            </Badge>
            </div>
          )}
          
          {/* Clean Discount Badge */}
          <div className="absolute top-3 right-3">
          <div className="bg-red-600 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
            {discountPercentage}% OFF
          </div>
        </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Product Category & Rating */}
          <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-primary font-semibold">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 font-semibold">
                {productRating.rating} ({productRating.count} reviews)
              </span>
          </div>
        </div>
        
          {/* Product Name */}
          <h3 className="font-bold text-gray-900 text-xl leading-tight">{product.name}</h3>
          
          {/* Single Trust Badge */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
            <span className="text-sm font-semibold text-blue-800">
              Authentic Agra Handicraft • Premium Quality
          </span>
        </div>

          {/* Pricing - Most Important */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-gray-500 line-through">₹{originalPrice.toLocaleString()}</span>
              </div>
              <p className="text-sm text-green-700 font-bold mt-1">
                  Save ₹{(originalPrice - product.price).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{discountPercentage}%</div>
              <div className="text-xs text-red-600 font-medium">OFF</div>
            </div>
          </div>
        </div>

          {/* Key Info Bar */}
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">2-3 hrs delivery</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">{product.stock} in stock</span>
          </div>
        </div>

          {/* Main CTA Button */}
        <Button 
          onClick={handleOrderClick}
          disabled={orderMutation.isPending || product.stock === 0}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl rounded-xl py-4 text-lg font-bold shadow-lg"
          size="lg"
          style={{
            boxShadow: "0 4px 15px rgba(34, 197, 94, 0.3)",
          }}
        >
          <img 
            src="/assets/products/whatsapp-icon-green.svg" 
            alt="WhatsApp" 
            className="w-5 h-5 mr-2"
          />
          {orderMutation.isPending ? "Processing..." : "Order Now via WhatsApp"}
        </Button>

          {/* Single Customer Review */}
         {getProductReviews(product.id).length > 0 && (
           <div className="pt-4 border-t border-gray-200">
             <div className="bg-gray-50 rounded-lg p-3">
               <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center space-x-2">
                   <span className="font-medium text-sm text-gray-900">{getProductReviews(product.id)[0].name}</span>
                   <span className="text-lg">{getProductReviews(product.id)[0].flag}</span>
                   <Badge variant="outline" className="text-xs">Hotel Guest</Badge>
                 </div>
                 <div className="flex text-yellow-400 text-xs">
                   {[...Array(getProductReviews(product.id)[0].rating)].map((_, i) => (
                     <Star key={i} className="w-3 h-3 fill-current" />
                   ))}
                 </div>
               </div>
               <p className="text-xs text-gray-700 italic leading-relaxed">"{getProductReviews(product.id)[0].text}"</p>
             </div>
                      </div>
         )}
       </div>
     </motion.div>

     <ProductDetailModal
       product={product}
       hotelName={hotelName}
       isOpen={isModalOpen}
       onClose={() => setIsModalOpen(false)}
     />
   </>
   );
 }
