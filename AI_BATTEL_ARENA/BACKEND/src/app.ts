import express from "express";
import useGraph from "./services/grap.ai.service.js";

const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "App is Working",
    status: "ok",
  });
});

app.post("/use-graph", async (req, res) => {
  const data = await useGraph(`What is the captial of India?`);

  return res.status(200).json({
    data: data
  })
});

export default app;
