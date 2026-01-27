const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: "note created successfully",
  });
});

app.get("/notes", (req, res) => {
  res.send(notes);

  res.status(200).json({
    notes: "notes sended successfully",
  });
});

app.delete("/note/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(201).json({
    message: "note deleted successfully",
  });
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].discription = req.body.discription;

  res.status(200).json({
    discription: "discription updated successfully",
  });
});

app.put("/notes/:index", (req, res) => {
  notes[req.params.index] = req.body;

  res.status(200).json({
    note: `note this ${req.params.index} index contand update successfully`,
  });
});

module.exports = app;
