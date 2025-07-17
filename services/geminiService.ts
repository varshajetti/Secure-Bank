import { GoogleGenAI, Chat } from "@google/genai";
import { Transaction } from '../types';
import { allTransactions } from '../data/transactions';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
console.log("Gemini API Key:", import.meta.env.VITE_GEMINI_API_KEY);

if (!apiKey) {
    console.warn("VITE_GEMINI_API_KEY not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey });

export const createChat = (): Chat => {
  const systemInstruction = `You are an intelligent AI assistant for VVITU SecureBank named 'SecureBot'. 
    You must answer questions about the user's account, transactions, security best practices, and general banking topics. 
    When asked about transactions, analyze the user's transaction data which is provided below.
    Be friendly, professional, and concise. Do not perform actions like making transfers or changing settings.
    If you cannot answer a question or if it's outside of banking, politely say so and state that you are a banking assistant.
    All transaction amounts are in Indian Rupees (INR).

    User's Transaction History (JSON format):
    ${JSON.stringify(allTransactions, null, 2)}
  `;

  const chat = ai.chats.create({
    model: "gemini-1.5-pro"

    config: {
        systemInstruction: systemInstruction,
    }
  });
  return chat;
};

export const detectFraudulentTransactions = async (transactions: Transaction[]): Promise<number[]> => {
  const transactionsForPrompt = transactions.map(({ status, ...rest }) => rest);
  
  const prompt = `
    You are an advanced fraud detection AI for a secure banking application.
    Your task is to analyze a list of user transactions in INR (Indian Rupees) and identify any that appear suspicious based on common fraud patterns (e.g., unusual merchants, large international transfers, rapid small purchases at odd hours, deviations from normal spending).

    Here is the list of transactions in JSON format:
    ${JSON.stringify(transactionsForPrompt, null, 2)}

    Please analyze these transactions and return a JSON object with a single key, "suspiciousTransactionIds", which should be an array of numbers corresponding to the 'id' of the transactions you have identified as suspicious.

    If no transactions appear suspicious, return an empty array.
    Only return the JSON object, with no additional commentary, explanation, or markdown formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-pro"

      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    if (parsedData && Array.isArray(parsedData.suspiciousTransactionIds)) {
      return parsedData.suspiciousTransactionIds;
    } else {
      console.error("API response is not in the expected format:", parsedData);
      return [];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze transactions. Please ensure your API key is configured correctly.");
  }
};
