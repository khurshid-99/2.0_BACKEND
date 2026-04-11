import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "POST",
    credentials: true,
  }),
);

app.post("/", async (req, res) => {
  // const results = await runGraph("Who is first invent Camera?");

  const { inputMessage } = req.body;

  const results = await runGraph(inputMessage);

  return res.status(200).json({
    messages: "Graph run successfully.",
    success: true,
    results,
  });
});

export default app;
