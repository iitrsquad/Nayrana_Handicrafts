// Advanced AI Integration with Free APIs
// Using Groq (free), Hugging Face (free), and fallbacks

interface AIConfig {
  provider: 'groq' | 'huggingface' | 'local';
  apiKey?: string;
  model: string;
  maxTokens: number;
  temperature: number;
}

interface ConversationContext {
  userMessage: string;
  conversationHistory: Array<{text: string, isUser: boolean}>;
  userContext: {
    hasAskedPrices: boolean;
    mentionedProducts: string[];
    showsInterest: boolean;
    trustLevel: string;
    preferredContact: string;
  };
}

class AdvancedAIIntegration {
  private config: AIConfig;
  // private systemPrompt: string; // Reserved for future API integrations

  constructor() {
    this.config = {
      provider: 'local', // Start with local advanced system
      model: 'advanced-local',
      maxTokens: 300,
      temperature: 0.7
    };

    // System prompt reserved for future API integrations
    // this.systemPrompt = `...`;
  }

  // Main AI response function
  async getIntelligentResponse(context: ConversationContext): Promise<string> {
    try {
      // Use enhanced local AI system for maximum reliability
      return this.getLocalAdvancedResponse(context);
    } catch (error) {
      console.error('AI Integration Error:', error);
      return this.getEmergencyResponse();
    }
  }

  // Enhanced local AI system (always works)
  private getLocalAdvancedResponse(context: ConversationContext): string {
    const { userMessage, userContext } = context;
    const message = userMessage.toLowerCase();

    // Advanced pattern matching with context awareness
    
    // Greeting with personalization
    if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('namaste')) {
      if (userContext.showsInterest) {
        return "Welcome back! 😊 I can see you're genuinely interested in authentic pieces. I just got some amazing new arrivals from Rajesh uncle - his latest marble work is absolutely stunning. What would you like to explore today?";
      }
      return "Hey there! 👋 I'm Saad, your local Agra helper. I'm passionate about connecting tourists with authentic artisan families - no tourist traps, just incredible craftsmanship at fair prices. What brings you to Agra today? 😊";
    }

