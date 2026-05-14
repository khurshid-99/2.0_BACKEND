import express from "express";

const app = express();

app.get("/app", (req, res) => {
  res.status(200).json({
    message: "Hello World",
    success: true,
  });
});

app.listen(3000, () => {
  console.log(`Server is running PORT 3000 http://localhost:8080/app `);
});
