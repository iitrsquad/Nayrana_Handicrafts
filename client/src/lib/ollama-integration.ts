// Ollama Integration for Advanced AI Responses
// This is an optional enhancement that can be enabled when needed

interface OllamaConfig {
  enabled: boolean;
  endpoint: string;
  model: string;
  timeout: number;
}

interface OllamaResponse {
  response: string;
  done: boolean;
  context?: number[];
}

class OllamaIntegration {
  private config: OllamaConfig;
  private conversationContext: number[] = [];

  constructor() {
    this.config = {
      enabled: false, // Disabled by default for safety
      endpoint: 'http://localhost:11434',
      model: 'llama2', // or 'mistral', 'codellama'
      timeout: 10000
    };
  }

  // Enable Ollama integration (call this when ready)
  enableOllama(endpoint?: string, model?: string): void {
    this.config.enabled = true;
    if (endpoint) this.config.endpoint = endpoint;
    if (model) this.config.model = model;
    console.log('Ollama integration enabled:', this.config);
  }

  // Disable Ollama integration
  disableOllama(): void {
    this.config.enabled = false;
    console.log('Ollama integration disabled');
  }

  // Check if Ollama is available
  async checkOllamaAvailability(): Promise<boolean> {
    if (!this.config.enabled) return false;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${this.config.endpoint}/api/tags`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('Ollama not available:', error);
      return false;
    }
  }

  // Generate AI response using Ollama
  async generateResponse(
    userMessage: string, 
    conversationHistory: string[] = [],
    systemPrompt?: string
  ): Promise<string | null> {
    if (!this.config.enabled) return null;

    try {
      // Check availability first
      const isAvailable = await this.checkOllamaAvailability();
      if (!isAvailable) {
        console.log('Ollama not available, using fallback');
        return null;
      }

      // Create context-aware prompt
      const prompt = this.createContextualPrompt(userMessage, conversationHistory, systemPrompt);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(`${this.config.endpoint}/api/generate`, {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model,
          prompt: prompt,
          context: this.conversationContext,
          stream: false,
          options: {
            temperature: 0.7,
            top_p: 0.9,
            max_tokens: 200,
          }
        }),
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Ollama API error: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      
      // Update conversation context
      if (data.context) {
        this.conversationContext = data.context;
      }

      // Clean and validate response
      return this.cleanResponse(data.response);

    } catch (error) {
      console.error('Ollama generation error:', error);
      return null;
    }
  }

  // Create contextual prompt for Ollama
  private createContextualPrompt(
    userMessage: string, 
    conversationHistory: string[], 
    systemPrompt?: string
  ): string {
    const defaultSystemPrompt = `You are Saad, a helpful local guide in Agra, India. You help tourists find authentic handicrafts at fair prices. You are an IIT student on a mission to prevent tourist scams. You work with verified artisan families and provide hotel delivery.

Key traits:
- Friendly, helpful, and trustworthy
- Knowledgeable about handicrafts (marble Taj Mahal replicas, wooden elephants, pashmina shawls)
- Transparent about pricing
  - Offers WhatsApp contact: +91-7417-99-4386
- Provides hotel delivery service
- Speaks like a young, educated local who genuinely cares

Keep responses conversational, helpful, and under 150 words. Use emojis appropriately.`;

    const prompt = systemPrompt || defaultSystemPrompt;
    
    let contextualPrompt = `${prompt}\n\nConversation history:\n`;
    
    // Add recent conversation history (last 6 messages)
    const recentHistory = conversationHistory.slice(-6);
    recentHistory.forEach((msg, index) => {
      const speaker = index % 2 === 0 ? 'Tourist' : 'Saad';
      contextualPrompt += `${speaker}: ${msg}\n`;
    });
    
    contextualPrompt += `\nTourist: ${userMessage}\nSaad:`;
    
    return contextualPrompt;
  }

  // Clean and validate AI response
  private cleanResponse(response: string): string {
    // Remove any unwanted prefixes or suffixes
    let cleaned = response.trim();
    
    // Remove common AI artifacts
    cleaned = cleaned.replace(/^(Saad:|Assistant:|AI:)/i, '');
    cleaned = cleaned.replace(/\[.*?\]/g, ''); // Remove any bracketed content
    cleaned = cleaned.trim();
    
    // Ensure response isn't too long
    if (cleaned.length > 300) {
      cleaned = cleaned.substring(0, 300) + '...';
    }
    
    // Ensure response isn't empty
    if (!cleaned || cleaned.length < 10) {
      return "I'm here to help! What would you like to know about authentic handicrafts? 😊";
    }
    
    return cleaned;
  }

  // Get current configuration
  getConfig(): OllamaConfig {
    return { ...this.config };
  }

  // Reset conversation context
  resetContext(): void {
    this.conversationContext = [];
  }
}

// Export singleton instance
export const ollamaIntegration = new OllamaIntegration();

// Utility function to safely use Ollama with fallback
export async function getEnhancedAIResponse(
  userMessage: string,
  conversationHistory: string[] = [],
  fallbackResponse: string
): Promise<string> {
  try {
    const ollamaResponse = await ollamaIntegration.generateResponse(
      userMessage, 
      conversationHistory
    );
    
    // Return Ollama response if available and valid
    if (ollamaResponse && ollamaResponse.length > 10) {
      return ollamaResponse;
    }
    
    // Fallback to provided response
    return fallbackResponse;
    
  } catch (error) {
    console.error('Enhanced AI response error:', error);
    return fallbackResponse;
  }
}

// Configuration helpers
export function enableOllamaIntegration(endpoint?: string, model?: string): void {
  ollamaIntegration.enableOllama(endpoint, model);
}

export function disableOllamaIntegration(): void {
  ollamaIntegration.disableOllama();
}

export async function testOllamaConnection(): Promise<boolean> {
  return await ollamaIntegration.checkOllamaAvailability();
} 