import React, { useState, useRef, useEffect } from 'react';
import { generateChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { 
  Send, 
  Paperclip, 
  Bot, 
  User, 
  Loader2, 
  Image as ImageIcon, 
  Globe, 
  RefreshCw,
  Sparkles,
  BookOpen,
  Mail,
  ListTodo
} from 'lucide-react';

const Chatbot: React.FC = () => {
  // Initial system message is hidden in the new UI flow until user chats
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const prompts = [
    { icon: <ListTodo size={20} />, text: "Create a study schedule for finals week" },
    { icon: <Mail size={20} />, text: "Draft an email to my professor asking for an extension" },
    { icon: <BookOpen size={20} />, text: "Summarize the key events of the French Revolution" },
    { icon: <Sparkles size={20} />, text: "Explain Quantum Entanglement like I'm 5" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

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

    try {
      // Format history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(userMsg.text, history, [], isWebSearch);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-slate-900 relative font-sans transition-colors duration-200">
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {isChatEmpty ? (
          /* Welcome Screen */
          <div className="h-full flex flex-col items-center justify-center p-8 max-w-4xl mx-auto">
            <div className="mb-8 text-center space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
                Hi there, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Anastasia</span>
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-300 dark:text-slate-600">
                What would you like to know?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg mx-auto">
                Use one of the most common prompts below or use your own to begin your study session.
              </p>
            </div>

            {/* Prompt Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
              {prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:shadow-md transition-all text-left flex items-start gap-4 group"
                >
                  <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {prompt.icon}
                  </div>
                  <span className="text-slate-700 dark:text-slate-200 font-medium text-sm mt-1">{prompt.text}</span>
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm font-medium">
              <RefreshCw size={14} /> Refresh Prompts
            </button>
          </div>
        ) : (
          /* Active Chat View */
          <div className="max-w-4xl mx-auto p-4 space-y-8 pb-32">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700' : 'bg-gradient-to-tr from-indigo-500 to-purple-600'}`}>
                  {msg.role === 'user' ? <User size={16} className="text-slate-600 dark:text-slate-300" /> : <Bot size={16} className="text-white" />}
                </div>
                
                <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className="text-xs text-slate-400 mb-1 px-1">
                    {msg.role === 'user' ? 'You' : 'Osmiq'}
                  </div>
                  <div 
                    className={`p-4 rounded-2xl whitespace-pre-wrap leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-sm border border-slate-100 dark:border-slate-700' 
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm border border-slate-100 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-3">
                  <Loader2 size={18} className="animate-spin text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm text-slate-500 dark:text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-slate-900 dark:via-slate-900 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 p-2 relative transition-all focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500/50">
            
            {/* Header / Tools inside input */}
            <div className="flex justify-between items-center px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
               <span className="text-xs font-semibold text-slate-900 dark:text-white">Ask whatever you want...</span>
               <button 
                 onClick={() => setIsWebSearch(!isWebSearch)}
                 className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                   isWebSearch 
                     ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' 
                     : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                 }`}
               >
                 <Globe size={12} /> All Web
               </button>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="w-full px-4 py-2 bg-transparent border-none focus:ring-0 outline-none resize-none text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 max-h-40 min-h-[60px]"
              rows={2}
            />

            {/* Footer Actions */}
            <div className="flex justify-between items-center px-2 mt-2">
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                  <div className="p-1 rounded-full border border-slate-300 dark:border-slate-600">
                    <Paperclip size={10} />
                  </div>
                  Add Attachment
                </button>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                   <div className="p-1 rounded-full border border-slate-300 dark:border-slate-600">
                    <ImageIcon size={10} />
                  </div>
                  Use Image
                </button>
              </div>

              <div className="flex items-center gap-3">
                 <span className="text-[10px] text-slate-400 font-medium">{input.length}/1000</span>
                 <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim() || loading}
                  className={`p-3 rounded-full transition-all shadow-sm ${
                    input.trim() && !loading 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105' 
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

          </div>
          <p className="text-center text-[10px] text-slate-400 mt-4">
            Osmiq can make mistakes. Check important info.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Chatbot;