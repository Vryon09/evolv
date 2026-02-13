import type { ObjectId } from "mongoose";
import type { IMood } from "../models/Mood.ts";
import Mood from "../models/Mood.ts";
import User from "../models/User.ts";
import type { IUser } from "../models/User.ts";
import type { CreateMoodInput } from "../schemas/moodSchema.ts";

export class MoodService {
  async getMood(userId: ObjectId) {
    try {
      const userWithMoods = await User.findById(userId)
        .populate<{ moods: IMood[] }>({
          path: "moods",
          model: Mood,
          match: { isArchived: false },
        })
        .select("moods");

      if (!userWithMoods) {
        throw new Error("User not found");
      }

      return userWithMoods.moods;
    } catch (error) {
      throw error;
    }
  }

  async addMood(userId: ObjectId, data: CreateMoodInput) {
    try {
      const newMood = new Mood({
        user: userId,
        ...data,
      });

      const savedMood = await newMood.save();

      await User.findByIdAndUpdate(userId, {
        $push: { moods: savedMood._id },
      });

      return savedMood;
    } catch (error) {
      throw error;
    }
  }

  async deleteMood(authUser: IUser, moodId: string) {
    try {
      const deletedMood = await Mood.findByIdAndDelete(moodId);

      const user = await User.findById(authUser._id);

      if (!user) {
        throw new Error("User not found");
      }

      const updatedUserMoods = authUser.moods.filter(
        (mood) => mood.toString() !== moodId,
      );

      user.moods = updatedUserMoods;

      await user.save();
    } catch (error) {
      throw error;
    }
  }
}

export const moodService = new MoodService();
