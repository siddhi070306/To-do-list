import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { getAIResponse } from '../lib/ai';
import { cn } from '../lib/utils';

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I can help you manage your tasks. Ask me anything about your to-do list!' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const { tasks } = useTasks();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Prepare message history for context (last 10 messages)
            const history = messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
            history.push(userMessage);

            const reply = await getAIResponse(history, tasks);

            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error("Chatbot Error:", err);
            setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                >
                    <MessageSquare size={24} />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col border border-slate-100 overflow-hidden transition-all animate-in slide-in-from-bottom-10 fade-in duration-300 pointer-events-auto" style={{ height: '500px' }}>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={20} />
                            <span className="font-semibold">AI Assistant</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed",
                                    msg.role === 'user'
                                        ? "ml-auto bg-indigo-600 text-white rounded-tr-sm"
                                        : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-sm"
                                )}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="bg-white text-slate-500 text-xs p-3 rounded-2xl w-fit shadow-sm border border-slate-100">
                                Typing...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your tasks..."
                            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <button
                            type="submit"
                            disabled={isTyping || !input.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-colors flex items-center justify-center"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
