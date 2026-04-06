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

// const dataBuffer = fs.readFileSync("./story.pdf");

// const parser = new PDFParse({ data: dataBuffer });

// const data = await parser.getText(parser);
// console.log(data);

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 0,
// });

// const chunks = await splitter.splitText(data.text);
// console.log(chunks)
// console.log(chunks.length)

const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

/**
 * this is test. how look embedding
 * const docs = await embeddings.embedDocuments(chunks)
 * console.log(docs)
 */

/**
 * embedding text to coordinate
 */
// const docs = await Promise.all(
//   chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk);
//     return {
//       text: chunk,
//       embedding,
//     };
//   }),
// );

// console.log(docs);

// const results = await index.upsert({
//   records: docs.map((doc, i) => ({
//     id: `doc-${i}`,
//     values: doc.embedding,
//     metadata: {
//       text: doc.text,
//     },
//   })),
// });

// console.log(results)