const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

// Ths is Create notes
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.send("notes Created");
});

// This is show notes
app.get("/notes", (req, res) => {
  res.send({ notes: notes });
});

// This is Delete note
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(200).json({
    massages: "note deleted",
  });
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].discription = req.body.discription;

  res.send("note updated successfully")
});

module.exports = app;
