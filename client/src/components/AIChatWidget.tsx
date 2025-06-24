import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface UserContext {
  hasAskedPrices: boolean;
  mentionedProducts: string[];
  showsInterest: boolean;
  isReturning: boolean;
  preferredContact: string;
  trustLevel: 'building' | 'medium' | 'high';
}

// Translation system
const translations = {
  en: {
    title: "Saad - Your Helper",
    status: "Available",
    subtitle: "IIT Student • Fighting Tourist Scams",
    initialMessage: "Hey! 👋 I'm Saad, your local Agra helper. I help tourists find authentic handicrafts at fair prices - no tourist traps, just genuine artisan families. What brings you to Agra? 😊",
    welcomeMessage: "👋 Welcome! I'm Saad, your local Agra helper. I specialize in connecting tourists with authentic artisan families who create genuine handicrafts. I can help you find quality pieces at fair prices and arrange delivery to your hotel. What interests you most? 😊",
    placeholder: "Ask about handicrafts, prices, or anything...",
    verifiedResponse: "Verified Response",
    trustIndicators: "✓ Verified • 89+ Happy Tourists",
    suggestions: {
      weather: "What's the weather like in Agra?",
      food: "Where should I eat?",
      prices: "How much for marble Taj?",
      story: "Tell me about your story"
    }
  },
  es: {
    title: "Saad - Ayudante Local",
    status: "Disponible",
    subtitle: "Estudiante IIT • Misión Anti-Estafa",
    initialMessage: "¡Hola! 👋 Soy Saad, tu ayudante local de Agra. Ayudo a turistas a descubrir artesanías auténticas a precios justos a través de mi red de familias artesanas verificadas. ¿Cómo puedo ayudarte con tu visita hoy? 😊",
    welcomeMessage: "👋 ¡Bienvenido! Soy Saad, tu ayudante local de Agra. Me especializo en conectar turistas con familias artesanas auténticas que crean artesanías genuinas. Puedo ayudarte a encontrar piezas de calidad a precios justos y organizar entrega a tu hotel. ¿Qué te interesa más? 😊",
    placeholder: "Pregunta sobre artesanías, precios, o cualquier cosa...",
    verifiedResponse: "Respuesta Verificada",
    trustIndicators: "✓ Estudiante IIT • 89+ Turistas Felices",
    suggestions: {
      weather: "¿Cómo está el clima en Agra?",
      food: "¿Dónde debería comer?",
      prices: "¿Cuánto cuesta el Taj de mármol?",
      story: "Cuéntame tu historia"
    }
  },
  fr: {
    title: "Saad - Assistant Local",
    status: "Disponible",
    subtitle: "Étudiant IIT • Mission Anti-Arnaque",
    initialMessage: "Bonjour! 👋 Je suis Saad, votre assistant local d'Agra. J'aide les touristes à découvrir l'artisanat authentique à des prix équitables grâce à mon réseau de familles d'artisans vérifiées. Comment puis-je vous aider avec votre visite aujourd'hui? 😊",
    welcomeMessage: "👋 Bienvenue! Je suis Saad, votre assistant local d'Agra. Je me spécialise dans la connexion des touristes avec des familles d'artisans authentiques qui créent de l'artisanat véritable. Je peux vous aider à trouver des pièces de qualité à des prix équitables et organiser la livraison à votre hôtel. Qu'est-ce qui vous intéresse le plus? 😊",
    placeholder: "Demandez sur l'artisanat, les prix, ou n'importe quoi...",
    verifiedResponse: "Réponse Vérifiée",
    trustIndicators: "✓ Étudiant IIT • 89+ Touristes Heureux",
    suggestions: {
      weather: "Quel temps fait-il à Agra?",
      food: "Où devrais-je manger?",
      prices: "Combien pour le Taj en marbre?",
      story: "Raconte-moi ton histoire"
    }
  }
};

