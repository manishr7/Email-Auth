import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import router from "./Routes/userRoutes.js";

const app = express();
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOpts));
const port = process.env.PORT;
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Deployed!");
});
app.use("/api/user", router);

const DB_URL = process.env.CONNECTION_URL || 8080;

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(DB_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

connectDB().then(() => {
  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
  })
})