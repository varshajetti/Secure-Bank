import React, { useState } from 'react';
import { Transaction } from '../types';
import { FraudStatus } from '../types';
import { TransferModal } from './TransferModal';
import { PaperAirplaneIcon } from './Icons';

const staticTransactions: Transaction[] = [
    { id: 1, date: "2024-07-28", description: "Spotify Subscription", amount: -829.17, currency: "INR", status: FraudStatus.Verified, category: "Entertainment" },
    { id: 2, date: "2024-07-27", description: "Starbucks", amount: -373.50, currency: "INR", status: FraudStatus.Verified, category: "Food" },
    { id: 3, date: "2024-07-26", description: "Salary Deposit", amount: 207500.00, currency: "INR", status: FraudStatus.Verified, category: "Income" },
    { id: 4, date: "2024-07-25", description: "Amazon Purchase", amount: -6266.50, currency: "INR", status: FraudStatus.Verified, category: "Shopping" },
];


const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 last:border-b-0">
        <div className="flex items-center">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.amount > 0 ? 'bg-green-500/20' : 'bg-blue-500/20'}`}>
                <span className="text-xl">{transaction.amount > 0 ? '💸' : '🛒'}</span>
            </div>
            <div className="ml-4">
                <p className="font-medium text-white">{transaction.description}</p>
                <p className="text-sm text-gray-400">{transaction.date}</p>
            </div>
        </div>
        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
            {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
    </div>
);


export const Dashboard: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="p-8 grid grid-cols-1 gap-8">
                <div className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between shadow-lg">
                    <div>
                        <div className="flex justify-between items-start">
                             <div>
                                <p className="text-gray-400 text-lg">Total Balance</p>
                                <p className="text-5xl font-bold text-white mt-2">₹ 12,66,314.40</p>
                            </div>
                             <button 
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-200"
                            >
                                <PaperAirplaneIcon />
                                Send Money
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-300 font-mono">**** **** **** 1234</p>
                        <p className="text-green-400 font-semibold">+ 2.5%</p>
                    </div>
                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 flex flex-col shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4">Recent Transactions</h2>
                    <div className="flex-1 overflow-y-auto">
                        {staticTransactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)}
                    </div>
                </div>
            </div>
            <TransferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
