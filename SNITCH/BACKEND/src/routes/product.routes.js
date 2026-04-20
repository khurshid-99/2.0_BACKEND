import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import {
  addProductVariant,
  createProduct,
  getAllProductsController,
  getSellerProduct,
  productDetilsController,
} from "../controllers/product.controller.js";
import { productValidator } from "../validators/producter.validetor.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const productRouter = Router();

productRouter.post(
  "/",
  authenticateSeller,
  upload.array("images", 7),
  productValidator,
  createProduct,
);

productRouter.get("/seller-products", authenticateSeller, getSellerProduct);
productRouter.get("/", getAllProductsController);
productRouter.get("/detils/:productId", productDetilsController);
productRouter.post(
  "/:productId/variants",
  authenticateSeller,
  upload.array("images", 7),
  addProductVariant,
);

export default productRouter;
