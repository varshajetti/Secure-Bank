import React from 'react';

interface LoginProps {
    onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-2xl shadow-lg text-center">
                <div className="flex flex-col items-center">
                    <svg className="w-16 h-16 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
                    </svg>
                    <h1 className="text-4xl font-bold mt-4">VVITU SecureBank</h1>
                    <p className="text-gray-400 mt-2">Your Trusted Financial Partner</p>
                </div>
                
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 sr-only">Email address</label>
                        <input 
                            id="email" 
                            name="email" 
                            type="email" 
                            autoComplete="email" 
                            required 
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            placeholder="Email address"
                            defaultValue="demo@securebank.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-300 sr-only">Password</label>
                        <input 
                            id="password" 
                            name="password" 
                            type="password" 
                            autoComplete="current-password" 
                            required 
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                            placeholder="Password"
                            defaultValue="demopassword123"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                 <p className="text-xs text-gray-500">
                    For demonstration purposes, you can sign in with the pre-filled credentials.
                </p>
            </div>
        </div>
    );
};