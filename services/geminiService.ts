
import { GoogleGenAI } from "@google/genai";
import { Incident } from "../types";

export class GeminiService {
  constructor() {}

  // Fix: Removed property 'env' on type 'ImportMeta' error by using process.env.API_KEY directly as per guidelines.
  // Fix: Upgraded to 'gemini-3-pro-preview' for complex reasoning tasks like Root Cause Analysis (RCA).
  async analyzeIncident(incident: Incident) {
    // Initializing GoogleGenAI right before the call to ensure it uses the latest process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      As an expert SRE (Site Reliability Engineer), analyze this incident and provide:
      1. Root Cause Analysis (RCA) based on the logs and description.
      2. Recommended remediation steps.
      3. A concise summary for stakeholders.

      Incident Details:
      Title: ${incident.title}
      Description: ${incident.description}
      Logs: ${incident.logs?.join('\n') || 'No logs available'}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
          // Setting thinkingBudget to 0 to prioritize latency as per user's original setup.
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      // Correctly access the .text property (not a method) from GenerateContentResponse.
      return response.text;
    } catch (error) {
      console.error("Gemini Analysis Error:", error);
      return "Unable to generate AI analysis at this time.";
    }
  }

  // Fix: Upgraded to 'gemini-3-pro-preview' for professional report generation.
  async generatePostMortem(incident: Incident) {
    // Initializing GoogleGenAI right before the call to ensure it uses the latest process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `
      Generate a professional Post-Mortem report for the following resolved incident.
      Focus on: Timeline (approximate), Impact, Root Cause, Lessons Learned, and Action Items.

      Incident Title: ${incident.title}
      Details: ${incident.description}
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });
      // Correctly access the .text property (not a method) from GenerateContentResponse.
      return response.text;
    } catch (error) {
      console.error("Gemini Post-Mortem Error:", error);
      return "Error generating post-mortem report.";
    }
  }
}

export const geminiService = new GeminiService();
