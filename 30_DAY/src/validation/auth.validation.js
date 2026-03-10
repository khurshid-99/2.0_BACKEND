import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  res.status(400).json({
    errors: errors.array(),
  });
};

export const registerValidation = [
  body("username").isString().withMessage("username should be string"),
  body("email").isEmail().withMessage("email should be valid email address"),
  body("password")
    .isNumeric()
    .isLength({ min: 6, max: 10 })
    .withMessage("password should be between 6 and 10 characters long"),
  validate,
];

//

/**
 * 
 body("password")
  .custom((value) => {
    if (value < 6) {
      throw new Error("password should be at least 6 characters long");
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (passwordRegex.test(value)) {
      throw new Error(
        "passwored should contain at least one uooercase letter and one number",
      );
    }
    return true;
  })
  .withMessage(
    "passwored should contain at least one uooercase letter and one number",
  );

 */
