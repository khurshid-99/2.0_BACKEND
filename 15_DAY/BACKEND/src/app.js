const express = require("express");
const authRote = require("./routers/auth.route");
const cookieParser = require("cookie-parser");
const postRoute = require("./routers/post.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRote);
app.use("/api/post", postRoute);

module.exports = app;
