import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HttpStatus } from "../Types/HttpStatus";
import ENV from "../config/ENV";
import CustomError from "../utils/customError";

// extending the request interface to include the user object in the req
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
// verify the token and validate user
export default async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(HttpStatus.FORBIDDEN).json("Your are not authenticated");
  }
  const access_token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(access_token, ENV.ACCESS_SECRET) as JwtPayload;
    req.user = user.id;
    next();
  } catch (error) {
    next(new CustomError("Token is not valid", HttpStatus.FORBIDDEN));
  }
}
