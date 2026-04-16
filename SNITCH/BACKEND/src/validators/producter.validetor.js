import { body, validationResult } from "express-validator";

async function validateRequest(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "validation error",
      errors: errors.array(),
    });
  }

  next();
}

export const productValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Discription is required"),
  body("priceAmount").notEmpty().withMessage("Price amount must be number"),
  body("priceCurrency").notEmpty().withMessage("Price currency required"),
  validateRequest
];
