import express from "express";
import { getAllUsers } from "../controller/authController.ts";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/");

export default router;