const getTranslation = (key: string, language: string = 'en'): string => {
  const keys = key.split('.');
  let value: any = translations[language as keyof typeof translations];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || translations.en[key as keyof typeof translations.en] || key;
};

// Extract user context from conversation
const extractUserContext = (history: Message[]): UserContext => {
  const context: UserContext = {
    hasAskedPrices: false,
    mentionedProducts: [],
    showsInterest: false,
    isReturning: false,
    preferredContact: 'chat',
    trustLevel: 'building'
  };
  
  try {
    history.forEach(msg => {
      if (!msg.isUser) return;
      
      const text = msg.text.toLowerCase();
      
      if (text.includes('price') || text.includes('cost')) context.hasAskedPrices = true;
      if (text.includes('taj mahal')) context.mentionedProducts.push('taj_mahal');
      if (text.includes('elephant')) context.mentionedProducts.push('elephant');
      if (text.includes('great') || text.includes('interested')) context.showsInterest = true;
      if (text.includes('whatsapp')) context.preferredContact = 'whatsapp';
    });
    
    // Determine trust level based on engagement
    if (history.length > 6) context.trustLevel = 'high';
    else if (history.length > 3) context.trustLevel = 'medium';
    
    return context;
  } catch (error) {
    console.error('Context extraction error:', error);
    return context;
  }
};

// All advanced AI response functions have been moved to ai-integration.ts

