import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Spinner } from './Spinner';
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from './icons';

interface ChatbotProps {
    messages: ChatMessage[];
    onSendMessage: (message: string) => Promise<void>;
    isLoading: boolean;
}

const Chatbot = ({ messages, onSendMessage, isLoading }: ChatbotProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-sky-600 text-white rounded-full p-4 shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label={isOpen ? "Close chat" : "Open chat"}
                >
                   {isOpen ? <XMarkIcon /> : <ChatBubbleLeftRightIcon />}
                </button>
            </div>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[60vh] max-h-[700px] z-40 bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl flex flex-col">
                    <header className="flex-shrink-0 p-4 border-b border-slate-700">
                        <h3 className="font-bold text-lg text-white text-center">AI Assistant</h3>
                    </header>

                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-sky-500/20 flex-shrink-0 flex items-center justify-center text-sky-400 font-bold text-xs">AI</div>}
                                <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
                                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && messages[messages.length-1].role === 'user' && (
                             <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex-shrink-0 flex items-center justify-center text-sky-400 font-bold text-xs">AI</div>
                                <div className="px-4 py-2 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
                                    <Spinner />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <footer className="flex-shrink-0 p-3 border-t border-slate-700">
                        <form onSubmit={handleSend} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about your account..."
                                className="flex-grow bg-slate-700/50 border border-slate-600 rounded-full py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-sky-600 text-white rounded-full p-2 disabled:bg-sky-800 disabled:cursor-not-allowed hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                                aria-label="Send message"
                            >
                                <PaperAirplaneIcon />
                            </button>
                        </form>
                    </footer>
                </div>
            )}
        </>
    );
};

export default Chatbot;