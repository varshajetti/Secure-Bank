import React from 'react';
import { HomeIcon, TransactionIcon, ShieldIcon, SettingsIcon, LogoutIcon } from './Icons';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: any) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
      isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between border-r border-gray-700">
      <div>
        <div className="flex items-center mb-10 p-2">
           <svg className="w-10 h-10 text-indigo-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" /></svg>
          <h1 className="text-2xl font-bold ml-3 text-white">VVITU SecureBank</h1>
        </div>
        <nav>
          <ul>
            <NavItem
              icon={<HomeIcon />}
              label="Dashboard"
              isActive={activeView === 'dashboard'}
              onClick={() => setActiveView('dashboard')}
            />
            <NavItem
              icon={<TransactionIcon />}
              label="Transactions"
              isActive={activeView === 'transactions'}
              onClick={() => setActiveView('transactions')}
            />
            <NavItem
              icon={<ShieldIcon />}
              label="Fraud Detection"
              isActive={activeView === 'fraud'}
              onClick={() => setActiveView('fraud')}
            />
          </ul>
        </nav>
      </div>
      <div>
        <nav>
          <ul>
            <NavItem
              icon={<SettingsIcon />}
              label="Settings"
              isActive={activeView === 'settings'}
              onClick={() => setActiveView('settings')}
            />
            <NavItem
              icon={<LogoutIcon />}
              label="Logout"
              isActive={false}
              onClick={onLogout}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};
