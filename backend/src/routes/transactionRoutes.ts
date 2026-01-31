import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
} from "../controller/transactionController.ts";

const router = Router();

router.get("/", protect, getTransactions);
router.post("/", protect, addTransaction);
router.delete("/:id", protect, deleteTransaction);

export default router;
