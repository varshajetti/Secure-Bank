import { GoogleGenAI, Chat } from "@google/genai";
import { Transaction, GeminiRiskResponse, GeminiCategoryResponse, GeminiFinancialTipResponse, User } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing. Set VITE_GEMINI_API_KEY in .env.");
}

const ai = new GoogleGenAI({ apiKey });
const parseJsonResponse = <T>(text: string): T => {
    let jsonStr = text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
        jsonStr = match[2].trim();
    }
    return JSON.parse(jsonStr) as T;
};

function formatTransactionHistory(transactions: Transaction[], limit: number = 5): string {
    if (transactions.length === 0) {
        return "No recent transactions.";
    }
    return transactions.slice(0, limit).map(t => 
        `- Type: ${t.type}, Amount: $${t.amount.toFixed(2)}, To/From: ${t.type === 'outgoing' ? t.recipient : t.sender}, Note: ${t.note || 'N/A'}, Category: ${t.category || 'N/A'}`
    ).join('\n');
}

export function startChatSession(user: User, balance: number, transactions: Transaction[]): Chat {
    const transactionHistoryString = formatTransactionHistory(transactions, 10);
    const systemInstruction = `You are a helpful and friendly AI banking assistant for "Gemini Secure Bank".
    The user's name is ${user.name}.
    Your knowledge is strictly limited to the user's financial data provided below. Do not answer questions outside of this context.
    If asked about something you don't know, politely state that you can only answer questions about their banking information.
    Be concise and clear in your answers.

    CURRENT USER DATA:
    - Current Balance: $${balance.toFixed(2)}
    - Recent Transactions:
    ${transactionHistoryString}
    `;

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
        config: {
            systemInstruction
        }
    });

    return chat;
}

export async function analyzeTransactionRisk(
    newTransaction: { recipient: string; amount: number; note?: string },
    transactionHistory: Transaction[],
): Promise<GeminiRiskResponse> {
    const transactionHistoryString = formatTransactionHistory(transactionHistory);

    const prompt = `
        You are a sophisticated AI fraud detection engine for a digital bank. Your task is to analyze a pending transaction and provide a risk assessment in JSON format.
        
        Analyze this pending transaction in the context of the user's recent history:
        - User's recent transaction history (last 5):
        ${transactionHistoryString}

        - Pending Transaction:
        - Recipient Account: "${newTransaction.recipient}"
        - Amount: $${newTransaction.amount.toFixed(2)}
        - Note: "${newTransaction.note || 'N/A'}"

        Evaluate for fraud. Consider unusual amounts, recipients, notes (e.g., urgency, crypto), or deviations from past behavior. A transfer to an individual not in the history with a large amount is high risk. A small payment to a known utility is low risk.

        Return your analysis ONLY in the following JSON format. Do not include any other text, explanations, or markdown.
        {
          "riskScore": <number from 0 to 100>,
          "isFraudulent": <boolean>,
          "reason": "<A concise, user-friendly explanation for the risk assessment. Example: 'This transfer is for a much larger amount than your usual transactions to an unrecognized recipient.'>"
        }
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return parseJsonResponse<GeminiRiskResponse>(response.text);
    } catch (error) {
        console.error("Gemini API call failed (analyzeTransactionRisk):", error);
        return {
            riskScore: 50,
            isFraudulent: false,
            reason: "Could not perform fraud analysis due to a technical issue. Please proceed with caution."
        };
    }
}

export async function categorizeTransaction(transaction: Transaction): Promise<GeminiCategoryResponse> {
    const prompt = `
        You are an AI assistant for a bank. Your job is to categorize a financial transaction based on its details.
        Use one of the following categories: "Food & Drink", "Shopping", "Housing", "Utilities", "Transportation", "Entertainment", "Health", "Income", "Transfers", "Other".

        Transaction details:
        - Recipient: ${transaction.recipient}
        - Note: ${transaction.note || 'N/A'}
        - Amount: $${transaction.amount.toFixed(2)}
        
        Based on the recipient and note, what is the most likely category for this transaction?

        Return your answer ONLY in the following JSON format:
        {
          "category": "<Your chosen category>"
        }
    `;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return parseJsonResponse<GeminiCategoryResponse>(response.text);
    } catch (error) {
        console.error("Gemini API call failed (categorizeTransaction):", error);
        return { category: 'Other' };
    }
}


export async function getFinancialTip(transactions: Transaction[]): Promise<GeminiFinancialTipResponse> {
    const spendingTransactions = transactions.filter(t => t.type === 'outgoing').slice(0, 10);
    if(spendingTransactions.length < 3) {
        return { tip: "Start making transactions to get personalized financial tips!" };
    }
    const transactionList = spendingTransactions.map(t => 
        `- Category: ${t.category || 'Other'}, Amount: $${t.amount.toFixed(2)}`
    ).join('\n');

    const prompt = `
        You are a friendly AI financial advisor. Based on the user's recent spending history, provide one short, actionable, and encouraging financial tip.
        The user's recent spending:
        ${transactionList}
        
        Generate a tip that is relevant to their spending. For example, if they spend a lot on "Food & Drink", suggest meal prepping. If they have high "Shopping" expenses, suggest a 'no-spend' week.
        
        Return your answer ONLY in the following JSON format:
        {
            "tip": "<Your personalized financial tip here.>"
        }
    `;
     try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-preview-04-17',
            contents: prompt,
            config: { responseMimeType: "application/json" }
        });
        return parseJsonResponse<GeminiFinancialTipResponse>(response.text);
    } catch (error) {
        console.error("Gemini API call failed (getFinancialTip):", error);
        return { tip: 'Review your spending regularly to find opportunities to save.' };
    }
}
