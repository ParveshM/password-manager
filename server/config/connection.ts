import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.error("Database connected succesfully 🚀");
  } catch (error) {
    console.error("Mongo connection error ❌", error);
  }
}
