import express from "express";
import { addUser, getAllUsers } from "../controller/authController.ts";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", addUser);

export default router;
