import React, { useState } from 'react';
import { Transaction, GeminiRiskResponse } from '../types';
import { analyzeTransactionRisk } from '../lib/gemini';
import { Spinner } from './Spinner';
import { ShieldAlertIcon } from './icons';

interface TransferFormProps {
    currentBalance: number;
    transactionHistory: Transaction[];
    onNewTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'sender' | 'status'>, status: Transaction['status']) => void;
}

const TransferForm = ({ currentBalance, transactionHistory, onNewTransaction }: TransferFormProps) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [riskResponse, setRiskResponse] = useState<GeminiRiskResponse | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const resetForm = () => {
        setRecipient('');
        setAmount('');
        setNote('');
        setError('');
        setRiskResponse(null);
    };

    const handleTransactionConfirmation = (isConfirmed: boolean) => {
        setShowModal(false);
        if (isConfirmed) {
            const transactionDetails = {
                type: 'outgoing' as const,
                recipient,
                amount: parseFloat(amount),
                note
            };
            onNewTransaction(transactionDetails, riskResponse?.isFraudulent ? 'Flagged' : 'Completed');
            setSuccessMessage(`Transaction to ${recipient} for $${amount} has been initiated.`);
            resetForm();
            setTimeout(() => setSuccessMessage(''), 5000);
        } else {
             const transactionDetails = {
                type: 'outgoing' as const,
                recipient,
                amount: parseFloat(amount),
                note
            };
            onNewTransaction(transactionDetails, 'Failed');
        }
        setRiskResponse(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        const numAmount = parseFloat(amount);

        if (!recipient) {
            setError('Recipient account is required.');
            return;
        }
        if (isNaN(numAmount) || numAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }
        if (numAmount > currentBalance) {
            setError('Insufficient funds.');
            return;
        }

        setIsLoading(true);

        const response = await analyzeTransactionRisk({ recipient, amount: numAmount, note }, transactionHistory);
        
        setIsLoading(false);
        setRiskResponse(response);

        if (response.riskScore > 60) {
            setShowModal(true);
        } else {
            handleTransactionConfirmation(true);
        }
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 h-full shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Make a Transfer</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="recipient" className="block text-sm font-medium text-slate-300">Recipient's Account</label>
                    <input
                        id="recipient"
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="e.g., 555-Electric"
                    />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-grow">
                        <label htmlFor="amount" className="block text-sm font-medium text-slate-300">Amount</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">$</span>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="pl-7 mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                placeholder="0.00"
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>
                 <div>
                    <label htmlFor="note" className="block text-sm font-medium text-slate-300">Note (Optional)</label>
                    <input
                        id="note"
                        type="text"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                        placeholder="e.g., Monthly rent"
                    />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}
                {successMessage && <p className="text-sm text-green-400">{successMessage}</p>}

                <div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 disabled:bg-sky-800 disabled:cursor-not-allowed transition-colors">
                        {isLoading ? <Spinner /> : 'Analyze & Transfer'}
                    </button>
                </div>
            </form>

            {showModal && riskResponse && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-800 border border-yellow-500/50 rounded-xl p-6 max-w-sm w-full text-center shadow-2xl shadow-yellow-500/20">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-500/20 text-yellow-400 mb-4">
                           <ShieldAlertIcon />
                        </div>
                        <h3 className="text-xl font-bold text-yellow-400">High-Risk Transaction</h3>
                        <p className="text-slate-300 mt-2 text-sm">{riskResponse.reason}</p>
                        <p className="font-mono text-xs text-slate-400 mt-2">Risk Score: {riskResponse.riskScore}</p>
                        
                        <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                             <button onClick={() => handleTransactionConfirmation(true)} className="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-slate-800 sm:text-sm">
                                Proceed Anyway
                            </button>
                            <button onClick={() => handleTransactionConfirmation(false)} className="w-full sm:w-auto inline-flex justify-center rounded-md border border-slate-600 shadow-sm px-4 py-2 bg-slate-700 text-base font-medium text-slate-200 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 focus:ring-offset-slate-800 sm:text-sm">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransferForm;
