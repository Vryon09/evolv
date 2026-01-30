import type { Request, Response } from "express";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type { ITransaction } from "../models/Transaction.ts";

export async function getTransactions(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const transactions = await User.findById(authUser._id)
      .populate<{
        transactions: ITransaction[];
      }>({
        path: "transactions",
        model: Transaction,
        match: { isArchived: false },
      })
      .select("transactions");

    if (!transactions) {
      return res.status(401).json({ message: "User not found." });
    }

    res.status(200).json(transactions.transactions);
  } catch (error) {
    console.error("Error in getTransactions Controller!");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addTransaction(req: Request, res: Response) {
  try {
    const { transactionType, category, amount, description } = req.body;
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const newTransaction = new Transaction({
      user: authUser._id,
      transactionType,
      category,
      amount,
      description,
    });

    const savedTransaction = await newTransaction.save();

    await User.findByIdAndUpdate(authUser._id, {
      $push: { transactions: savedTransaction._id },
    });

    res.status(200).json(savedTransaction);
  } catch (error) {
    console.error("Error in addTransaction Controller!", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
