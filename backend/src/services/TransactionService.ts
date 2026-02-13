import type { ObjectId } from "mongoose";
import type { ITransaction } from "../models/Transaction.ts";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../schemas/transactionSchema.ts";
import type { IUser } from "../models/User.ts";

interface TransactionFilter {
  transactionType?: string;
  category?: string;
}

class TransactionService {
  async getTransactions(userId: ObjectId, type?: string, category?: string) {
    try {
      const filter: TransactionFilter = {};

      if (type && type !== "All") {
        filter.transactionType = type;
      }

      if (category && category !== "All") {
        filter.category = category;
      }

      const transactions = await User.findById(userId)
        .populate<{
          transactions: ITransaction[];
        }>({
          path: "transactions",
          model: Transaction,
          match: { isArchived: false, ...filter },
        })
        .select("transactions");

      if (!transactions) {
        throw new Error("User not found");
      }

      return transactions.transactions;
    } catch (error) {
      throw error;
    }
  }

  async addTransaction(userId: ObjectId, data: CreateTransactionInput) {
    try {
      const newTransaction = new Transaction({
        user: userId,
        ...data,
      });

      const savedTransaction = await newTransaction.save();

      await User.findByIdAndUpdate(userId, {
        $push: { transactions: savedTransaction._id },
      });

      return savedTransaction;
    } catch (error) {
      throw error;
    }
  }

  async deleteTransaction(authUser: IUser, transactionId: string) {
    try {
      const user = await User.findById(authUser._id);

      if (!user) {
        throw new Error("User not found");
      }

      const deletedTransaction =
        await Transaction.findByIdAndDelete(transactionId);

      const updatedUserTransactions = authUser.transactions.filter(
        (transaction) => transaction.toString() !== transactionId,
      );

      user.transactions = updatedUserTransactions;

      await user.save();
    } catch (error) {
      throw error;
    }
  }

  async updateTransaction(transactionId: string, data: UpdateTransactionInput) {
    try {
      if (!transactionId) {
        throw new Error("TransactionId not found");
      }

      const updatedTransactions = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          ...data,
        },
        { new: true },
      );

      return updatedTransactions;
    } catch (error) {
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
