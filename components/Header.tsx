import React from 'react';
import { User } from '../types';
import { LogOutIcon } from './icons';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="py-6 px-4 sm:px-6 lg:px-8 z-10 bg-slate-900/60 backdrop-blur-sm border-b border-slate-700/50 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
           <h1 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 tracking-tight">
             Gemini Secure Bank
           </h1>
            <p className="text-sm text-slate-400">Welcome back, {user.name}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-slate-300 bg-slate-800 rounded-md hover:bg-slate-700 transition-colors duration-200"
          aria-label="Log out"
        >
          <LogOutIcon />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;