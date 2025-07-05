import React from 'react';
import { BellIcon, ChevronDownIcon, SearchIcon } from './Icons';

interface HeaderProps {
  title: string;
  setActiveView: (view: any) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, setActiveView }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-gray-900 border-b border-gray-700">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-800 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="relative text-gray-400 hover:text-white">
          <BellIcon />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => setActiveView('profile')}
        >
          <div>
            <p className="font-semibold text-white">Demo User</p>
            <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">demo@securebank.com</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