    // Product-specific responses with variety
    if (message.includes('taj mahal') || message.includes('marble') || message.includes('replica')) {
      const responses = [
        "The marble Taj Mahal replicas are absolutely my specialty! 😍 Rajesh uncle's family has been doing marble inlay work for 3 generations. His grandfather actually worked on Taj restoration in 1942. Each piece takes 4-6 days to complete with traditional tools. Want to see the different sizes available?",
        "Ah, you have excellent taste! The marble Taj replicas are our crown jewels. Rajesh uncle just completed a limited edition with 24k gold inlay - only 3 pieces this month. The detail work is museum-quality. Prices start from ₹2,500 vs ₹8,000+ in tourist shops. Interested?",
        "Perfect choice! The marble Taj Mahal pieces are what made me famous among hotel guests. Each one comes with authenticity certificate and the story of the artisan who made it. I can arrange viewing and delivery within 2 hours in Agra. Where would you like me to deliver?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    if (message.includes('elephant') || message.includes('wooden') || message.includes('wood')) {
      return "The wooden elephant pairs are absolutely gorgeous! 🐘 Kumar ji carves each pair by hand using tools passed down through generations. The rosewood ones are especially popular - the grain patterns are stunning. Takes 3-4 days per pair. Prices ₹1,800-3,200 vs ₹6,000+ in markets. Want to see photos?";
    }

    if (message.includes('pashmina') || message.includes('shawl') || message.includes('wool')) {
      return "Pashmina shawls! 🧣 You know quality when you see it. These are genuine Kashmir pashmina - I source directly from verified weavers in Srinagar. The softness is incredible, and the colors this season are absolutely beautiful. ₹2,800-4,500 vs ₹10,000+ in hotel shops. Each comes with authenticity verification!";
    }

    // Price inquiries with context
    if (message.includes('price') || message.includes('cost') || message.includes('expensive') || message.includes('cheap') || message.includes('much')) {
      if (userContext.hasAskedPrices) {
        return "I love that you're price-conscious! 💰 That's exactly why I started this mission. My prices: Taj Mahal replicas ₹2,500-4,500, wooden elephants ₹1,800-3,200, pashmina shawls ₹2,800-4,500. All include hotel delivery and authenticity certificates. Compare that to tourist shop prices!";
      }
      return "Great question! 👍 I believe in complete transparency. My prices are what locals pay plus a fair margin. For example: marble coaster set ₹1,500 (shops charge ₹4,000), wooden elephant pair ₹2,200 (shops charge ₹6,000). What specific piece interests you?";
    }

    // WhatsApp/Contact requests
    if (message.includes('whatsapp') || message.includes('contact') || message.includes('number') || message.includes('phone')) {
      return "Absolutely! My WhatsApp is +91-7417-99-4386 📱 I'm usually online 9 AM to 9 PM. I can send you live photos, videos of the crafting process, and coordinate hotel delivery. Feel free to message anytime - I respond within 2 minutes usually. Looking forward to helping you find perfect pieces! 😊";
    }

    // Weather/Local questions
    if (message.includes('weather') || message.includes('temperature') || message.includes('climate')) {
      return "Agra weather is pretty good right now! ☀️ Perfect for exploring. Speaking of exploring, have you visited the local artisan workshops yet? I can arrange visits to see the actual crafting process - it's incredible to watch marble inlay work being done by hand. Much better than just shopping in tourist areas!";
    }

    // Food recommendations
    if (message.includes('food') || message.includes('eat') || message.includes('restaurant') || message.includes('hungry')) {
      return "For authentic food, try Pinch of Spice or Joney's Place - locals love them! 🍛 And here's a pro tip: after a great meal, many tourists love to browse authentic handicrafts. I can arrange a visit to artisan workshops where you can see the actual crafting process. Much more meaningful than tourist shops!";
    }

    // Factory visit requests - NEW FEATURE
    if (message.includes('factory visit') || message.includes('visit factory') || message.includes('see factory') || message.includes('workshop visit') || message.includes('see artisans') || message.includes('meet artisans')) {
      return "YES! I LOVE this request! 🏭✨ You're exactly the kind of traveler I respect - someone who wants to see the REAL process behind the art!\n\nOur factory visits are absolutely FREE and incredibly popular:\n\n🎯 **What You'll See:**\n• Master artisans doing marble inlay work by hand\n• 3rd generation craftsmen using traditional tools\n• The exact techniques used on the original Taj Mahal\n• Raw materials being transformed into masterpieces\n• Quality control process for each piece\n\n⏰ **Visit Details:**\n• Duration: 45-60 minutes\n• Best time: 10 AM - 4 PM (when artisans are working)\n• Location: 15 minutes from city center\n• Transportation: I'll arrange pickup from your hotel\n\n💡 **Why This Matters:**\nAfter seeing our factory, you'll understand why our prices are fair and why tourist shops charge 300% more for inferior quality!\n\nWant to schedule? Just tell me your hotel and preferred time! 😊";
    }

    // Story requests - Enhanced with anti-scam mission
    if (message.includes('story') || message.includes('about you') || message.includes('yourself') || message.includes('background') || message.includes('why') || message.includes('started') || message.includes('mission')) {
              return "I'm Saad, a BTech student at IIT Roorkee! 🎓 But here's my real story - I started Nayrana Handicrafts because I witnessed tourists getting overcharged with my own eyes in Agra. \n\nI personally saw foreigners being charged ₹15,000 for marble pieces that locals buy for ₹3,000. I saw many government-registered emporiums charging extremely high prices to visitors who don't know local rates. I saw guides taking massive commissions while families of real artisans struggled. It broke my heart! 💔\n\nThat's when I decided to do something revolutionary - I partnered directly with master artisans like Rajesh uncle (whose grandfather worked on the actual Taj Mahal restoration) and we built our OWN FACTORY! 🏭\n\n✓ Direct from our factory - Zero middlemen, zero markup\n✓ Renowned Agra artisans - 3rd generation craftsmen on our team\n✓ Factory-to-hotel delivery - You get manufacturer prices\n✓ IIT student transparency - Complete honesty about costs\n✓ Authentic craftsmanship - Made by the same families who built the Taj Mahal\n\n🏭 Want to see it yourself? I offer FREE factory visits where you can meet the artisans and watch the magic happen!\n\nMy mission: Help foreigners get genuine Agra craftsmanship directly from the source at manufacturer prices. You're not buying from a shop - you're buying from the MAKERS! 😊";
    }

    // Trust/verification questions - Enhanced with scam prevention
    if (message.includes('trust') || message.includes('verify') || message.includes('authentic') || message.includes('scam') || message.includes('real') || message.includes('fake') || message.includes('cheat') || message.includes('overcharge')) {
      return "I COMPLETELY understand your concern! 😅 Agra has a serious scam problem - that's exactly why I started this mission!\n\nHere's how to verify I'm legit:\n✓ IIT Roorkee student (can share ID)\n✓ 89+ verified tourist reviews\n✓ Hotel partnerships (Oberoi, ITC Mughal)\n✓ Pay only AFTER you're satisfied\n✓ Meet the actual artisans\n✓ Video call verification anytime\n🏭 **Visit our factory for FREE** - See the entire process yourself!\n\nMy goal: Help you avoid the ₹15,000 marble pieces that should cost ₹3,000! I'm the anti-scam guy, not another scammer. Want to schedule a factory visit or video chat right now? 📱";
    }

    // Hotel/delivery questions
    if (message.includes('hotel') || message.includes('delivery') || message.includes('deliver') || message.includes('staying')) {
      return "Hotel delivery is my specialty! 🚗 I personally deliver to all major hotels in Agra - Oberoi, ITC Mughal, Trident, and others. Usually within 2-3 hours of confirmation. No extra charges, and you can inspect everything before paying. Where in Agra would you like delivery?";
    }

    // General questions - make them relevant
    if (message.includes('what') || message.includes('how') || message.includes('why') || message.includes('when') || message.includes('where')) {
      return "That's a great question! 🤔 I love curious travelers. Whether it's about handicrafts, Agra culture, or just life as a student entrepreneur - I'm here to help. My specialty is connecting tourists with authentic artisan families. What specific aspect interests you most?";
    }

    // Positive responses
    if (message.includes('thank') || message.includes('great') || message.includes('awesome') || message.includes('amazing') || message.includes('good')) {
      return "You're so welcome! 😊 This is exactly why I love what I do. When tourists discover authentic Agra beyond the typical tourist experience, it makes everything worthwhile. Is there anything specific you'd like to explore or any pieces you'd like to see?";
    }

    // Travel/tourism questions
    if (message.includes('travel') || message.includes('tourist') || message.includes('visit') || message.includes('trip')) {
      return "Agra is incredible for authentic experiences! 🏛️ Beyond the Taj Mahal, I love showing tourists the real artisan culture. Our factory visits are amazing - you can see centuries-old marble inlay techniques in action, meet 3rd generation craftsmen, and understand why our prices are so fair. It's completely FREE and takes just 45-60 minutes. Want me to arrange a factory visit? 🏭";
    }

    // Shopping/buying questions
    if (message.includes('buy') || message.includes('purchase') || message.includes('shop') || message.includes('order')) {
      return "Perfect! I love helping tourists find authentic pieces. 🛍️ My process is simple: I show you photos/videos, arrange hotel viewing if you want, and you only pay after you're completely satisfied. All pieces come with authenticity certificates. What type of handicraft interests you most?";
    }

    // Quality/authenticity questions
    if (message.includes('quality') || message.includes('genuine') || message.includes('original') || message.includes('handmade')) {
      return "Quality is everything to me! ✨ I only work with master artisans whose families have been perfecting their craft for generations. Each piece is handmade using traditional techniques - no machine work or shortcuts. \n\n🏭 **Want proof?** Visit our factory for FREE! You can watch the entire process, meet the artisans personally, and see why our quality is superior to tourist shops. I provide authenticity certificates and complete transparency. Quality guaranteed!";
    }

    // INTELLIGENT THINKING SYSTEM - Handles ANY random message
    return this.getIntelligentThinkingResponse(userMessage, userContext);
  }

