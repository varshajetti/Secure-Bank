import React, { useState, useMemo } from 'react';
import { allTransactions } from '../data/transactions';
import { Transaction } from '../types';
import { SearchIcon } from './Icons';

type FilterType = 'all' | 'income' | 'expense';

const TransactionRow: React.FC<{ transaction: Transaction }> = ({ transaction }) => (
    <tr className="border-b border-gray-700 last:border-0 hover:bg-gray-700/30 transition-colors duration-150">
        <td className="p-4 text-gray-400">{transaction.date}</td>
        <td className="p-4 text-white font-medium">{transaction.description}</td>
        <td className="p-4 text-gray-300">{transaction.category}</td>
        <td className={`p-4 font-mono text-right ${transaction.amount > 0 ? 'text-green-400' : 'text-white'}`}>
            {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </td>
    </tr>
);

export const Transactions: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<FilterType>('all');

    const filteredTransactions = useMemo(() => {
        return allTransactions
            .filter(tx => {
                if (filterType === 'income') return tx.amount > 0;
                if (filterType === 'expense') return tx.amount < 0;
                return true;
            })
            .filter(tx => 
                tx.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }, [searchTerm, filterType]);

    const getFilterButtonClasses = (type: FilterType) => {
        const baseClasses = "px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200";
        if (filterType === type) {
            return `${baseClasses} bg-indigo-600 text-white`;
        }
        return `${baseClasses} bg-gray-700 text-gray-300 hover:bg-gray-600`;
    };

    return (
        <div className="p-8 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                    <p className="text-gray-400 mt-1">View and filter all your past transactions.</p>
                </div>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <div className="relative w-full sm:w-2/5">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by description, category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setFilterType('all')} className={getFilterButtonClasses('all')}>
                        All
                    </button>
                    <button onClick={() => setFilterType('income')} className={getFilterButtonClasses('income')}>
                        Income
                    </button>
                    <button onClick={() => setFilterType('expense')} className={getFilterButtonClasses('expense')}>
                        Expenses
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex-grow">
                 <div className="overflow-y-auto h-full">
                    <table className="w-full text-left">
                        <thead className="bg-gray-700/50 sticky top-0">
                            <tr>
                                <th className="p-4 font-semibold text-gray-300">Date</th>
                                <th className="p-4 font-semibold text-gray-300">Description</th>
                                <th className="p-4 font-semibold text-gray-300">Category</th>
                                <th className="p-4 font-semibold text-gray-300 text-right">Amount (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map(tx => <TransactionRow key={tx.id} transaction={tx} />)
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center p-8 text-gray-400">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
