const express = require("express");
const noteModel = require("./model/note.model");
const cors = require("cors");

const app = express();

//  Meddilewear

app.use(express.json());
app.use(cors());

// POST - Create a note and store in data base,

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// GET - Get all notes from data base

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Get all Notes successfully",
    notes,
  });
});

// DELETE - Delete a note from database

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// PATCH - Update a specific item form note like Description

app.patch("/api/notes/:id", async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  const updateNoteDescription = await noteModel.findByIdAndUpdate(id, {
    description,
  });

  res.status(200).json({
    message: "Note updated successfully",
    description: updateNoteDescription,
  });
});

module.exports = app;
