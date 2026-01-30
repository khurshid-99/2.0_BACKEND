const express = require("express");
const app = express();
const noteModel = require("./models/note.model");
app.use(express.json())

app.get("/", (req, res) => {
  res.send("hellow");
});

// Created Note Using POST methode

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  console.log(title, description);
  
  if(!title || !description) return res.send("No data")

  const note = await noteModel.create({
    title: title,
    description: description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// Get Notes Using GET methode

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Send all notes Successfully",
    notes,
  });
});

module.exports = app;
