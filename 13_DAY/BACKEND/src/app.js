const express = require("express");
const authRoute = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoute);

module.exports = app;
