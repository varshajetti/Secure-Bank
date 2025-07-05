export enum FraudStatus {
  Unanalyzed = 'Unanalyzed',
  Verified = 'Verified',
  Suspicious = 'Suspicious',
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: FraudStatus;
  category: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}
