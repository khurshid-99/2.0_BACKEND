const express = require("express");
const notesModel = require("./model/notes.model");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// CREATE NEW NOTES AND SAVE DATA IN MONGODB
// API - /api/notes
// req.body = {titel, description}

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const notes = await notesModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    notes,
  });
});

// GET /api/notes
// Fetch all the notes data from the mongodb and send them in the respones

app.get("/api/notes", async (req, res) => {
  const notes = await notesModel.find();

  res.status(200).json({
    message: "Notes send successfull",
    notes,
  });
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

app.patch("/api/notes/:id", async (req, res) => {
  const { id } = req.params();
  const { description } = req.body;

  const noteDescription = await notesModel.findByIdAndUpdate(id, {
    description,
  });

  res.status(200).json({
    message: "Note's desctiption updated successfully",
    note: noteDescription,
  });
});

module.exports = app;
