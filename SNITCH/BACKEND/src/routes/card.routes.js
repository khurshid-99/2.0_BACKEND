import { Router } from "express";
import { addToCart, getCart } from "../controllers/cart.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateUser, getCart);

export default cartRouter;
