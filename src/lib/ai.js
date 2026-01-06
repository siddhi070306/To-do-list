import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Replace with your actual Gemini API Key
// Get one here: https://aistudio.google.com/app/apikey
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.error("Missing VITE_GEMINI_API_KEY in environment variables");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getAIResponse = async (messages, tasks) => {
    try {
        const taskContext = Array.isArray(tasks) ? tasks.map(t =>
            `- ${t.text} (Status: ${t.isCompleted ? 'Completed' : 'Pending'}, Created: ${t.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'})`
        ).join('\n') : "No tasks available.";

        const systemPrompt = `
You are a helpful and motivational productivity assistant for a To-Do List app.
You have access to the user's current task list:
${taskContext}

Answer questions based on this data. Be concise, encouraging, and helpful.
If the user asks about their progress, analyze the completed vs pending tasks.
The user's latest message is:
`;

        // Extract last user message
        const lastUserMessage = messages[messages.length - 1]?.content || "";

        const fullPrompt = `${systemPrompt}\n"${lastUserMessage}"`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return `AI Error: ${error.message || "Unknown error"}. Please check your API key and connection.`;
    }
};
