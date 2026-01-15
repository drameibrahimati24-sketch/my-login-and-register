import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateJobDescription = async (title: string, company: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key not found, returning placeholder.");
    return "AI generation unavailable without API Key. Please provide a description manually.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a professional, engaging, and concise job description (approx 150 words) for a "${title}" position at "${company}". Focus on the role's impact and key responsibilities. Do not use markdown formatting.`,
    });
    return response.text || '';
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate description.");
  }
};