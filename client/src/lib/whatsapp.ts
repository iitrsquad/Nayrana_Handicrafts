import { APP_CONFIG } from "@/config/constants";

export function generateWhatsAppURL(productName: string, _hotelName?: string): string {
  let message: string;
  
  if (productName === "general inquiry") {
    message = `Hi, I need help with ordering authentic Agra handicrafts with hotel delivery. Can you send me your current catalog and prices?`;
  } else {
    message = `Hi, I'd like to order the ${productName}. Can you send me details, pricing, and delivery information for my hotel in Agra?`;
  }
  
  return `https://wa.me/${APP_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateSupportWhatsAppURL(_hotelName?: string): string {
  return generateWhatsAppURL("general inquiry");
}