// This function has been moved to ai-integration.ts for better organization

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [userManuallyClosed, setUserManuallyClosed] = useState(false);
  // const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! 👋 I'm Saad, your local Agra helper and IIT student. I started this mission to help tourists avoid scams by connecting them directly with authentic artisan families - no tourist traps, just genuine handicrafts at fair prices. Ask me about my story! How can I help you discover real Agra today? 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState([
    "What's the weather like in Agra?",
    "Where should I eat?",
    "How much for marble Taj?",
    "Tell me about your story"
  ]);
  // const [showProactiveMessage, setShowProactiveMessage] = useState(false);
  const [hasEngaged, setHasEngaged] = useState(false);
  const [language] = useState('en');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat after user spends time on site (psychological engagement)
  useEffect(() => {
    if (!hasAutoOpened && !userManuallyClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setHasAutoOpened(true);
        
        // Add an engaging welcome message after auto-opening
        setTimeout(() => {
          const welcomeMessage: Message = {
            id: 'auto-welcome',
            text: "👋 Welcome! I'm Saad, your local Agra helper. I specialize in connecting tourists with authentic artisan families who create genuine handicrafts. I can help you find quality pieces at fair prices and arrange delivery to your hotel. What interests you most? 😊",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, welcomeMessage]);
        }, 1500); // Delay for natural conversation flow
      }, 8000); // Auto-open after 8 seconds of browsing

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened, userManuallyClosed]);

  // Proactive conversation triggers - RESPECT USER'S CHOICE TO CLOSE
  useEffect(() => {
    // Only trigger proactive messages if user hasn't manually closed the chat
    if (userManuallyClosed) {
      return; // Don't be annoying - respect user's decision
    }

    // Proactive message when user spends time on product pages
    const productPageTimer = setTimeout(() => {
      if (!isOpen && !userManuallyClosed && window.location.pathname.includes('product')) {
        const proactiveMessage: Message = {
          id: 'proactive-product',
          text: "Hi! 👋 I noticed you're browsing our handicrafts. I'm Saad, your local helper. I can provide detailed information about authenticity, craftsmanship, and arrange hotel delivery. Any questions? 😊",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, proactiveMessage]);
        setIsOpen(true);
      }
    }, 15000); // After 15 seconds on product page

    // Proactive message for price comparison - ONLY if user hasn't closed manually
    const priceTimer = setTimeout(() => {
      if (!isOpen && !userManuallyClosed) {
        const priceMessage: Message = {
          id: 'proactive-price',
          text: "Hello! 💰 I'm Saad, your local Agra helper. I help tourists find authentic handicrafts at transparent prices. Would you like to know about our artisan network and quality guarantee? 😊",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, priceMessage]);
        setIsOpen(true);
      }
    }, 25000); // After 25 seconds

    return () => {
      clearTimeout(productPageTimer);
      clearTimeout(priceTimer);
    };
  }, [isOpen, userManuallyClosed]); // Added userManuallyClosed to dependencies

  // Initialize with single welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'initial',
        text: getTranslation('initialMessage', language),
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
    
    // Clear messages when chat closes to prevent duplicates
    if (!isOpen) {
      setMessages([]);
    }
  }, [isOpen, language]);

  // AI Response Logic - ADVANCED & CONTEXT-AWARE
  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Convert messages to the format expected by the AI integration
      const conversationHistory = messages.map(msg => ({
        text: msg.text,
        isUser: msg.isUser
      }));
      
      // Extract user context
      const userContext = extractUserContext(messages);
      
      // Use the new advanced AI integration
      const { getAdvancedAIResponse } = await import('../lib/ai-integration');
      return await getAdvancedAIResponse(userMessage, conversationHistory, userContext);
    } catch (error) {
      console.error('Advanced AI Error:', error);
      // Fallback to basic response system
      return getBasicAIResponse(userMessage);
    }
  };
  
  // Fallback basic AI response system
  const getBasicAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Avoid repetitive responses - check if this is a follow-up
    const isFollowUp = messages.length > 1;
    
    // Product-related questions
    if (message.includes('taj mahal') || message.includes('marble')) {
      if (isFollowUp) {
        return "Great choice! Our marble Taj Mahal replicas are hand-carved by master artisans whose families have worked on the actual Taj Mahal. Prices start from ₹2,500 for authentic pieces. Would you like me to arrange a viewing at your hotel? 😊";
      }
      return "Ah, the Taj Mahal replicas! 😍 These are my specialty. I work with Rajesh uncle whose grandfather actually worked on the Taj restoration in 1942. His marble inlay work is incredible - tourists often say it's better than what they see in local shops. Want to see some pieces?";
    }
    
    // Price inquiries
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      if (isFollowUp) {
        return "I always give transparent pricing! No hidden costs, no pressure. Marble items: ₹1,500-15,000 depending on size and detail. Wooden crafts: ₹800-5,000. Free hotel delivery included. What specific piece interests you?";
      }
      return "Perfect question! 👍 I believe in transparent pricing - no tourist markup nonsense. My prices are what locals pay plus a small fair margin. For example, a beautiful marble coaster set costs ₹1,500 (shops charge ₹4,000+). What are you looking for?";
    }
    
    // General greetings - avoid repeating the same welcome
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      if (isFollowUp) {
        return "Hey again! 😊 How can I help you find the perfect authentic piece for your trip?";
      }
      // This should rarely trigger since we have initial message
      return "Hey there! 👋 Ready to discover some amazing authentic handicrafts? I've got some incredible pieces from local artisan families!";
    }
    
    // Default response for other messages
    if (isFollowUp) {
      return "That's interesting! I love chatting with travelers. 😊 Whether it's about handicrafts, Agra tips, or just life - I'm here to help. What would you like to know?";
    }
    
    return "I'd love to help with that! 😊 I'm here to assist with authentic handicrafts, fair pricing, or any questions about Agra. What interests you most?";
  };

  // Emotional Intelligence - Detect user sentiment
  const detectSentiment = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Frustration indicators
    if (lowerMessage.includes('expensive') || lowerMessage.includes('scam') || lowerMessage.includes('cheated') || lowerMessage.includes('ripped off') || lowerMessage.includes('overpriced')) {
      return 'frustrated';
    }
    
    // Excitement indicators
    if (lowerMessage.includes('amazing') || lowerMessage.includes('love') || lowerMessage.includes('beautiful') || lowerMessage.includes('excited') || lowerMessage.includes('wow')) {
      return 'excited';
    }
    
    // Confusion indicators
    if (lowerMessage.includes('confused') || lowerMessage.includes('don\'t understand') || lowerMessage.includes('what do you mean') || lowerMessage.includes('explain')) {
      return 'confused';
    }
    
    // Skeptical indicators
    if (lowerMessage.includes('really?') || lowerMessage.includes('sure?') || lowerMessage.includes('doubt') || lowerMessage.includes('believe')) {
      return 'skeptical';
    }
    
    return 'neutral';
  };

  // Enhanced AI Response with Emotional Intelligence
  const getEmotionalResponse = async (userMessage: string, sentiment: string): Promise<string> => {
    const baseResponse = await getAIResponse(userMessage);
    
    // Add emotional context to responses
    switch (sentiment) {
      case 'frustrated':
        return "I can hear the frustration in your message, and honestly, I don't blame you! 😤 " + baseResponse;
      
      case 'excited':
        return "I love your enthusiasm! 🔥 " + baseResponse;
      
      case 'confused':
        return "No worries, let me break this down super simply! 🤔 " + baseResponse;
      
      case 'skeptical':
        return "I totally get the skepticism - you've probably heard too many sales pitches already! 😅 " + baseResponse;
      
      default:
        return baseResponse;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const sentiment = detectSentiment(inputText);
      const responseText = await getEmotionalResponse(inputText, sentiment);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Update suggested questions based on conversation
      if (sentiment === 'frustrated') {
        setSuggestedQuestions([
          "How can I avoid tourist traps?",
          "What are fair prices?",
          "Show me authentic pieces",
          "Can I trust you?"
        ]);
      } else if (sentiment === 'excited') {
        setSuggestedQuestions([
          "Show me your best pieces!",
          "When can you deliver?",
          "What's your WhatsApp?",
          "Tell me more stories!"
        ]);
      }
    }, 1000 + Math.random() * 1000); // 1-2 second delay for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    setTimeout(async () => {
      const response = await getAIResponse(suggestion);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  // const getSuggestionButtons = () => {
  //   const suggestions = translations[language as keyof typeof translations]?.suggestions || translations.en.suggestions;
  //   return Object.values(suggestions);
  // };

  return (
    <>
      {/* 🎯 ENHANCED Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-40 sm:bottom-4 sm:right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          onClick={() => {
            setIsOpen(!isOpen);
            if (!hasEngaged) {
              setHasEngaged(true);
            }
            // Reset manual close flag when user manually opens chat
            if (!isOpen) {
              setUserManuallyClosed(false);
            }
          }}
          className="relative w-16 h-16 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full shadow-2xl cursor-pointer flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 border-4 border-white"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
              <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full relative"
              >
                <img 
                  src="/profile-photo (1).png" 
                  alt="Saad - Your Local Helper"
                  className="w-full h-full object-cover rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🎯 SIMPLE GREEN ONLINE DOT */}
        {!isOpen && (
          <motion.div
            className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
          </motion.div>
        )}

        {/* Attention-grabbing pulse for new visitors */}
        {!hasAutoOpened && !isOpen && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-indigo-400"
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 2.5,
              ease: "easeInOut"
            }}
          />
        )}
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 md:w-[400px] h-[600px] md:h-[650px] lg:w-[420px] lg:h-[680px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)] sm:bottom-20 sm:right-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Professional Header - Streamlined & Trust-Focused */}
            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 text-white p-4 flex items-center justify-between shadow-lg">
               <div className="flex items-center gap-3 flex-1 min-w-0">
                 {/* Professional Avatar */}
                 <div className="relative flex-shrink-0">
                   <div className="w-12 h-12 rounded-full overflow-hidden shadow-md border-2 border-white/20">
                     <img 
                       src="/profile-photo (1).png" 
                       alt="Saad - Your Local Guide"
                       className="w-full h-full object-cover"
                     />
                   </div>
                   {/* Enhanced Online Indicator */}
                   <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-sm">
                     <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                   </div>
                 </div>
                 
                 <div className="flex-1 min-w-0">
                   {/* 🎯 OPTIMIZED: Clean hierarchy with single focus */}
                   <div className="flex items-center gap-2 mb-1">
                     <h3 className="font-bold text-lg text-white">Saad</h3>
                     <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full font-bold flex items-center gap-1">
                       <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                       LIVE
                     </span>
                   </div>
                   
                   {/* 🎯 SINGLE POWERFUL TRUST LINE */}
                   <div className="text-sm text-blue-100 font-medium">
                     IIT Student • Fighting Tourist Scams • 89+ Happy Customers
                   </div>
                 </div>
               </div>
               
               {/* 🎯 ULTRA-MINIMAL Controls */}
               <div className="flex items-center gap-2 flex-shrink-0">
                 <Button
                   onClick={() => {
                     setIsOpen(false);
                     setUserManuallyClosed(true);
                   }}
                   size="sm"
                   variant="ghost"
                   className="text-white hover:bg-white/10 p-1.5 h-8 w-8 rounded-full"
                 >
                   <X className="w-4 h-4" />
                 </Button>
               </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                      : 'bg-gray-50 text-gray-800 border border-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    {!message.isUser && (
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                          {getTranslation('verifiedResponse', language)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                    {message.isUser && (
                      <span className="text-xs opacity-70 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {/* Suggested Questions */}
              {!isTyping && messages.length > 1 && (
                <motion.div
                  className="flex flex-wrap gap-2 mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(question)}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </motion.div>
              )}
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-gray-100 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* 🎯 CONVERSION-FOCUSED Quick Actions */}
              {messages.length === 1 && (
                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200 shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <div className="text-center mb-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3">🎯 I Help Tourists With</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                      <div className="flex items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
                        <span>🏛️</span>
                        <span className="text-gray-700 font-medium">Authentic Crafts</span>
                      </div>
                      <div className="flex items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
                        <span>💰</span>
                        <span className="text-gray-700 font-medium">Fair Prices</span>
                      </div>
                      <div className="flex items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
                        <span>🚚</span>
                        <span className="text-gray-700 font-medium">Hotel Delivery</span>
                      </div>
                      <div className="flex items-center gap-1 p-2 bg-white rounded-lg shadow-sm">
                        <span>🛡️</span>
                        <span className="text-gray-700 font-medium">Zero Scams</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 🎯 SINGLE PROMINENT CTA */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSuggestionClick("What's your WhatsApp number for instant help?")}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white text-base py-4 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center gap-3 font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                    >
                      <span className="text-xl">📱</span>
                      <span>Get WhatsApp Number (Instant Response)</span>
                    </button>
                    
                    {/* 🎯 SIMPLIFIED SECONDARY ACTIONS */}
                    <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => handleSuggestionClick("Show me authentic product prices")}
                        className="bg-blue-500 text-white text-sm py-3 px-4 rounded-xl hover:bg-blue-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg"
                    >
                      <span>💰</span>
                        <span>View Prices</span>
                    </button>
                    <button
                        onClick={() => handleSuggestionClick("How can I verify you're authentic?")}
                        className="bg-purple-500 text-white text-sm py-3 px-4 rounded-xl hover:bg-purple-600 transition-all duration-200 flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg"
                    >
                      <span>✅</span>
                        <span>Verify Me</span>
                    </button>
                    </div>
                  </div>
                  
                  {/* 🎯 TRUST & URGENCY INDICATOR */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-full text-sm font-medium border border-amber-200">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                      <span>⚡ Available now • Avg response: 2 minutes</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Trust Indicators */}
              {messages.length > 2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 py-2 bg-blue-50 border-t border-gray-200"
                >
                  <div className="flex items-center gap-2 text-xs text-blue-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{getTranslation('trustIndicators', language)}</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getTranslation('placeholder', language)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget; 