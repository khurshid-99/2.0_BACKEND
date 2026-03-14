import "dotenv/config";

import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from "./email.service.js";
import * as z from "zod";

const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send Email",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

const agent = createAgent ({
  model,
  tools: [emailTool],
});

const messages  = [];

while (true) {
  const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");

  messages.push(new HumanMessage(userInput));

  const respons = await agent.invoke({ messages });

  messages.push(respons.messages[respons.messages.length - 1]);

  console.log(`AI :  ${respons.messages[respons.messages.length - 1].content} `);
}
