const express = require("express");
const { authRegister, authLogin } = require("../controllers/auth.controller");

const authRote = express.Router();

authRote.post("/register", authRegister);
authRote.post("/login", authLogin);

module.exports = authRote;
