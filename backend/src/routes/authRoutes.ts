import express from "express";
import {
  addUser,
  getAllUsers,
  loginUser,
} from "../controller/authController.ts";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", addUser);

router.post("/login", loginUser);

export default router;
