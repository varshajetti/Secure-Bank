import React from 'react';
import { FraudDetectionPoint } from './types';
import { 
  BrainCircuitIcon, 
  DataStreamIcon, 
  FingerprintIcon, 
  ShieldAlertIcon, 
  BlockchainIcon, 
  DocumentLogIcon 
} from './components/icons';

export const FRAUD_DETECTION_POINTS: FraudDetectionPoint[] = [
  {
    id: 1,
    highlight: 'Machine Learning Models',
    text: 'are trained for historical transaction data to detect patterns of fraudulent behavior.',
    icon: <BrainCircuitIcon />,
  },
  {
    id: 2,
    highlight: 'Data Stream Processing',
    text: 'continuously analyzes transactions to identify anomalies or high-risk activities.',
    icon: <DataStreamIcon />,
  },
  {
    id: 3,
    highlight: 'Behavioral Biometrics',
    text: 'uses typing speed, mouse movements, or device usage to authenticate users.',
    icon: <FingerprintIcon />,
  },
  {
    id: 4,
    highlight: 'Transactions with high-risk scores',
    text: 'trigger additional checks or manual review.',
    icon: <ShieldAlertIcon />,
  },
  {
    id: 5,
    highlight: 'Blockchain for Data Integrity',
    text: 'stores transactional records in a tamper-proof blockchain ledger to enhance security and transparency.',
    icon: <BlockchainIcon />,
  },
  {
    id: 6,
    highlight: 'Detailed Incident Logging',
    text: 'creates comprehensive logs for flagged incidents, investigation workflows, and resolution actions.',
    icon: <DocumentLogIcon />,
  },
];
