import jwt from "jsonwebtoken";
import ENV from "../config/ENV";

const generateTokens = (payload: Record<string, any>) => {
  const access_token = jwt.sign(payload, ENV.ACCESS_SECRET, {
    expiresIn: "2d",
  });

  return { access_token };
};

export default generateTokens;
