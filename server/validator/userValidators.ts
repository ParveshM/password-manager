import { body } from "express-validator";

export const userSignupValidator = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .trim(),
];

export const passwordValidator = [
  body("label").isString(),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must be at least 6 characters long.")
    .trim(),
];
