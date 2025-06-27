import React from 'react';
import { Transaction } from '../types';

const statusStyles: { [key in Transaction['status']]: string } = {
    Completed: 'bg-green-500/20 text-green-400',
    Flagged: 'bg-yellow-500/20 text-yellow-400',
    Failed: 'bg-red-500/20 text-red-400',
    Pending: 'bg-sky-500/20 text-sky-400'
};

const categoryColors: { [key: string]: string } = {
    'Food & Drink': 'bg-red-500/30 text-red-300',
    'Shopping': 'bg-purple-500/30 text-purple-300',
    'Housing': 'bg-blue-500/30 text-blue-300',
    'Utilities': 'bg-cyan-500/30 text-cyan-300',
    'Transportation': 'bg-orange-500/30 text-orange-300',
    'Entertainment': 'bg-pink-500/30 text-pink-300',
    'Health': 'bg-indigo-500/30 text-indigo-300',
    'Income': 'bg-green-500/30 text-green-300',
    'Transfers': 'bg-gray-500/30 text-gray-300',
    'Other': 'bg-slate-500/30 text-slate-300',
};

const CategoryBadge = ({ category }: { category: string }) => {
    const colorClass = categoryColors[category] || categoryColors['Other'];
    return <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${colorClass}`}>{category}</span>;
};

const TransactionItem = ({ tx }: { tx: Transaction }) => {
    const isOutgoing = tx.type === 'outgoing';
    const sign = isOutgoing ? '-' : '+';
    const amountColor = isOutgoing ? 'text-red-400' : 'text-green-400';

    return (
        <li className="flex items-center justify-between py-4">
            <div className="flex-1 min-w-0">
                <div className="flex items-center">
                    <p className="text-sm font-medium text-slate-200 truncate">{isOutgoing ? tx.recipient : tx.sender}</p>
                    {tx.category && <CategoryBadge category={tx.category} />}
                </div>
                <p className="text-xs text-slate-400 truncate mt-1">{tx.note || (isOutgoing ? 'Outgoing Transfer' : 'Incoming Transfer')}</p>
                 <p className="text-xs text-slate-500 sm:hidden mt-1">{new Date(tx.date).toLocaleDateString()}</p>
            </div>
            <div className="text-right ml-4 flex-shrink-0">
                 <p className={`text-sm font-semibold ${amountColor}`}>{sign}${tx.amount.toFixed(2)}</p>
                 <div className="flex items-center justify-end mt-1 space-x-2">
                    <span className={`hidden sm:inline-block px-2 py-1 text-xs font-medium rounded-full ${statusStyles[tx.status]}`}>
                        {tx.status}
                    </span>
                    <p className="text-xs text-slate-500 hidden sm:block">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
            </div>
        </li>
    )
};

const TransactionHistory = ({ transactions }: { transactions: Transaction[] }) => {
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 h-full shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            {transactions.length > 0 ? (
                <ul className="divide-y divide-slate-700/50">
                    {transactions.map(tx => <TransactionItem key={tx.id} tx={tx} />)}
                </ul>
            ) : (
                <div className="text-center py-10">
                    <p className="text-slate-400">No transactions yet.</p>
                </div>
            )}
        </div>
    );
};

export default TransactionHistory;
