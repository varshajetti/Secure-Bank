import { Transaction } from '../types';

export const detectFraudulentTransactions = async (transactions: Transaction[]): Promise<number[]> => {
  const suspiciousIds: number[] = [];

  for (const tx of transactions) {
    const amountLimit = 50000; // Flag large transactions
    const suspiciousWords = ["lottery", "betting", "casino", "crypto", "foreign", "gucci"]; // Add your keywords

    const isLargeAmount = Math.abs(tx.amount) > amountLimit;
    const containsSuspiciousWord = suspiciousWords.some(word =>
      tx.description.toLowerCase().includes(word)
    );

    if (isLargeAmount || containsSuspiciousWord) {
      suspiciousIds.push(tx.id);
    }
  }

  return suspiciousIds;
};
