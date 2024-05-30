import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * User signup
 */
export const USER_SIGNUP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;

  return res
    .status(200)
    .json({ success: true, message: "User registration success" });
};

/**
 * User Login
 */
export const USER_LOGIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(200)
    .json({ success: true, message: "User LoggedIn successfully" });
};
