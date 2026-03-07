import type { Request, Response } from "express";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type { ITransaction } from "../models/Transaction.ts";
import { handleError } from "../helper/HandleError.ts";
import type { UserRequest } from "../types/express.ts";
import { transactionService } from "../services/TransactionService.ts";
import type { PaginatedResponse } from "../types/pagination.ts";

export async function getTransactions(req: UserRequest, res: Response) {
  try {
    const { type, category, limit, page } = req.query as {
      type?: string;
      category?: string;
      limit?: number;
      page?: number;
    };

    const { transactions, pagination } =
      await transactionService.getTransactions({
        userId: req.user!._id,
        type,
        category,
        limit: limit!,
        page: page!,
      });

    const response: PaginatedResponse<any> = {
      success: true,
      data: transactions,
      pagination,
    };

    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}

export async function addTransaction(req: UserRequest, res: Response) {
  try {
    const savedTransaction = await transactionService.addTransaction(
      req.user!._id,
      req.body,
    );

    res.status(200).json(savedTransaction);
  } catch (error) {
    handleError(error, res);
  }
}

export async function deleteTransaction(req: UserRequest, res: Response) {
  try {
    const deletedTransaction = await transactionService.deleteTransaction(
      req.user!,
      req.params.id,
    );

    res.status(200).json(deletedTransaction);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const updatedTransactions = await transactionService.updateTransaction(
      req.params.id,
      req.body,
    );

    res.status(200).json(updatedTransactions);
  } catch (error) {
    handleError(error, res);
  }
}

export async function resetTransactions(req: UserRequest, res: Response) {
  try {
    await transactionService.resetTransactions(req.user!._id);

    res
      .status(200)
      .json({ success: true, message: "All transaction has been deleted." });
  } catch (error) {
    handleError(error, res);
  }
}

export async function seedMockTransactions(req: UserRequest, res: Response) {
  try {
    await transactionService.seedMockTransactions(req.user!._id, 20);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getTransactionsStats(req: UserRequest, res: Response) {
  try {
    const { totalIncome, totalExpense } =
      await transactionService.getTransactionsStats(req.user!._id);

    res
      .status(200)
      .json({ totalIncome, totalExpense, balance: totalIncome - totalExpense });
  } catch (error) {
    handleError(error, res);
  }
}
