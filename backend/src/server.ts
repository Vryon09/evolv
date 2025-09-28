import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  console.log("Test");
  res.status(200).json({ message: "Test" });
});

app.listen(process.env.PORT, () =>
  console.log("Listening to PORT: " + process.env.PORT)
);
