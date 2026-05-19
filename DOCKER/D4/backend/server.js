import express from "express";

const app = express();

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

app.listen(3000, () => {
  console.log(`Server is running on PORT http://localhost:3000 `);
});
