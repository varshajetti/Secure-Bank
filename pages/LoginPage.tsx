import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string, pass: string) => boolean;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
    const [username, setUsername] = useState('demo');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            if (!onLogin(username, password)) {
                setError('Invalid username or password.');
                setIsLoading(false);
            }
            // On success, App.tsx will handle navigation, so no need to setIsLoading(false)
        }, 500);
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 antialiased">
            <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[radial-gradient(#e2e8f033_1px,transparent_1px)] [background-size:32px_32px]"></div>
            
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 tracking-tight">
                        Gemini Secure Bank
                    </h1>
                    <p className="mt-3 text-lg text-slate-300">
                        Sign in to access your account.
                    </p>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-8 shadow-2xl shadow-slate-900/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                                required
                                disabled={isLoading}
                            />
                        </div>
                        
                        {error && <p className="text-sm text-red-400">{error}</p>}
                        
                        <div className="text-center text-xs text-slate-400">
                            <p>Use <strong className="text-slate-200">demo</strong> / <strong className="text-slate-200">password</strong> to log in.</p>
                        </div>

                        <div>
                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
