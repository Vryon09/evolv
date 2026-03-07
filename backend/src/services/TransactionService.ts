import type { ObjectId } from "mongoose";
import type { ITransaction } from "../models/Transaction.ts";
import User from "../models/User.ts";
import Transaction from "../models/Transaction.ts";
import type {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../schemas/transactionSchema.ts";
import type { IUser } from "../models/User.ts";
import { generateMockTransaction } from "../helper/MockTransactions.ts";
import { calculateSkip } from "../types/pagination.ts";

interface TransactionFilter {
  transactionType?: string;
  category?: string;
}

interface IGetTransactions {
  userId: ObjectId;
  type?: string;
  category?: string;
  limit: number;
  page: number;
}

class TransactionService {
  async getTransactions({
    userId,
    type,
    category,
    limit = 10,
    page,
  }: IGetTransactions) {
    try {
      const skip = calculateSkip(page, limit);

      const filter: TransactionFilter = {};

      if (type && type !== "All") {
        filter.transactionType = type;
      }

      if (category && category !== "All") {
        filter.category = category;
      }

      const transactions = await Transaction.find({
        user: userId,
        isArchived: false,
        ...filter,
      })
        .skip(skip)
        .limit(limit);

      const transactionsLength = await Transaction.countDocuments({
        user: userId,
        isArchived: false,
      });

      if (!transactions) {
        throw new Error("User not found");
      }

      return {
        transactions,
        pagination: {
          limit,
          total: transactionsLength,
          page: page,
          pages: Math.ceil(transactionsLength / limit),
        },
      };
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

  async resetTransactions(userId: ObjectId) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      await Transaction.deleteMany({ user: user._id });

      user.transactions = [];

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

  async seedMockTransactions(
    userId: ObjectId,
    count: number = 20,
  ): Promise<void> {
    const results = await Promise.allSettled(
      Array.from({ length: count }, () => {
        const data = generateMockTransaction();
        return this.addTransaction(userId, data);
      }),
    );

    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`Seeded ${succeeded}/${count} transactions. Failed: ${failed}`);
  }

  async getTransactionsStats(userId: ObjectId) {
    try {
      const totalTransactions = await Transaction.countDocuments({
        user: userId,
        isArchived: false,
      });

      if (!totalTransactions) {
        return { _id: null, totalIncome: 0, totalExpense: 0 };
      }

      const stats = await Transaction.aggregate([
        { $match: { user: userId, isArchived: false } },
        {
          $group: {
            _id: null,
            totalIncome: {
              $sum: {
                $cond: [{ $eq: ["$transactionType", "Income"] }, "$amount", 0],
              },
            },
            totalExpense: {
              $sum: {
                $cond: [{ $eq: ["$transactionType", "Expense"] }, "$amount", 0],
              },
            },
          },
        },
      ]);

      return stats[0];
    } catch (error) {
      throw error;
    }
  }
}

export const transactionService = new TransactionService();
