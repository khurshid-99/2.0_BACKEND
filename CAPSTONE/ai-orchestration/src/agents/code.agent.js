import "dotenv/config";
import { ChatMistralAI } from "@langchain/mistralai";
import { listFiles, readFiles, updateFiles } from "./tools.js";
import {createAgent} from "langchain"

const modelMistralAI = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRALAI_API_KEY,
});


const agent = createAgent({
    modelMistralAI,
    tools: [listFiles, readFiles, updateFiles],
    systemPrompt: `
    
    `
})

agent.invoke({
    messages:[
        {
            role: "user",
            content: ""
        }
    ]
})