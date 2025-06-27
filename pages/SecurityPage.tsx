import React from 'react';
import FraudDetectionCard from '../components/FraudDetectionCard';
import { FRAUD_DETECTION_POINTS } from '../constants';
import { ShieldCheckIcon, DocumentLogIcon } from '../components/icons';

const mockSecurityEvents = [
    {
        id: 1,
        icon: <DocumentLogIcon />,
        title: "Successful Login",
        description: "From Chrome on macOS",
        date: "Today, 10:30 AM",
        status: "Completed",
    },
    {
        id: 2,
        icon: <ShieldCheckIcon />,
        title: "Flagged Transaction Reviewed",
        description: "Transfer to '555-Unusual' was cancelled.",
        date: "Yesterday, 4:15 PM",
        status: "Resolved",
    },
];

const SecurityPage = () => {
    return (
        <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6">How We Protect You with AI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FRAUD_DETECTION_POINTS.map(point => (
                        <FraudDetectionCard key={point.id} point={point} />
                    ))}
                </div>
            </div>
             <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Security Events</h2>
                 <ul className="divide-y divide-slate-700/50">
                    {mockSecurityEvents.map(event => (
                         <li key={event.id} className="flex items-center space-x-4 py-4">
                            <div className="text-sky-400 flex-shrink-0">
                                {event.icon}
                            </div>
                            <div className="flex-grow">
                                <p className="font-semibold text-slate-200">{event.title}</p>
                                <p className="text-sm text-slate-400">{event.description}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-sm text-slate-300">{event.date}</p>
                                <p className={`text-xs mt-1 font-medium ${event.status === 'Resolved' ? 'text-yellow-400' : 'text-green-400'}`}>{event.status}</p>
                            </div>
                         </li>
                    ))}
                 </ul>
            </div>
        </div>
    );
};

export default SecurityPage;