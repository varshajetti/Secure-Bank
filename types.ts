import React from 'react';
import { Chat } from '@google/genai';

export interface User {
  name: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  type: 'outgoing' | 'incoming';
  recipient: string;
  sender: string;
  amount: number;
  date: string;
  note?: string;
  status: 'Completed' | 'Pending' | 'Flagged' | 'Failed';
  category?: string;
}

export interface GeminiRiskResponse {
  riskScore: number;
  isFraudulent: boolean;
  reason: string;
}

export interface GeminiCategoryResponse {
    category: string;
}

export interface GeminiFinancialTipResponse {
    tip: string;
}

export interface FraudDetectionPoint {
  id: number;
  highlight: string;
  text: string;
  icon: React.ReactElement;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
