const express = require("express");
const { followUserController } = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/auth.middleware");

const followRouter = express.Router();

followRouter.post("/:username", identifyUser, followUserController);

module.exports = followRouter;
