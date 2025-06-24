import type { Product } from "@shared/schema";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Marble Taj Mahal Replica",
    description: "Exquisite handcrafted marble replica of the iconic Taj Mahal. Perfect souvenir featuring intricate inlay work and authentic Agra craftsmanship. Made by 3rd generation marble craftsman Rajesh Kumar.",
    price: 2499,
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=400&fit=crop",
    imageUrls: null,
    category: "Marble",
    stock: 2,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Wooden Elephant Pair",
    description: "Beautiful hand-carved wooden elephant pair symbolizing good luck and prosperity. Made from premium rosewood with intricate detailing. Recommended by Taj Hotel concierge team.",
    price: 1799,
    imageUrl: "/assets/products/marble-elephant-pair-inlay.png",
    imageUrls: null,
    category: "Wood",
    stock: 4,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: 3,
    name: "Pure Pashmina Shawl",
    description: "Authentic Kashmiri pashmina shawl with traditional embroidery. Soft, warm, and luxurious - perfect for any occasion. Hotel guests exclusive item.",
    price: 3199,
    imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    imageUrls: null,
    category: "Textile",
    stock: 1,
    isFeatured: true,
    createdAt: new Date()
  },
  {
    id: 4,
    name: "Marble Decorative Plate with Blue Floral Inlay",
    description: "Authentic Pietra Dura marble plate featuring genuine blue lapis lazuli floral inlay. Each petal is individually hand-cut from real marble stones - not painted! Traditional Mughal technique preserved by master artisans. Perfect wall art centerpiece.",
    price: 1199,
    imageUrl: "/assets/products/marble-floral-tray.png",
    imageUrls: JSON.stringify([
      "/assets/products/marble-floral-tray2.png",
      "/assets/products/marble-floral-tray3.png",
      "/assets/products/marble-floral-tray5.png"
    ]),
    category: "Marble",
    stock: 7,
    isFeatured: false,
    createdAt: new Date()
  },
  {
    id: 5,
    name: "Brass Decorative Plate",
    description: "Ornate brass plate with traditional Mughal patterns. Perfect for decoration or serving special occasions. Handcrafted using 400-year-old techniques.",
    price: 1499,
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=400&fit=crop",
    imageUrls: null,
    category: "Brass",
    stock: 5,
    isFeatured: false,
    createdAt: new Date()
  },
  {
    id: 6,
    name: "Leather Camel Bag",
    description: "Handcrafted leather bag with traditional camel motifs. Spacious and durable, perfect for travel or daily use. Exclusive design not found in tourist markets.",
    price: 2199,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    imageUrls: null,
    category: "Leather",
    stock: 3,
    isFeatured: false,
    createdAt: new Date()
  }
]; 