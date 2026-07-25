import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am the NorthPeak AI Scope Advisor. What are you building?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: messages,
          message: userMessage.text,
          complexity: 'general'
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const presetPrompts = [
    "What services do you offer?",
    "How much does the Growth plan cost?",
    "How do I book a call?"
  ];

  const handlePreset = (prompt: string) => {
    // Instead of setting input, we just send directly
    const userMessage: Message = { role: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        history: messages,
        message: prompt,
        complexity: 'general'
      }),
    }).then(res => res.json()).then(data => {
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      setIsLoading(false);
    }).catch(err => {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error.' }]);
      setIsLoading(false);
    });
  };

  return (
    <>
      <motion.button
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-accent rounded-full flex items-center justify-center text-white shadow-[0_0_20px_var(--color-brand-accent-glow)] z-50 hover:bg-brand-accent/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-brand-bg border border-brand-border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] max-h-[70vh]"
          >
            {/* Header */}
            <div className="bg-brand-border/30 p-4 border-b border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-brand-text text-sm">AI Scope Advisor</h3>
                  <p className="text-xs text-brand-muted">Usually responds instantly</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
                className="text-brand-muted hover:text-brand-text transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              data-lenis-prevent="true" 
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain custom-scrollbar"
            >
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-text text-brand-bg' : 'bg-brand-border/50 text-brand-text'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`rounded-2xl p-3 max-w-[85%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-text text-brand-bg rounded-tr-none' : 'bg-brand-border/20 text-brand-text rounded-tl-none border border-brand-border/50'}`}>
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      <div className="markdown-body">
                        <Markdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({node, ...props}) => <a className="text-brand-accent underline underline-offset-2 hover:text-brand-accent/80" target="_blank" rel="noopener noreferrer" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-brand-text" {...props} />,
                            h1: ({node, ...props}) => <h1 className="font-bold text-lg mb-2 mt-4 first:mt-0" {...props} />,
                            h2: ({node, ...props}) => <h2 className="font-bold text-base mb-2 mt-4 first:mt-0" {...props} />,
                            h3: ({node, ...props}) => <h3 className="font-bold text-sm mb-2 mt-3 first:mt-0" {...props} />,
                            code: ({node, ...props}) => <code className="bg-brand-bg/50 px-1 py-0.5 rounded text-xs" {...props} />,
                            pre: ({node, ...props}) => <pre className="bg-brand-bg/50 p-2 rounded mb-2 overflow-x-auto text-xs" {...props} />,
                          }}
                        >
                          {msg.text}
                        </Markdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-brand-border/50 text-brand-text">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-brand-border/20 text-brand-text rounded-2xl rounded-tl-none p-3 border border-brand-border/50 flex items-center gap-2">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} className="w-1.5 h-1.5 bg-brand-muted rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-brand-muted rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-brand-muted rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {presetPrompts.map((prompt, i) => (
                  <button 
                    key={i}
                    onClick={() => handlePreset(prompt)}
                    className="text-xs px-3 py-1.5 bg-brand-border/30 hover:bg-brand-border/50 border border-brand-border rounded-full text-brand-text transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-brand-border bg-brand-bg flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-brand-border/10 border border-brand-border rounded-full px-4 py-2 text-sm text-brand-text focus:outline-none focus:border-brand-accent/50 transition-colors"
              />
              <button 
                type="submit"
                aria-label="Send message"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-brand-accent text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-accent/90 transition-colors"
              >
                <Send className="w-4 h-4 -ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
