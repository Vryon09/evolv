import { Router } from "express";
import { protect } from "../middleware/authMiddleware.ts";
import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "../controller/transactionController.ts";
import { validateSchema } from "../middleware/validateSchema.ts";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../schemas/transactionSchema.ts";

const router = Router();

router.get("/", protect, getTransactions);
router.post(
  "/",
  protect,
  validateSchema(createTransactionSchema),
  addTransaction,
);
router.delete("/:id", protect, deleteTransaction);
router.patch(
  "/:id",
  protect,
  validateSchema(updateTransactionSchema),
  updateTransaction,
);

export default router;
