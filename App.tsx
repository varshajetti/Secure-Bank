import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { FraudDetection } from './components/FraudDetection';
import { Login } from './components/Login';
import { Transactions } from './components/Transactions';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { TwoFactorAuth } from './components/TwoFactorAuth';
import { Chatbot } from './components/Chatbot';

type View = 'dashboard' | 'transactions' | 'fraud' | 'settings' | 'profile';
type AuthStatus = 'loggedOut' | 'awaiting2fa' | 'loggedIn';

const App: React.FC = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loggedOut');
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  
  const handleLogin = () => {
    if (is2FAEnabled) {
      setAuthStatus('awaiting2fa');
    } else {
      setAuthStatus('loggedIn');
    }
    setActiveView('dashboard');
  };
  
  const handle2FAVerification = (code: string): boolean => {
    if (code === '123456') {
      setAuthStatus('loggedIn');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setAuthStatus('loggedOut');
  };
  
  const toggle2FA = () => {
    setIs2FAEnabled(prev => !prev);
  }

  if (authStatus === 'loggedOut') {
    return <Login onLogin={handleLogin} />;
  }

  if (authStatus === 'awaiting2fa') {
    return <TwoFactorAuth onVerify={handle2FAVerification} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'fraud':
        return <FraudDetection />;
      case 'transactions':
        return <Transactions />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings is2FAEnabled={is2FAEnabled} onToggle2FA={toggle2FA} />;
      default:
        return <Dashboard />;
    }
  };

  const getTitleForView = (view: View): string => {
    switch (view) {
      case 'dashboard':
        return 'Dashboard';
      case 'fraud':
        return 'Fraud Detection';
      case 'transactions':
        return 'Transaction History';
      case 'settings':
        return 'Settings';
      case 'profile':
        return 'My Profile';
      default:
        return 'VVITU SecureBank';
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col">
        <Header title={getTitleForView(activeView)} setActiveView={setActiveView} />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default App;