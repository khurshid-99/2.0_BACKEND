import "dotenv/config";
import fs from "fs";

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PDFParse } from "pdf-parse";

let dataBuffer = fs.readFileSync("./story.pdf");

const parser = new PDFParse({
  data: dataBuffer,
});

const data = await parser.getText()

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const texts = await splitter.splitText(data.text);
console.log(texts)