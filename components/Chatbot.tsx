import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { createChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { ChatIcon, CloseIcon, SendIcon } from './Icons';

const AITypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
    </div>
);


export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && !chatSessionRef.current) {
            chatSessionRef.current = createChat();
            setMessages([
                { sender: 'ai', text: "Hello! I'm SecureBot, your personal banking assistant. How can I help you today? You can ask me about your spending, transactions, or general security tips." }
            ]);
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            if (chatSessionRef.current) {
                const response = await chatSessionRef.current.sendMessage({ message: input });
                const aiMessage: ChatMessage = { sender: 'ai', text: response.text };
                setMessages(prev => [...prev, aiMessage]);
            }
        } catch (error) {
            console.error("Failed to send message to Gemini:", error);
            const errorMessage: ChatMessage = { sender: 'ai', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed bottom-24 right-5 md:right-8 bg-gray-800 border border-gray-700 w-[calc(100%-2.5rem)] max-w-lg h-[70vh] rounded-2xl shadow-2xl flex flex-col transition-transform duration-300 ease-in-out z-40 ${isOpen ? 'transform-none' : 'translate-y-[120%]'}`}>
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">AI Assistant</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-lg' : 'bg-gray-700 text-gray-200 rounded-bl-lg'}`}>
                                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                         <div className="flex justify-start">
                             <div className="bg-gray-700 rounded-2xl rounded-bl-lg p-2">
                                <AITypingIndicator />
                             </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Input */}
                <footer className="p-4 border-t border-gray-700">
                    <form onSubmit={handleSend} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about your finances..."
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                        <button type="submit" className="bg-indigo-600 text-white p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors" disabled={isLoading || !input.trim()}>
                           <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>

            {/* FAB */}
            <button 
                onClick={() => setIsOpen(prev => !prev)}
                className="fixed bottom-5 right-5 md:right-8 bg-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-500 transition-all duration-300 ease-in-out z-50 transform hover:scale-110"
                aria-label="Toggle AI Chat"
            >
                {isOpen ? <CloseIcon className="w-8 h-8"/> : <ChatIcon className="w-8 h-8" />}
            </button>
        </>
    );
};
