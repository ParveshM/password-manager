import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import CustomError from "../utils/customError";
import User from "../models/User";

/**
 * User signup
 */
export const USER_SIGNUP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      throw new CustomError("Email already exists", 401);
    }

    await User.create(req.body);

    return res
      .status(200)
      .json({ success: true, message: "User registration success" });
  } catch (error) {
    next(error);
  }
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
