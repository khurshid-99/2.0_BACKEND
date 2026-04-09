import express from "express";
import runGraph from "./ai/graph.ai.js";

const app = express();

app.post("/", async (req, res) => {
  const results = await runGraph("Who is first invent Camera?");

  res.status(200).json({
    message: "Ok",
    results,
  });
});

export default app;
