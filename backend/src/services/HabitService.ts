import type { IHabit } from "../models/Habit.ts";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";
import type {
  CreateHabitInput,
  UpdateHabitInput,
} from "../schemas/habitSchema.ts";
import type { IUser } from "../models/User.ts";
import dayjs from "dayjs";
import { recalcBestStreakDate } from "../helper/RecalcBestStreakDate.ts";
import { calculateSkip } from "../types/pagination.ts";

export class HabitService {
  private getSortOptions(sortBy?: string) {
    const sortType: Record<string, 1 | -1> = {};

    switch (sortBy) {
      case "recent":
        sortType.createdAt = -1;
        break;
      case "streak":
        sortType.streak = -1;
        break;
      default:
        sortType.createdAt = 1;
        break;
    }

    return sortType;
  }

  async getHabits(
    userId: string,
    sortBy: string = "",
    page: number = 1,
    limit: number = 3,
  ) {
    try {
      const sortType = this.getSortOptions(sortBy);
      const skip = calculateSkip(page, limit);

      const totalHabits = await Habit.countDocuments({
        user: userId,
        isArchived: false,
      });

      const habits = await Habit.find({ user: userId, isArchived: false })
        .sort(sortType)
        .skip(skip)
        .limit(limit);

      return {
        habits,
        pagination: {
          page,
          limit,
          total: totalHabits,
          pages: Math.ceil(totalHabits / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async addHabit(userId: string, data: CreateHabitInput) {
    try {
      const newHabit = new Habit({
        user: userId,
        ...data,
      });

      const savedHabit = await newHabit.save();

      await User.findByIdAndUpdate(userId, {
        $push: { habits: savedHabit._id },
      });

      return savedHabit;
    } catch (error) {
      throw error;
    }
  }

  async updateHabit(habitId: string, updatedData: UpdateHabitInput) {
    try {
      const updatedHabit = await Habit.findByIdAndUpdate(habitId, updatedData, {
        new: true,
      });

      if (!updatedHabit) {
        throw new Error("Habit not found");
      }

      return updatedHabit;
    } catch (error) {
      throw error;
    }
  }

  async deleteHabit(habitId: string, authUser: IUser) {
    const deletedHabit = await Habit.findByIdAndDelete(habitId);

    const updatedUserHabit = authUser.habits.filter(
      (habit) => habit.toString() !== habitId,
    );

    const habitUser = await User.findById(authUser._id);

    if (!habitUser) {
      throw new Error("Habit not found");
    }

    habitUser.habits = updatedUserHabit;

    await habitUser.save();
  }

  async completeHabit(habitId: string) {
    const habit = await Habit.findById(habitId);

    if (!habit) {
      throw new Error("Habit not found");
    }

    const sortedDates = [...habit.completedDates].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );

    const isDuplicate = habit.completedDates.some((date) =>
      habit.frequency === "daily"
        ? dayjs(date).isSame(dayjs(), "day")
        : habit.frequency === "weekly"
          ? dayjs(date).isSame(dayjs(), "isoWeek")
          : dayjs(date).isSame(dayjs(), "month"),
    );

    const timeUnit =
      habit.frequency === "daily"
        ? "day"
        : habit.frequency === "weekly"
          ? "week"
          : "month";

    const frequencyUnit =
      habit.frequency === "daily"
        ? "day"
        : habit.frequency === "weekly"
          ? "isoWeek"
          : "month";

    //If there is duplicate || already completed || unmark
    if (isDuplicate) {
      const updatedCompletedDates = sortedDates.filter(
        (date) => !dayjs(date).isSame(dayjs(), frequencyUnit),
      );

      habit.completedDates = updatedCompletedDates;

      if (
        habit.streak === habit.bestStreak &&
        habit.completedDates.length > 0 &&
        dayjs(habit.bestStreakAchievedAt).isSame(dayjs(), frequencyUnit)
      ) {
        habit.bestStreakAchievedAt = recalcBestStreakDate({
          dates: updatedCompletedDates,
          frequency: habit.frequency as "daily" | "weekly" | "monthly",
        });

        habit.bestStreak--;
      }

      habit.streak--;

      if (habit.completedDates.length === 0) {
        habit.bestStreakAchievedAt = null;
      }

      const savedHabit = await habit.save();
      return savedHabit;
    }

    //If not duplicate || not completed || mark
    if (habit.completedDates.length === 0) {
      habit.streak++;
    }

    if (
      dayjs(sortedDates[habit.completedDates.length - 1])
        .add(1, timeUnit)
        .isSame(dayjs(), frequencyUnit)
    ) {
      habit.streak++;
    } else {
      habit.streak = 1;
    }

    habit.completedDates.push(dayjs().toDate());

    if (habit.bestStreak < habit.streak) {
      habit.bestStreak = habit.streak;
      habit.bestStreakAchievedAt = new Date();
    }

    const savedHabit = await habit.save();

    return savedHabit;
  }
}

export const habitService = new HabitService();