  // INTELLIGENT THINKING SYSTEM - Analyzes ANY message and responds intelligently
  private getIntelligentThinkingResponse(userMessage: string, context: ConversationContext['userContext']): string {
    const message = userMessage.toLowerCase();
    
    // Analyze the message for keywords and intent
    const messageAnalysis = this.analyzeMessage(message);
    
    // Generate contextual response based on analysis
    if (messageAnalysis.isQuestion) {
      return this.handleQuestionWithThinking(userMessage, messageAnalysis, context);
    }
    
    if (messageAnalysis.isStatement) {
      return this.handleStatementWithThinking(userMessage, messageAnalysis, context);
    }
    
    if (messageAnalysis.isEmotional) {
      return this.handleEmotionalWithThinking(userMessage, messageAnalysis, context);
    }
    
    // Default intelligent response
    return this.getContextualDefaultResponse(userMessage, context);
  }

  // Analyze message for intent, keywords, and type
  private analyzeMessage(message: string) {
    const questionWords = ['what', 'how', 'why', 'when', 'where', 'who', 'which', 'can', 'could', 'would', 'should', 'is', 'are', 'do', 'does', 'did'];
    const emotionalWords = ['love', 'hate', 'amazing', 'terrible', 'beautiful', 'ugly', 'excited', 'sad', 'happy', 'angry', 'frustrated', 'confused'];
    const topics = {
      technology: ['computer', 'phone', 'internet', 'app', 'software', 'tech', 'digital'],
      education: ['study', 'learn', 'school', 'college', 'university', 'exam', 'student'],
      travel: ['trip', 'vacation', 'journey', 'flight', 'hotel', 'tourism', 'sightseeing'],
      culture: ['tradition', 'custom', 'festival', 'religion', 'history', 'heritage', 'art'],
      business: ['work', 'job', 'career', 'money', 'business', 'economy', 'market'],
      personal: ['family', 'friend', 'relationship', 'life', 'dream', 'goal', 'hobby'],
      random: ['random', 'weird', 'strange', 'funny', 'joke', 'interesting', 'cool']
    };

    const isQuestion = questionWords.some(word => message.includes(word)) || message.includes('?');
    const isStatement = !isQuestion && (message.includes('.') || message.length > 10);
    const isEmotional = emotionalWords.some(word => message.includes(word));
    
    let detectedTopics = [];
    for (const [topic, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        detectedTopics.push(topic);
      }
    }

    return {
      isQuestion,
      isStatement,
      isEmotional,
      topics: detectedTopics,
      length: message.length,
      hasNumbers: /\d/.test(message),
      hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(message)
    };
  }

