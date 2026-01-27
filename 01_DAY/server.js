const exprss = require("express");

const app = exprss();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Welcome to BACKEND");
});
app.get("/home", (req, res) => {
  res.send("Hello Welcome to HOME");
});
app.get("/about", (req, res) => {
  res.send("Hello Welcome to ABOUT");
});

app.listen(PORT, () => {
  console.log(`app liseting on port ${PORT} `);
});
