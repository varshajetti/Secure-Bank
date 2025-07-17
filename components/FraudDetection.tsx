import React, { useState, useCallback } from 'react';
import { Transaction, FraudStatus } from '../types';
import { detectFraudulentTransactions } from '../services/fraudRulesService';

const initialTransactions: Transaction[] = [
    // Normal Looking Transactions
    { id: 101, date: "2024-07-29", description: "Netflix Subscription", amount: -1285.67, currency: "INR", status: FraudStatus.Unanalyzed, category: "Entertainment" },
    { id: 102, date: "2024-07-29", description: "Starbucks", amount: -539.50, currency: "INR", status: FraudStatus.Unanalyzed, category: "Food" },
    { id: 109, date: "2024-07-25", description: "Grocery Store - Safeway", amount: -10080.35, currency: "INR", status: FraudStatus.Unanalyzed, category: "Groceries" },
    { id: 110, date: "2024-07-25", description: "Amazon.com Purchase", amount: -7469.17, currency: "INR", status: FraudStatus.Unanalyzed, category: "Shopping" },

    // Potentially Suspicious Transactions for AI to find
    { id: 105, date: "2024-07-28", description: "Wire Transfer to Acct 789... (RU)", amount: -207500.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Transfer" },
    { id: 108, date: "2024-07-28", description: "ATM Withdrawal - 4:05 AM", amount: -33200.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Cash" },
    { id: 111, date: "2024-07-27", description: "Gucci Online Store - Milan", amount: -310500.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Luxury Goods" },
    { id: 112, date: "2024-07-27", description: "Foreign Transaction Fee", amount: -8590.50, currency: "INR", status: FraudStatus.Unanalyzed, category: "Fees" },
    { id: 107, date: "2024-07-26", description: "Crypto Purchase - BitFlyer", amount: -62250.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Investment" },
    { id: 113, date: "2024-07-26", description: "Betting Website Deposit - Luckify", amount: -16600.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Gambling" },

    // Card Testing Pattern (Rapid, small purchases)
    { id: 114, date: "2024-07-26", description: "ElegantGamer Gear", amount: -663.17, currency: "INR", status: FraudStatus.Unanalyzed, category: "Gaming" },
    { id: 115, date: "2024-07-26", description: "ElegantGamer Gear", amount: -664.83, currency: "INR", status: FraudStatus.Unanalyzed, category: "Gaming" },
    { id: 116, date: "2024-07-26", description: "ElegantGamer Gear", amount: -660.85, currency: "INR", status: FraudStatus.Unanalyzed, category: "Gaming" },
    
    // Another normal one
    { id: 117, date: "2024-07-25", description: "Gas Station - Shell", amount: -4581.60, currency: "INR", status: FraudStatus.Unanalyzed, category: "Transport" },
    
    // Another suspicious one
    { id: 118, date: "2024-07-24", description: "Donation - Children's Joy Foundation", amount: -41500.00, currency: "INR", status: FraudStatus.Unanalyzed, category: "Charity" },
];

const StatusBadge: React.FC<{ status: FraudStatus }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    switch (status) {
        case FraudStatus.Suspicious:
            return <span className={`${baseClasses} bg-red-500/20 text-red-400`}>Suspicious</span>;
        case FraudStatus.Verified:
            return <span className={`${baseClasses} bg-green-500/20 text-green-400`}>Verified</span>;
        case FraudStatus.Unanalyzed:
        default:
            return <span className={`${baseClasses} bg-gray-600/50 text-gray-300`}>Unanalyzed</span>;
    }
};

export const FraudDetection: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const unanalyzedTransactions = transactions.filter(tx => tx.status === FraudStatus.Unanalyzed);
            if (unanalyzedTransactions.length === 0) {
                 setIsLoading(false);
                 return;
            }

            const suspiciousIds = await detectFraudulentTransactions(unanalyzedTransactions);
            
            setTransactions(prev => 
                prev.map(tx => {
                    if (suspiciousIds.includes(tx.id)) {
                        return { ...tx, status: FraudStatus.Suspicious };
                    }
                    if (tx.status === FraudStatus.Unanalyzed) {
                        return { ...tx, status: FraudStatus.Verified };
                    }
                    return tx;
                })
            );

        } catch (e: any) {
            setError(e.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, [transactions]);
    
    const resetAnalysis = () => {
        setTransactions(initialTransactions.map(tx => ({...tx, status: FraudStatus.Unanalyzed})));
        setError(null);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Transaction Analysis</h2>
                    <p className="text-gray-400 mt-1">Review recent transactions and use AI to flag suspicious activity.</p>
                </div>
                 <div className="flex items-center space-x-4">
                    <button
                        onClick={resetAnalysis}
                        disabled={isLoading}
                        className="px-5 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={isLoading || !transactions.some(tx => tx.status === FraudStatus.Unanalyzed)}
                        className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyzing...
                            </>
                        ) : (
                            'Analyze with Gemini AI'
                        )}
                    </button>
                </div>
            </div>

            {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg mb-6">{error}</div>}

            <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-gray-300">Date</th>
                            <th className="p-4 font-semibold text-gray-300">Description</th>
                            <th className="p-4 font-semibold text-gray-300">Category</th>
                            <th className="p-4 font-semibold text-gray-300 text-right">Amount (INR)</th>
                            <th className="p-4 font-semibold text-gray-300 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(tx => (
                            <tr key={tx.id} className="border-b border-gray-700 last:border-0 hover:bg-gray-700/30 transition-colors duration-150">
                                <td className="p-4 text-gray-400">{tx.date}</td>
                                <td className="p-4 text-white font-medium">{tx.description}</td>
                                <td className="p-4 text-gray-300">{tx.category}</td>
                                <td className={`p-4 font-mono text-right ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ₹{Math.abs(tx.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="p-4 text-center">
                                    <StatusBadge status={tx.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