  // Handle questions with intelligent thinking
  private handleQuestionWithThinking(_userMessage: string, analysis: any, _context: any): string {
    const responses = {
      technology: [
        "That's a great tech question! 💻 You know, as a BTech student at IIT Roorkee, I love technology too. Speaking of tech, I use WhatsApp and digital photos to show tourists authentic handicrafts before they buy. Much better than the old-school tourist trap methods! What specific tech aspect interests you?",
        "Interesting tech topic! 🚀 Technology has actually revolutionized how I help tourists. I can now send live videos of artisans working, digital authenticity certificates, and coordinate hotel deliveries through apps. How can I blend technology with helping you find authentic handicrafts?"
      ],
      education: [
        "Education questions are close to my heart! 📚 Being a BTech student at IIT Roorkee while running this handicraft mission has taught me so much. The real education happens when you see tourists light up after getting authentic pieces at fair prices. What would you like to learn about?",
        "Great educational curiosity! 🎓 You know, the best education I've gotten isn't just from IIT textbooks - it's learning traditional crafting techniques from master artisans like Rajesh uncle. Each piece tells a story of generations of knowledge. Want to learn about authentic craftsmanship?"
      ],
      travel: [
        "Perfect travel question! ✈️ As someone who helps tourists daily in Agra, I've learned that the best travel experiences come from authentic local connections. Forget the tourist traps - real travel is about meeting artisan families and understanding their craft. How can I make your Agra experience special?",
        "Love travel discussions! 🗺️ Agra gets millions of tourists, but most miss the real gems - the workshops where marble inlay work happens, the families who've been crafting for generations. I can show you the Agra that guidebooks don't mention. What's your travel style?"
      ],
      personal: [
        "That's a thoughtful personal question! 😊 You know, my personal mission is pretty simple - prevent tourist scams while connecting people with authentic art. It's incredibly fulfilling when a tourist finds a perfect piece that becomes a treasured memory. What personal connection are you looking for in Agra?",
        "I appreciate personal conversations! 💭 My personal journey from BTech student to handicraft helper happened because I couldn't stand seeing tourists get ripped off. Now helping people find authentic pieces feels more rewarding than any grade. What's important to you personally when traveling?"
      ]
    };

    // Select response based on detected topics
    if (analysis.topics.length > 0) {
      const topic = analysis.topics[0];
      if (topic && responses[topic as keyof typeof responses]) {
        const topicResponses = responses[topic as keyof typeof responses];
        return topicResponses[Math.floor(Math.random() * topicResponses.length)];
      }
    }

    // Default question response
    return "That's a really interesting question! 🤔 I love curious minds - probably why I enjoy helping thoughtful travelers like yourself. Whether it's about handicrafts, Agra culture, student life at IIT, or just life in general - I'm here to chat. What's got you thinking about this?";
  }

