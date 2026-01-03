import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: Replace with your actual Gemini API Key
// Get one here: https://aistudio.google.com/app/apikey
const API_KEY = "AIzaSyDk16oa-C2roEIZpseMQJXxl2iVv1eeUyU";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getAIResponse = async (messages, tasks) => {
    const taskContext = tasks.map(t =>
        `- ${t.text} (Status: ${t.isCompleted ? 'Completed' : 'Pending'}, Created: ${t.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'})`
    ).join('\n');

    const systemPrompt = `
You are a helpful and motivational productivity assistant for a To-Do List app.
You have access to the user's current task list:
${taskContext}

Answer questions based on this data. Be concise, encouraging, and helpful.
If the user asks about their progress, analyze the completed vs pending tasks.
The user's latest message is:
`;

    // Gemini API (gemini-pro) typically takes a single prompt or a chat history.
    // For simplicity adapting to the existing chat structure, we'll construct a prompt from the last message
    // combined with context, or use startChat if we want full history. 
    // Given the previous OpenAI structure passed 'messages', let's stick to a simple prompt content generation
    // using the last user message, as providing full history requires mapping roles specifically for Gemini.

    // Extract last user message
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    const fullPrompt = `${systemPrompt}\n"${lastUserMessage}"`;

    try {
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Gemini AI Error:", error);
        return `AI Error: ${error.message || "Unknown error"}. Details: ${error.toString()}`;
    }
};
