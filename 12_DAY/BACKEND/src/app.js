const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routers/auth.user");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth", authRouter);

module.exports = app;