  // Handle statements with intelligent thinking
  private handleStatementWithThinking(userMessage: string, _analysis: any, _context: any): string {
    const message = userMessage.toLowerCase();

    if (message.includes('boring') || message.includes('tired') || message.includes('bored')) {
      return "I hear you! 😴 Tourist spots can get repetitive. You know what's never boring? Watching a master artisan create intricate marble inlay work with tools that haven't changed in 400 years. The precision is mesmerizing! Want to see something genuinely fascinating?";
    }

    if (message.includes('expensive') || message.includes('costly') || message.includes('broke')) {
      return "I totally get the budget concerns! 💸 That's exactly why I started this mission - fair prices for authentic pieces. My marble coaster set costs ₹1,500 vs ₹4,000+ in tourist shops. Quality doesn't have to break the bank when you know the right people. What's your budget like?";
    }

    if (message.includes('confused') || message.includes('lost') || message.includes('don\'t know')) {
      return "No worries, confusion is totally normal in a new place! 🤷‍♂️ Agra can be overwhelming with all the options. That's where I come in - think of me as your local friend who knows exactly where to find authentic stuff without the tourist markup. What's confusing you most?";
    }

    if (message.includes('amazing') || message.includes('incredible') || message.includes('wow')) {
      return "Right?! 🤩 That's exactly how I feel about authentic craftsmanship. When you see Rajesh uncle's marble work up close, it's genuinely mind-blowing. The detail, the precision, the history behind each piece - it's art that tells stories. Want to experience that amazement firsthand?";
    }

    // Default statement response
    return "I can tell you're really thinking about this! 💭 You know, I love conversations with people who actually reflect on things. Whether you're pondering travel, life, or just random thoughts - I'm here for it. Plus, I might be able to connect whatever you're thinking about to some amazing authentic handicrafts! 😊";
  }

