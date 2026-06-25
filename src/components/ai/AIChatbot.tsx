'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, X, Send, Leaf, 
  TrendingUp, Award, Bot, Mic, ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIChatbot: React.FC = () => {
  const { aiChatHistory, askAIChatbot, currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiChatHistory, isOpen]);

  if (!currentUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    askAIChatbot(inputText);
    setInputText('');
  };

  const handleQuickQuestion = (question: string) => {
    askAIChatbot(question);
  };

  const quickQuestions = [
    { text: '🌾 Suggest Crop to plant', q: 'Suggest crop recommendation for current monsoon season' },
    { text: '📈 Mandi price rates', q: 'Check current market mandi prices' },
    { text: '🏢 Sourcing match matching', q: 'Match me with suitable buyers' }
  ];

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
      
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center gap-2 p-3.5 rounded-full text-white shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 ${
            currentUser.role === 'farmer' 
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 ring-pulse-green' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 ring-pulse-blue'
          }`}
          title="FarmerLink AI Sourcing Assistant"
        >
          <Bot className="w-6 h-6 text-white" />
          <span className="text-xs font-bold font-poppins pr-1.5 hidden sm:inline">AI Assistant</span>
          <span className="absolute -top-1 -right-1 bg-amber-500 w-3 h-3 rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </span>
        </button>
      )}

      {/* Chat Dialog Popup */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform scale-100">
          
          {/* Header */}
          <div className={`p-4 text-white flex items-center justify-between ${
            currentUser.role === 'farmer' 
              ? 'bg-gradient-to-r from-emerald-650 to-emerald-800' 
              : 'bg-gradient-to-r from-blue-650 to-blue-800'
          }`}>
            <div className="flex items-center gap-2.5">
              <Bot className="w-5.5 h-5.5 text-white" />
              <div>
                <h3 className="font-poppins font-bold text-xs">AgriAI Assistant</h3>
                <p className="text-[9px] text-emerald-100 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Multilingual AI active
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-full cursor-pointer text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 dark:bg-zinc-950/20">
            {aiChatHistory.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm text-xs leading-normal ${
                  msg.role === 'user'
                    ? 'bg-slate-800 text-white rounded-tr-none'
                    : 'bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 rounded-tl-none border border-slate-100 dark:border-zinc-800'
                }`}>
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick recommendations / Suggestions */}
          <div className="px-4 py-2 bg-slate-50 dark:bg-zinc-900/60 border-t border-slate-100 dark:border-zinc-800 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            {quickQuestions.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickQuestion(item.q)}
                className="bg-white dark:bg-zinc-850 hover:bg-slate-50 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-750 text-slate-650 dark:text-zinc-350 text-[10px] font-semibold px-2.5 py-1 rounded-full cursor-pointer transition-colors shadow-sm shrink-0"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* Input control */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex gap-2 items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything about farming..."
              className="flex-1 bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-850 rounded-full px-3.5 py-2 text-xs focus:outline-none focus:border-emerald-600 text-slate-800 dark:text-zinc-250"
            />
            <button
              type="submit"
              className={`p-2.5 text-white rounded-full cursor-pointer shadow hover:shadow-md transition-all ${
                currentUser.role === 'farmer' ? 'bg-primary-green' : 'bg-corporate-blue'
              }`}
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
