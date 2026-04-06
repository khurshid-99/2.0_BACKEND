import "dotenv/config";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import { PDFParse } from "pdf-parse";

const pc = new Pinecone({
  apiKey: process.env.PINCECONE_API_KEY,
});

const index = pc.Index("cohort-2-rag");

const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

const queryEmbedding = await embeddings.embedQuery(
  "how was the internship exeprience?",
);

const result = await index.query({
  vector: queryEmbedding,
  topK: 2,
  includeMetadata: true,
});

console.log(JSON.stringify(result));
