import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogle } from "@langchain/google";
import { ChatCohere } from "@langchain/cohere";
import config from "../configs/configs.js";


// gemini-flash-latest
// command-a-03-2025
// mistral-medium-latest


export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API_KEY,
});

export const googleModle = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: config.GOOGLE_API_KEY,
});

export const cohereModle = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API_KEY,
});
