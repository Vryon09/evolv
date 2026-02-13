import type { ObjectId } from "mongoose";
import type { IJournal } from "../models/Journal.ts";
import Journal from "../models/Journal.ts";
import User from "../models/User.ts";
import type { IUser } from "../models/User.ts";
import type { CreateJournalInput } from "../schemas/journalSchema.ts";
import { deleteJournal } from "../controller/journalController.ts";

export class JournalService {
  async getJournal(userId: ObjectId) {
    try {
      const journals = await User.findById(userId)
        .populate<{ journals: IJournal[] }>({
          path: "journals",
          model: Journal,
          match: { isArchived: false },
        })
        .select("journals");

      if (!journals) {
        throw new Error("User not found");
      }

      return journals.journals;
    } catch (error) {
      throw error;
    }
  }

  async addJournal(userId: ObjectId, datas: CreateJournalInput) {
    try {
      const newJournal = new Journal({ user: userId, ...datas });

      const savedJournal = await newJournal.save();

      await User.findByIdAndUpdate(userId, {
        $push: { journals: savedJournal._id },
      });

      return savedJournal;
    } catch (error) {
      throw error;
    }
  }

  async deleteJournal(authUser: IUser, journalId: string) {
    try {
      const user = await User.findById(authUser._id);

      if (!user) {
        throw new Error("User not found");
      }

      const deletedJournal = await Journal.findByIdAndDelete(journalId);

      const updatedUserMoods = authUser.habits.filter(
        (habit) => habit.toString() !== journalId,
      );

      user.habits = updatedUserMoods;

      await user.save();

      return deletedJournal;
    } catch (error) {
      throw error;
    }
  }
}

export const journalService = new JournalService();