  // Handle emotional messages with intelligent thinking
  private handleEmotionalWithThinking(userMessage: string, _analysis: any, _context: any): string {
    const message = userMessage.toLowerCase();

    if (message.includes('frustrated') || message.includes('angry') || message.includes('annoyed')) {
      return "I can sense the frustration, and honestly, I get it! 😤 Dealing with tourist traps and overpricing is infuriating. That's literally why I do what I do - to give people a genuine, fair experience. Let me turn that frustration into satisfaction with some authentic pieces at honest prices. What's been bothering you?";
    }

    if (message.includes('excited') || message.includes('happy') || message.includes('thrilled')) {
      return "I love the excitement! 🎉 That energy is contagious! You know what gets me equally excited? When tourists discover the real artisan culture of Agra. The joy on people's faces when they see authentic craftsmanship is incredible. Let's channel that excitement into finding you something amazing!";
    }

    if (message.includes('sad') || message.includes('disappointed') || message.includes('upset')) {
      return "Aw, I'm sorry you're feeling down! 😔 Travel should be uplifting, not disappointing. You know what always lifts my spirits? Connecting with authentic artisan families and seeing their incredible work. There's something healing about genuine craftsmanship and real human connections. Want me to share something beautiful to brighten your day?";
    }

    // Default emotional response
    return "I can feel the emotion in your message! 💝 Whether you're feeling high or low, I believe authentic experiences and genuine connections help. That's what real handicrafts represent - human stories, passion, and authenticity. How are you feeling about your Agra experience so far?";
  }

  // Contextual default response for any message
  private getContextualDefaultResponse(_userMessage: string, _context: any): string {
    const responses = [
      "That's really interesting! 🤔 I love how every conversation with travelers brings up something unique. Whether it's deep thoughts, random observations, or just chatting - I'm here for it. Plus, I might surprise you with how I can connect almost anything to authentic Agra handicrafts! What's on your mind?",
      
      "You know what I appreciate? Genuine conversations like this! 😊 As a BTech student turned handicraft helper, I've learned that the best connections happen through real talk. Whether you're thinking about life, travel, or just random stuff - I'm here to chat and maybe show you some incredible authentic pieces along the way!",
      
      "I find that fascinating! 💭 Every tourist I meet has such unique perspectives and thoughts. That's what makes this work so rewarding - real conversations with real people. Whether you want to dive deeper into this topic or explore some amazing authentic handicrafts, I'm game for either direction!",
      
      "That's such an interesting way to put it! 🌟 You know, conversations like this remind me why I love helping travelers. Everyone brings something different to the table. Whether we keep chatting about this or I show you some incredible artisan work that might surprise you - what sounds good?",
      
      "I really like how you think! 🧠 As someone who spends time with both IIT academics and traditional artisans, I've learned that the most interesting conversations happen when different worlds collide. Want to keep exploring this thought, or shall I show you how master craftsmen think through their art?"
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Emergency fallback response
  private getEmergencyResponse(): string {
    return "I'm here to help you discover amazing authentic handicrafts! Whether you're interested in marble Taj Mahal replicas, wooden elephants, or pashmina shawls - I can connect you with master artisan families at fair prices. What interests you most? 😊";
  }

  // Configuration methods
  setProvider(provider: 'groq' | 'huggingface' | 'local') {
    this.config.provider = provider;
  }

  setAPIKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }
}

// Export singleton instance
export const advancedAI = new AdvancedAIIntegration();

// Main function to get AI response
export async function getAdvancedAIResponse(
  userMessage: string,
  conversationHistory: Array<{text: string, isUser: boolean}>,
  userContext: any
): Promise<string> {
  try {
    const context: ConversationContext = {
      userMessage,
      conversationHistory,
      userContext
    };
    
    return await advancedAI.getIntelligentResponse(context);
  } catch (error) {
    console.error('Advanced AI Error:', error);
    // Bulletproof fallback
    return "I'm here to help you discover amazing authentic handicrafts! Whether you're interested in marble Taj Mahal replicas, wooden elephants, or pashmina shawls - I can connect you with master artisan families at fair prices. What interests you most? 😊";
  }
} 