import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoute";
import morgan from "morgan";
import connectDb from "./config/connection";

const app: Express = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", userRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  connectDb();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
