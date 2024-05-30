import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import CustomError from "../utils/customError";
import User from "../models/User";
import bcrypt from "bcrypt";
import generateTokens from "../utils/generate-token";
import { HttpStatus } from "../Types/HttpStatus";
import Password from "../models/Password";

/**
 ** METHOD:POST
 ** User Signup
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
 ** METHOD:POST
 ** User Login
 */
export const USER_LOGIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const isEmailExist = await User.findOne({ email });
    if (!isEmailExist) {
      throw new CustomError("Invalid credentials", 401);
    }
    const isPasswordMatch = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!isPasswordMatch) throw new CustomError("Invalid credentials", 401);
    const payload = {
      id: isEmailExist._id,
      name: isEmailExist.name,
      email: isEmailExist.email,
    };
    const { access_token, refresh_token } = generateTokens(payload);

    return res.status(200).json({
      success: true,
      message: "User LoggedIn successfully",
      access_token,
      refresh_token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 ** Method :GET
 ** Fetch saved password by user
 */

export const fetchPasswords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const passwords = await Password.find({ user: req.user });
    res.status(200).json({
      success: true,
      passwords,
      message: "Passwords fetched successfully",
    });
  } catch (error) {
    next(new CustomError("Fetching password failed", HttpStatus.FOUND));
  }
};

/**
 ** Method :POST
 ** Create new password for user
 */

export const createNewPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, password } = req.body;

    const isnameUsed = await Password.findOne({
      user: req.user,
      name: new RegExp(`^${name}$`, "i"),
    });
    if (isnameUsed)
      throw new CustomError("Name already in use", HttpStatus.CONFLICT);

    const newPassword = await Password.create({
      user: req.user,
      name,
      password,
    });
    res.status(200).json({
      success: true,
      newPassword,
      message: "Password saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 ** Method :PUT
 ** Update created password
 */

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Password.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(new CustomError("Updating password failed", HttpStatus.FOUND));
  }
};

/**
 ** Method :DELETE
 ** DELETE created password
 */

export const deletePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    await Password.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Password deleted successfully",
    });
  } catch (error) {
    next(new CustomError("Deleting password failed", HttpStatus.FOUND));
  }
};
