import React, { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

interface SettingsProps {
    is2FAEnabled: boolean;
    onToggle2FA: () => void;
}

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-gray-800 rounded-2xl shadow-lg p-8">
        <h3 className="text-xl font-bold mb-6 text-white">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

export const Settings: React.FC<SettingsProps> = ({ is2FAEnabled, onToggle2FA }) => {
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        sms: true,
    });
    
    // For demonstration, theme toggle won't change the actual theme
    const [isDarkTheme, setIsDarkTheme] = useState(true);

    return (
        <div className="p-8 text-white">
            <div className="max-w-4xl mx-auto space-y-8">
                <SettingsSection title="Appearance">
                    <ToggleSwitch 
                        label="Enable Dark Theme"
                        enabled={isDarkTheme}
                        onChange={setIsDarkTheme}
                    />
                     <p className="text-sm text-gray-400 pt-2">App-wide dark theme. Light theme coming soon!</p>
                </SettingsSection>

                <SettingsSection title="Notification Preferences">
                    <ToggleSwitch
                        label="Email Notifications"
                        enabled={notifications.email}
                        onChange={(enabled) => setNotifications(prev => ({...prev, email: enabled}))}
                    />
                    <ToggleSwitch
                        label="Push Notifications"
                        enabled={notifications.push}
                        onChange={(enabled) => setNotifications(prev => ({...prev, push: enabled}))}
                    />
                    <ToggleSwitch
                        label="SMS Alerts for Large Transactions"
                        enabled={notifications.sms}
                        onChange={(enabled) => setNotifications(prev => ({...prev, sms: enabled}))}
                    />
                </SettingsSection>

                <SettingsSection title="Security">
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                       <p className="text-white">Password</p>
                       <button className="mt-2 sm:mt-0 bg-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-500 transition-colors text-sm">
                            Change Password
                       </button>
                   </div>
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 mt-4 border-t border-gray-700">
                        <div>
                            <p className="text-white">Two-Factor Authentication (2FA)</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {is2FAEnabled ? "2FA is currently active." : "Add an extra layer of security."}
                            </p>
                        </div>
                       <button
                         onClick={onToggle2FA}
                         className={`mt-2 sm:mt-0 px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                            is2FAEnabled 
                            ? 'bg-red-600 hover:bg-red-500 text-white' 
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                       >
                           {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                       </button>
                   </div>
                </SettingsSection>
            </div>
        </div>
    );
};