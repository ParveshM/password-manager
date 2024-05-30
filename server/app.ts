import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoute";
import morgan from "morgan";
import connectDb from "./config/connection";
import errorHandlingMidleware from "./middleware/errorHandler.middleware";
import CustomError from "./utils/customError";
import ENV from "./config/ENV";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRoute);

app.use(errorHandlingMidleware);
app.all("*", (req, res, next) => {
  next(new CustomError(`Not found ${req.url}`, 404));
});

// server
const port = ENV.PORT || 3000;

app.listen(port, () => {
  connectDb();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
