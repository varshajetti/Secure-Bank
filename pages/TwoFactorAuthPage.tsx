import React, { useState } from 'react';

interface TwoFactorAuthPageProps {
    onVerify: () => void;
}

const TwoFactorAuthPage = ({ onVerify }: TwoFactorAuthPageProps) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay and validation
        setTimeout(() => {
            if (code === '123456') {
                onVerify();
            } else {
                setError('Invalid code. Please try again.');
                setIsLoading(false);
            }
        }, 500);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 antialiased">
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(#e2e8f033_1px,transparent_1px)] [background-size:32px_32px]"></div>
            
            <div className="w-full max-w-md">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 tracking-tight">
                        Two-Factor Authentication
                    </h1>
                    <p className="mt-3 text-lg text-slate-300">
                        For your security, please enter the code sent to your device.
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-8 shadow-2xl shadow-slate-900/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="tfa-code" className="block text-sm font-medium text-slate-300">6-Digit Code</label>
                            <input
                                id="tfa-code"
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm tracking-[0.5em] text-center"
                                required
                                maxLength={6}
                                pattern="\d{6}"
                                disabled={isLoading}
                                placeholder="_ _ _ _ _ _"
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-400">{error}</p>}
                        
                        <div className="text-center text-xs text-slate-400">
                            <p>Use the demo code: <strong className="text-slate-200">123456</strong></p>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuthPage;
