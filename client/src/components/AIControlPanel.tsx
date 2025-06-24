import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import {
  // ollamaIntegration, 
  enableOllamaIntegration, 
  disableOllamaIntegration, 
  testOllamaConnection 
} from '../lib/ollama-integration';

interface AIControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIControlPanel({ isOpen, onClose }: AIControlPanelProps) {
  const [ollamaStatus, setOllamaStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [ollamaConfig, setOllamaConfig] = useState({
    endpoint: 'http://localhost:11434',
    model: 'llama2'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Check Ollama status on component mount
  useEffect(() => {
    if (isOpen) {
      checkOllamaStatus();
    }
  }, [isOpen]);

  const checkOllamaStatus = async () => {
    setIsLoading(true);
    try {
      const isConnected = await testOllamaConnection();
      setOllamaStatus(isConnected ? 'connected' : 'disconnected');
    } catch (error) {
      setOllamaStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableOllama = async () => {
    setIsLoading(true);
    setOllamaStatus('connecting');
    
    try {
      enableOllamaIntegration(ollamaConfig.endpoint, ollamaConfig.model);
      
      // Test connection
      const isConnected = await testOllamaConnection();
      if (isConnected) {
        setOllamaStatus('connected');
      } else {
        setOllamaStatus('error');
        disableOllamaIntegration();
      }
    } catch (error) {
      setOllamaStatus('error');
      disableOllamaIntegration();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableOllama = () => {
    disableOllamaIntegration();
    setOllamaStatus('disconnected');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Control Panel</h2>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>

        {/* Current AI Status */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Current AI System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-semibold text-green-800">Advanced Context AI</span>
              </div>
              <p className="text-sm text-green-700">
                ✅ Context awareness enabled<br/>
                ✅ Personalized responses<br/>
                ✅ Conversation memory<br/>
                ✅ Error handling active
              </p>
            </div>
            
            <div className={`p-4 rounded-lg border ${
              ollamaStatus === 'connected' 
                ? 'bg-blue-50 border-blue-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  ollamaStatus === 'connected' ? 'bg-blue-500' : 'bg-gray-400'
                }`}></div>
                <span className={`font-semibold ${
                  ollamaStatus === 'connected' ? 'text-blue-800' : 'text-gray-800'
                }`}>
                  Ollama Integration
                </span>
                <Badge variant={ollamaStatus === 'connected' ? 'default' : 'secondary'}>
                  {ollamaStatus}
                </Badge>
              </div>
              <p className={`text-sm ${
                ollamaStatus === 'connected' ? 'text-blue-700' : 'text-gray-600'
              }`}>
                {ollamaStatus === 'connected' 
                  ? '🤖 Local AI model active\n🚀 Enhanced responses\n💾 Privacy-focused'
                  : '⚠️ Using fallback system\n📝 Rule-based responses\n🔒 Still secure'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Ollama Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Ollama Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ollama Endpoint
              </label>
              <input
                type="text"
                value={ollamaConfig.endpoint}
                onChange={(e) => setOllamaConfig(prev => ({ ...prev, endpoint: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="http://localhost:11434"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Model
              </label>
              <select
                value={ollamaConfig.model}
                onChange={(e) => setOllamaConfig(prev => ({ ...prev, model: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="llama2">Llama 2 (Recommended)</option>
                <option value="mistral">Mistral</option>
                <option value="codellama">Code Llama</option>
                <option value="phi">Phi</option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleEnableOllama}
                disabled={isLoading || ollamaStatus === 'connected'}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? 'Connecting...' : 'Enable Ollama'}
              </Button>
              
              <Button
                onClick={handleDisableOllama}
                disabled={ollamaStatus === 'disconnected'}
                variant="outline"
              >
                Disable Ollama
              </Button>
              
              <Button
                onClick={checkOllamaStatus}
                disabled={isLoading}
                variant="outline"
              >
                Test Connection
              </Button>
            </div>
          </div>
        </div>

        {/* AI Features Overview */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">AI Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">🧠 Context Awareness</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Remembers conversation history</li>
                <li>• Adapts responses based on user interest</li>
                <li>• Tracks product mentions and preferences</li>
              </ul>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">🎯 Smart Responses</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Product-specific knowledge</li>
                <li>• Price-aware conversations</li>
                <li>• Trust-building responses</li>
              </ul>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">🛡️ Error Handling</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Automatic fallback system</li>
                <li>• Graceful error recovery</li>
                <li>• Always responds to users</li>
              </ul>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">🚀 Performance</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Fast response times</li>
                <li>• Efficient context management</li>
                <li>• Optimized for mobile</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">🤖 Ollama Setup Instructions</h4>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>1.</strong> Install Ollama: <code>curl -fsSL https://ollama.ai/install.sh | sh</code></p>
            <p><strong>2.</strong> Start Ollama: <code>ollama serve</code></p>
            <p><strong>3.</strong> Pull a model: <code>ollama pull llama2</code></p>
            <p><strong>4.</strong> Click "Enable Ollama" above</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 