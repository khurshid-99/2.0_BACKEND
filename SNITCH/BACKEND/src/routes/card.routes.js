import { Router } from "express";
import {
  addToCart,
  getCart,
  incrementCartItem,
  createOrderController,
  verifyOrderController,
} from "../controllers/cart.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";
import {
  validateAddToCart,
  validateIncrementCartItem,
} from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.post(
  "/add/:productId/:variantId",
  authenticateUser,
  validateAddToCart,
  addToCart,
);

cartRouter.get("/", authenticateUser, getCart);

cartRouter.patch(
  "/quantity/increment/:productId/:variantId",
  authenticateUser,
  validateIncrementCartItem,
  incrementCartItem,
);

cartRouter.post(
  "/paymen/create/order",
  authenticateUser,
  createOrderController,
);

cartRouter.post(
  "/payment/verify/order",
  authenticateUser,
  verifyOrderController,
);
export default cartRouter;
