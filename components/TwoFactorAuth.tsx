import React, { useState, useRef } from 'react';

interface TwoFactorAuthProps {
    onVerify: (code: string) => boolean;
}

export const TwoFactorAuth: React.FC<TwoFactorAuthProps> = ({ onVerify }) => {
    const [code, setCode] = useState<string[]>(Array(6).fill(''));
    const [error, setError] = useState('');
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const newCode = [...code];

        if (/^[0-9]$/.test(value)) {
            newCode[index] = value;
            setCode(newCode);
            if (index < 5) {
                inputsRef.current[index + 1]?.focus();
            }
        } else if (value === '') { // Handle backspace/delete
             newCode[index] = '';
             setCode(newCode);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };
    
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6);
        if (/^[0-9]{6}$/.test(pasteData)) {
            const newCode = pasteData.split('');
            setCode(newCode);
            inputsRef.current[5]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const enteredCode = code.join('');
        if (enteredCode.length !== 6) {
            setError('Please enter the complete 6-digit code.');
            return;
        }
        
        const isSuccess = onVerify(enteredCode);
        if (!isSuccess) {
            setError('Invalid code. Please try again.');
            setCode(Array(6).fill(''));
            inputsRef.current[0]?.focus();
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
                <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                    <h1 className="text-3xl font-bold mt-4">Two-Factor Authentication</h1>
                    <p className="text-gray-400 mt-2">Enter the 6-digit code from your authenticator app.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-2" onPaste={handlePaste}>
                        {code.map((digit, index) => (
                           <input
                             key={index}
                             ref={el => { inputsRef.current[index] = el; }}
                             type="text"
                             inputMode="numeric"
                             maxLength={1}
                             value={digit}
                             onChange={(e) => handleInputChange(e, index)}
                             onKeyDown={(e) => handleKeyDown(e, index)}
                             className="w-14 h-16 bg-gray-700 border border-gray-600 rounded-lg text-center text-3xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                             />
                        ))}
                    </div>
                    
                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200 disabled:opacity-50"
                            disabled={code.join('').length !== 6}
                        >
                            Verify
                        </button>
                    </div>
                </form>
                 <p className="text-xs text-gray-500">
                    For demonstration, use the code: <strong className="text-gray-400 font-mono">123456</strong>
                </p>
            </div>
        </div>
    );
};