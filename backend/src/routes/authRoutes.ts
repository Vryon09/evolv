import express from "express";
import {
  addUser,
  // getAllUsers,
  loginUser,
  fetchCurrentUser,
} from "../controller/authController.ts";
import { protect } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post("/", addUser);

router.post("/login", loginUser);

router.get("/me", protect, fetchCurrentUser);

export default router;
