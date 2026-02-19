const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

// express middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

/**
 * @API apiName
 * @DESCRIPTION  description
 * @CLIENT_INPUT  data received from client
 * @RESPONSE  what this API returns
 * @AUTHOR  KHURSHID ALAM
 */
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.route");
const followRouter = require("./routes/follow.route");
const likeRouter = require("./routes/like.route");

app.use("/api/auth/", authRouter);
app.use("/api/posts/", postRouter);
app.use("/api/user/", followRouter);
app.use("/api/post/", likeRouter);

module.exports = app;
