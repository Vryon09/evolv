import type { Request, Response } from "express";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type { ITransaction } from "../models/Transaction.ts";
import { handleError } from "../helper/HandleError.ts";
import type { UserRequest } from "../types/express.ts";
import { transactionService } from "../services/TransactionService.ts";

export async function getTransactions(req: UserRequest, res: Response) {
  try {
    const { type, category } = req.query as {
      type?: string;
      category?: string;
    };

    const transactions = await transactionService.getTransactions(
      req.user!._id,
      type,
      category,
    );

    res.status(200).json(transactions);
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
