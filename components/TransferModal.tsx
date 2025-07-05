import React, { useState, Fragment } from 'react';

interface TransferModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('form'); // 'form', 'success'
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');

    if (!isOpen) return null;

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the transfer logic
        console.log(`Transfering ${amount} to ${recipient}`);
        setStep('success');

        setTimeout(() => {
            handleClose();
        }, 2000); // Reset after 2 seconds
    };
    
    const handleClose = () => {
        setRecipient('');
        setAmount('');
        setStep('form');
        onClose();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 transform transition-all duration-300 scale-100">
                {step === 'form' && (
                    <form onSubmit={handleSend}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Send Money</h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-gray-400 hover:text-white"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="recipient" className="text-sm font-medium text-gray-300">Recipient's Account</label>
                                <input id="recipient" type="text" value={recipient} onChange={e => setRecipient(e.target.value)} required placeholder="Enter account number or email" className="mt-1 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="amount" className="text-sm font-medium text-gray-300">Amount (INR)</label>
                                <div className="relative mt-1">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400">₹</span>
                                    <input id="amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required placeholder="0.00" className="w-full px-4 py-3 pl-8 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end space-x-4">
                            <button type="button" onClick={handleClose} className="px-5 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-200">
                                Cancel
                            </button>
                            <button type="submit" className="px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-colors duration-200 disabled:opacity-50" disabled={!recipient || !amount}>
                                Confirm & Send
                            </button>
                        </div>
                    </form>
                )}
                {step === 'success' && (
                     <div className="text-center py-8">
                        <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h2 className="text-2xl font-bold text-white">Transfer Successful!</h2>
                        <p className="text-gray-400 mt-2">Your money is on its way.</p>
                    </div>
                )}
            </div>
        </div>
    );
};