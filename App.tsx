import React, { useState, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TwoFactorAuthPage from './pages/TwoFactorAuthPage';
import { User, Transaction, ChatMessage } from './types';
import { categorizeTransaction, startChatSession } from './lib/gemini';
import type { Chat } from '@google/genai';

const MOCK_USER: User = {
  name: 'Demo User',
  accountNumber: '1234-5678-9012',
};

const INITIAL_BALANCE = 10000;

const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: 'tx-1', type: 'incoming', sender: 'Corp Inc.', recipient: MOCK_USER.accountNumber, amount: 2500, date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'Completed', note: 'Paycheck', category: 'Income' },
    { id: 'tx-2', type: 'outgoing', sender: MOCK_USER.accountNumber, recipient: '555-Grocery', amount: 154.21, date: new Date(Date.now() - 86400000).toISOString(), status: 'Completed', note: 'Weekly Groceries', category: 'Food & Drink' },
];

type AuthStep = 'login' | 'tfa' | 'authenticated';

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Chat state
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);


  const handleLogin = useCallback((username: string, pass: string): boolean => {
    if (username === 'demo' && pass === 'password') {
      setAuthStep('tfa');
      return true;
    }
    return false;
  }, []);

  const handleTfaSuccess = useCallback(() => {
    const mockUser = MOCK_USER;
    setUser(mockUser);
    setBalance(INITIAL_BALANCE);
    setTransactions(INITIAL_TRANSACTIONS);
    setAuthStep('authenticated');
    
    // Initialize chat session on login
    const chat = startChatSession(mockUser, INITIAL_BALANCE, INITIAL_TRANSACTIONS);
    setChatSession(chat);
    setChatMessages([
        { role: 'model', text: `Hello ${mockUser.name}! I'm your AI assistant. How can I help you today?` }
    ]);
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setBalance(0);
    setTransactions([]);
    setAuthStep('login');
    setChatSession(null);
    setChatMessages([]);
  }, []);

  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'date' | 'sender' | 'status' | 'category'>, status: Transaction['status']) => {
    const newTransaction: Transaction = {
        ...transaction,
        id: `tx-${Date.now()}`,
        date: new Date().toISOString(),
        sender: MOCK_USER.accountNumber,
        status,
    };
    
    let newBalance = balance;
    if (status === 'Completed') {
        newBalance = balance - transaction.amount;
        setBalance(newBalance);
    }
    
    const newTransactions = [newTransaction, ...transactions];
    setTransactions(newTransactions);

    // Re-initialize chat with updated context
    if (user) {
        const chat = startChatSession(user, newBalance, newTransactions);
        setChatSession(chat);
    }

    if (status === 'Completed' && newTransaction.type === 'outgoing') {
        categorizeTransaction(newTransaction).then(categoryResponse => {
            setTransactions(currentTransactions =>
                currentTransactions.map(t =>
                    t.id === newTransaction.id ? { ...t, category: categoryResponse.category } : t
                )
            );
        }).catch(error => {
            console.error("Failed to categorize transaction:", error);
        });
    }
  }, [balance, transactions, user]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!chatSession) return;

    setIsChatLoading(true);
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);

    try {
      const stream = await chatSession.sendMessageStream({ message });
      
      let newBotMessage = "";
      setChatMessages(prev => [...prev, { role: 'model', text: newBotMessage }]);

      for await (const chunk of stream) {
        newBotMessage += chunk.text;
        setChatMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { role: 'model', text: newBotMessage };
            return newMessages;
        });
      }

    } catch(error) {
        console.error("Chat Error:", error);
        setChatMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
        setIsChatLoading(false);
    }

  }, [chatSession]);

  if (authStep === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }
  
  if (authStep === 'tfa') {
    return <TwoFactorAuthPage onVerify={handleTfaSuccess} />;
  }

  if (user) {
    return (
      <DashboardPage 
          user={user}
          balance={balance}
          transactions={transactions}
          onLogout={handleLogout}
          onAddTransaction={addTransaction}
          chatMessages={chatMessages}
          onSendMessage={handleSendMessage}
          isChatLoading={isChatLoading}
      />
    );
  }

  return null; // Should not happen
}

export default App;