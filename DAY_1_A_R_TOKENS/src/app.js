const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const express = require("express")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cookieParser())


module.exports= app