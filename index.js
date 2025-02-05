import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { Exercise } from "./models/exerciseModel.js";
import workoutRoutes from "./Routes/exerciseRouter.js";
import userRoute from "./Routes/userRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
const mongoURI = process.env.MONGO_URI || 3000;

app.use("/workouts", workoutRoutes);
app.use("/user", userRoute);

if (!mongoURI) {
  console.error("MongoDB URI not found in environment variables");
  process.exit(1);
}

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
app.listen(process.env.PORT, () => {
  console.log("App is listenning");
});
