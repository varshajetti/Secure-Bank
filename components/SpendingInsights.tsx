import React, { useState, useMemo } from 'react';
import { Transaction } from '../types';
import { getFinancialTip } from '../lib/gemini';
import { Spinner } from './Spinner';
import { SparklesIcon } from './icons';

interface SpendingInsightsProps {
    transactions: Transaction[];
}

const categoryColors: { [key: string]: string } = {
    'Food & Drink': '#ef4444', // red-500
    'Shopping': '#a855f7',     // purple-500
    'Housing': '#3b82f6',      // blue-500
    'Utilities': '#06b6d4',     // cyan-500
    'Transportation': '#f97316', // orange-500
    'Entertainment': '#ec4899', // pink-500
    'Health': '#6366f1',       // indigo-500
    'Income': '#22c55e',       // green-500
    'Transfers': '#6b7280',     // gray-500
    'Other': '#64748b',        // slate-500
};

const DoughnutChart = ({ data }: { data: { category: string, amount: number }[] }) => {
    const total = useMemo(() => data.reduce((sum, item) => sum + item.amount, 0), [data]);
    if (data.length === 0) return null;

    const chartSize = 250;
    const radius = 85;
    const doughnutWidth = 30;
    const cx = chartSize / 2;
    const cy = chartSize / 2;

    const getCoordinatesForPercent = (percent: number) => {
        const x = cx + radius * Math.cos(2 * Math.PI * percent);
        const y = cy + radius * Math.sin(2 * Math.PI * percent);
        return [x, y];
    };

    let cumulativePercent = -0.25; // Start at -90 degrees (top)

    const segments = data.map(item => {
        const percent = item.amount / total;
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        cumulativePercent += percent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
        const largeArcFlag = percent > 0.5 ? 1 : 0;

        const pathData = [
            `M ${startX} ${startY}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        ].join(' ');

        return {
            pathData,
            color: categoryColors[item.category] || categoryColors['Other'],
        };
    });

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ width: chartSize, height: chartSize }}>
            <svg width={chartSize} height={chartSize} viewBox={`0 0 ${chartSize} ${chartSize}`}>
                <g>
                    {segments.map((segment, index) => (
                        <path
                            key={index}
                            d={segment.pathData}
                            fill="none"
                            stroke={segment.color}
                            strokeWidth={doughnutWidth}
                        />
                    ))}
                </g>
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                 <span className="text-slate-400 text-sm">Total Spent</span>
                 <span className="font-bold text-2xl text-white">${total.toFixed(2)}</span>
            </div>
        </div>
    );
};


const SpendingInsights = ({ transactions }: SpendingInsightsProps) => {
    const [tip, setTip] = useState('');
    const [isTipLoading, setIsTipLoading] = useState(false);
    const [tipError, setTipError] = useState('');

    const handleGetTip = async () => {
        setIsTipLoading(true);
        setTipError('');
        setTip('');
        try {
            const response = await getFinancialTip(transactions);
            setTip(response.tip);
        } catch (err) {
            setTipError('Could not fetch a tip at this time.');
        } finally {
            setIsTipLoading(false);
        }
    };

    const spendingData = useMemo(() => {
        const spending = transactions
            .filter(t => t.type === 'outgoing' && t.category)
            .reduce((acc: { [key: string]: number }, t) => {
                const category = t.category || 'Other';
                acc[category] = (acc[category] || 0) + t.amount;
                return acc;
            }, {});

        const sortedSpending = Object.entries(spending)
            .map(([category, amount]) => ({ category, amount }))
            .sort((a, b) => b.amount - a.amount);
        
        return sortedSpending;
    }, [transactions]);
    
    return (
        <div className="space-y-8">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">Spending Breakdown</h2>
                {spendingData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                       <div className="flex justify-center">
                         <DoughnutChart data={spendingData} />
                       </div>
                       <div className="space-y-3">
                            {spendingData.map(({ category, amount }) => (
                                <div key={category} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: categoryColors[category] || categoryColors['Other'] }}></span>
                                        <span className="font-medium text-slate-300">{category}</span>
                                    </div>
                                    <span className="font-mono text-slate-200">${amount.toFixed(2)}</span>
                                </div>
                            ))}
                       </div>
                    </div>
                ) : (
                    <p className="text-slate-400 text-center py-8">No spending data available yet. Make a transaction to see your insights!</p>
                )}
            </div>

             <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">AI Financial Tip</h2>
                <div className="flex flex-col items-center text-center">
                    {tip && (
                        <p className="text-lg text-sky-300 italic mb-4 max-w-prose">"{tip}"</p>
                    )}
                    {isTipLoading && <Spinner />}
                    {tipError && <p className="text-red-400 text-sm mb-4">{tipError}</p>}
                    
                    <button 
                        onClick={handleGetTip}
                        disabled={isTipLoading}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 focus:ring-offset-slate-800 disabled:bg-sky-800 disabled:cursor-not-allowed transition-colors"
                    >
                        <SparklesIcon />
                        {isTipLoading ? 'Generating...' : (tip ? 'Get New Tip' : 'Generate Tip')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpendingInsights;