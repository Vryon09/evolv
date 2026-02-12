import type { IHabit } from "../models/Habit.ts";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";

export class HabitService {
  private getSortOptions(sortBy?: string) {
    const sortType: Record<string, number> = {};

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

  async getHabits(userId: string, sortBy?: string) {
    try {
      const sortType = this.getSortOptions(sortBy);

      const userWithHabits = await User.findById(userId)
        .populate<{ habits: IHabit[] }>({
          path: "habits",
          model: Habit,
          match: { isArchived: false },
          options: { sort: sortType },
        })
        .select("habits");

      if (!userWithHabits) {
        throw new Error("User not found");
      }

      return userWithHabits.habits;
    } catch (error) {
      throw error;
    }
  }
}

export const habitService = new HabitService();
