import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});

while (true) {
  const userInput = await rl.question("Me: ");
  const respons = await model.invoke(userInput);
  console.log(`AI:  ${respons.text}`);
}

rl.close();
