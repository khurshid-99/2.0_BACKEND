const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/about", (req, res) => {
  res.send("Hello i am about");
});

app.get("/job", (req, res) => {
  res.send("hay i will give you job ");
});

app.listen(3000);
