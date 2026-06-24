const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const homeRouter = Router();

homeRouter.get("/", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Home fetched",
  });
});

module.exports = homeRouter;
