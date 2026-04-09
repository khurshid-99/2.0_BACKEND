import { ChatGoogle } from "@langchain/google";
import CONFIG from "../configs/config.ai.js";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";

export const GeminiModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: CONFIG.GOOGLE_API_KEY,
});

export const MistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: CONFIG.MISTRAL_API_KEY,
});

export const CohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: CONFIG.COHERE_API_KEY,
});
