import React from 'react';
import { FraudDetectionPoint } from '../types';

interface FraudDetectionCardProps {
  point: FraudDetectionPoint;
}

const FraudDetectionCard = ({ point }: FraudDetectionCardProps) => {
  return (
    <li className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 flex items-start space-x-5 transition-all duration-300 hover:border-sky-500 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1">
      <div className="flex-shrink-0 text-sky-400 mt-1">
        {point.icon}
      </div>
      <div className="flex-1">
        <p className="text-slate-300 text-lg leading-relaxed">
          <span className="font-semibold text-sky-400">{point.highlight}</span> {point.text}
        </p>
      </div>
    </li>
  );
};

export default FraudDetectionCard;
