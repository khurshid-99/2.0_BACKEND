import express from "express";
import morgan from "morgan";
import cors from "cors"

const app = express();
app.use(morgan("dev"))
app.use(express.static("public"))

app.get("/api/users", (req, res) => {
  const user = [
    { id: 1, name: "mahabub" },
    { id: 2, name: "khurshid" },
    { id: 3, name: "polo/Kuldeep" },
    { id: 4, name: "muckesh" },
  ];
  res.status(200).json({
    user,
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("*name", (req, res) => {
    res.sendFile("public/index.html", { root: __dirname });
});


app.listen(3000,() => {
  console.log(`Server is running on PORT http://localhost:3000 `);
});
