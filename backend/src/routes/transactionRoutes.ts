import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import {
  addTransaction,
  getTransactions,
} from "../controller/transactionController.ts";

const router = Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);

export default router;
