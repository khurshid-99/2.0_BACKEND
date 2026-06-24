const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express");
const authRoute = require("./routers/auth.route");
const homeRouter = require("./routers/home.route");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/home", homeRouter);

module.exports = app;
