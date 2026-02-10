import express from "express";
import {
  addUser,
  // getAllUsers,
  loginUser,
  fetchCurrentUser,
} from "../controller/authController.ts";
import { protect } from "../middleware/authMiddleware.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import { loginSchema, signupSchema } from "../schemas/authSchema.ts";

const router = express.Router();

router.post("/", validateSchema(signupSchema), addUser);

router.post("/login", validateSchema(loginSchema), loginUser);

router.get("/me", protect, fetchCurrentUser);

export default router;
