const express = require("express");
const noteModel = require("./model/note.model");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// POST - Create user and save data in server
// const { name, image, description } = req.body;

app.post("/api/notes", async (req, res) => {
  const { name, image, description } = req.body;

  const note = await noteModel.create({
    name,
    image,
    description,
  });

  res.status(201).json({
    message: "User Create Successfully",
    note,
  });
});

// GET - Get featch all data from databas and send frontend
// 

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes featch successfully ",
    notes,
  });
});

// DELETED - Delete note
app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// PATCH - Patch update a note 
app.patch("/api/notes/:id", async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  const updateNote = await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note's description update successfully",
    updateNote,
  });
});

module.exports = app;
