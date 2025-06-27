import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TransferForm from '../components/TransferForm';
import TransactionHistory from '../components/TransactionHistory';
import SpendingInsights from '../components/SpendingInsights';
import SecurityPage from './SecurityPage';
import Chatbot from '../components/Chatbot';
import { User, Transaction, ChatMessage } from '../types';
import { ChartBarIcon, ShieldCheckIcon, HomeIcon } from '../components/icons';

interface DashboardPageProps {
    user: User;
    balance: number;
    transactions: Transaction[];
    onLogout: () => void;
    onAddTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'sender' | 'status' | 'category'>, status: Transaction['status']) => void;
    chatMessages: ChatMessage[];
    onSendMessage: (message: string) => Promise<void>;
    isChatLoading: boolean;
}

type ActiveTab = 'overview' | 'insights' | 'security';

const AccountSummary = ({ balance, accountNumber }: { balance: number, accountNumber: string }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
        <p className="text-sm text-slate-400">Account Number</p>
        <p className="text-lg font-mono text-slate-300 mb-4">{accountNumber}</p>
        <p className="text-sm text-slate-400">Total Balance</p>
        <p className="text-4xl lg:text-5xl font-bold text-white">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    </div>
);

const TabButton = ({ isActive, onClick, children }: { isActive: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-colors flex items-center gap-2 ${
            isActive 
            ? 'bg-sky-600 text-white' 
            : 'text-slate-300 hover:bg-slate-700/50'
        }`}
    >
        {children}
    </button>
);


const DashboardPage = ({ 
    user, 
    balance, 
    transactions, 
    onLogout, 
    onAddTransaction,
    chatMessages,
    onSendMessage,
    isChatLoading,
}: DashboardPageProps) => {
    const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
    
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col antialiased">
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(#e2e8f01a_1px,transparent_1px)] [background-size:32px_32px]"></div>
            
            <Header user={user} onLogout={onLogout} />

            <main className="flex-grow p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <AccountSummary balance={balance} accountNumber={user.accountNumber} />
                    
                    <div className="border-b border-slate-700 pb-2">
                        <nav className="flex space-x-2 sm:space-x-4" aria-label="Tabs">
                            <TabButton isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>
                                <HomeIcon /> <span className="hidden sm:inline">Overview</span>
                            </TabButton>
                            <TabButton isActive={activeTab === 'insights'} onClick={() => setActiveTab('insights')}>
                                <ChartBarIcon /> <span className="hidden sm:inline">Insights</span>
                            </TabButton>
                            <TabButton isActive={activeTab === 'security'} onClick={() => setActiveTab('security')}>
                                <ShieldCheckIcon /> <span className="hidden sm:inline">Security</span>
                            </TabButton>
                        </nav>
                    </div>

                    {activeTab === 'overview' && (
                         <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                            <div className="lg:col-span-2">
                               <TransferForm 
                                 currentBalance={balance} 
                                 onNewTransaction={onAddTransaction} 
                                 transactionHistory={transactions}
                               />
                            </div>
                            <div className="lg:col-span-3">
                               <TransactionHistory transactions={transactions} />
                            </div>
                        </div>
                    )}

                    {activeTab === 'insights' && (
                        <SpendingInsights transactions={transactions} />
                    )}

                    {activeTab === 'security' && (
                        <SecurityPage />
                    )}
                </div>
            </main>

            <Chatbot 
                messages={chatMessages}
                onSendMessage={onSendMessage}
                isLoading={isChatLoading}
            />

            <Footer />
        </div>
    );
};

export default DashboardPage;