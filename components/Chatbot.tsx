import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { 
  Send, 
  Bot, 
  User, 
  Loader2,
  ArrowUp,
  Copy,
  Check,
} from 'lucide-react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, streamingText]);

  // Streaming text effect - displays text word by word
  const streamText = (fullText: string, onUpdate: (text: string) => void, onComplete: () => void) => {
    const words = fullText.split(' ');
    let currentIndex = 0;
    setStreamingText('');
    setIsStreaming(true);

    const streamInterval = setInterval(() => {
      if (currentIndex < words.length) {
        const textSoFar = words.slice(0, currentIndex + 1).join(' ');
        setStreamingText(textSoFar);
        onUpdate(textSoFar);
        currentIndex++;
        
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
      } else {
        clearInterval(streamInterval);
        setIsStreaming(false);
        onComplete();
      }
    }, 30);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamingText('');
    setIsStreaming(false);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(userMsg.text, history, [], isWebSearch);

      const botMsgId = (Date.now() + 1).toString();
      const botMsg: ChatMessage = {
        id: botMsgId,
        role: 'model',
        text: '',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
      setLoading(false);

      streamText(
        responseText,
        (text) => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMsgId 
                ? { ...msg, text } 
                : msg
            )
          );
        },
        () => {
          setStreamingText('');
          setIsStreaming(false);
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      setIsStreaming(false);
      
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Sorry, I encountered an error while processing your request.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = async (text: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(messageId);
      setTimeout(() => {
        setCopiedMessageId(null);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const isChatEmpty = messages.length === 0;

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <div className="flex flex-col h-full bg-white dark:bg-black relative">
        
        {/* Main Content Area - Fully Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {isChatEmpty ? (
            /* Welcome Screen - Minimal */
            <div className="h-full flex flex-col items-center justify-center px-4 max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  How can I help you today?
                </h1>
              </div>
            </div>
          ) : (
            /* Chat Messages - ChatGPT Style */
            <div className="max-w-3xl mx-auto px-4 py-8 pb-32">
              {messages.map((msg, index) => (
                <div 
                  key={msg.id} 
                  className={`group relative flex gap-4 mb-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                      {logoError ? (
                        <Bot size={18} className="text-gray-600 dark:text-gray-400" />
                      ) : (
                        <img 
                          src="/osmiq-logo.png" 
                          alt="Osmiq" 
                          className="h-6 w-6 object-contain"
                          onError={() => setLogoError(true)}
                        />
                      )}
                    </div>
                  )}
                  
                  <div className={`relative flex flex-col ${msg.role === 'user' ? 'items-end max-w-[85%]' : 'items-start max-w-[85%]'}`}>
                    <div 
                      className={`relative ${
                        msg.role === 'user' 
                          ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl rounded-tr-md px-4 py-3' 
                          : 'text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-md px-4 py-3'
                      }`}
                      style={{ 
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        lineHeight: '1.75',
                        fontSize: '15px'
                      }}
                    >
                      {msg.text}
                      {isStreaming && msg.role === 'model' && messages[messages.length - 1]?.id === msg.id && (
                        <span className="inline-block w-0.5 h-4 bg-gray-600 dark:bg-gray-400 ml-1" style={{ animation: 'blink 1s infinite' }}></span>
                      )}
                    </div>
                    
                    {/* Copy Button - Appears on Hover */}
                    {msg.text && (
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className={`absolute ${
                          msg.role === 'user' ? 'right-2 -bottom-8' : 'left-2 -bottom-8'
                        } opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300`}
                        title="Copy message"
                      >
                        {copiedMessageId === msg.id ? (
                          <Check size={16} className="text-green-600 dark:text-green-400" />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-gray-200 dark:bg-gray-800">
                      <User size={18} className="text-gray-600 dark:text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
              
              {loading && (
                <div className="flex gap-4 justify-start mb-6">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                    {logoError ? (
                      <Bot size={18} className="text-gray-600 dark:text-gray-400 animate-pulse" />
                    ) : (
                      <img 
                        src="/osmiq-logo.png" 
                        alt="Osmiq" 
                        className="h-6 w-6 object-contain animate-pulse"
                        onError={() => setLogoError(true)}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-3">
                    <Loader2 size={16} className="animate-spin text-gray-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area - Minimal */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-10">
          <div className="max-w-3xl mx-auto px-4 py-4">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-resize textarea
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Message Osmiq..."
                className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600 resize-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-500 max-h-32 min-h-[52px]"
                rows={1}
                style={{ 
                  lineHeight: '1.5',
                }}
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || loading}
                className={`absolute right-[10px] bottom-[10px] h-8 w-8 flex items-center justify-center rounded-lg transition-all ${
                  input.trim() && !loading 
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200' 
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-3">
              Osmiq can make mistakes. Check important info.
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default Chatbot;
