import jwt from "jsonwebtoken";
import ENV from "../config/ENV";

const generateTokens = (payload: Record<string, any>) => {
  const access_token = jwt.sign(payload, ENV.ACCESS_SECRET, {
    expiresIn: "5m",
  });
  const refresh_token = jwt.sign(payload, ENV.REFRESH_SECRET, {
    expiresIn: "2d",
  });
  return { access_token, refresh_token };
};

export default generateTokens;
