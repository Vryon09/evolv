import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.ts";
import authRoutes from "./routes/authRoutes.ts";
import habitRoutes from "./routes/habitRoutes.ts";
import tagRoutes from "./routes/tagRoutes.ts";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/tags", tagRoutes);

connectDB();

app.listen(process.env.PORT, () =>
  console.log("Listening to PORT: " + process.env.PORT)
);
