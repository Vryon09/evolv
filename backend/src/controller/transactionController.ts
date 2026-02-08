import type { Request, Response } from "express";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type { ITransaction } from "../models/Transaction.ts";

interface TransactionFilter {
  transactionType?: string;
  category?: string;
}

export async function getTransactions(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const { type, category } = req.query as {
      type?: string;
      category?: string;
    };

    const filter: TransactionFilter = {};

    if (type && type !== "All") {
      filter.transactionType = type;
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    const transactions = await User.findById(authUser._id)
      .populate<{
        transactions: ITransaction[];
      }>({
        path: "transactions",
        model: Transaction,
        match: { isArchived: false, ...filter },
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

export async function deleteTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const user = await User.findById(authUser._id);

    if (!user) {
      return res.status(401).json({ message: "No user found." });
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    const updatedUserTransactions = authUser.transactions.filter(
      (transaction: string) => transaction.toString() !== id,
    );

    user.transactions = updatedUserTransactions;

    await user.save();

    res.status(200).json(deletedTransaction);
  } catch (error) {
    console.error("Error in deleteTransaction Controller: " + error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}

export async function updateTransaction(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { transactionType, category, amount, description } = req.body;

    if (!id) {
      return res.status(201).json({ message: "No id found." });
    }

    const updatedTransactions = await Transaction.findByIdAndUpdate(
      id,
      {
        transactionType,
        category,
        amount,
        description,
      },
      { new: true },
    );

    res.status(200).json(updatedTransactions);
  } catch (error) {
    console.error("Error in updateTransaction Controller: " + error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}
