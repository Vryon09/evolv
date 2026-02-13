import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isoWeek from "dayjs/plugin/isoWeek.js";
import timezone from "dayjs/plugin/timezone.js";
import { recalcBestStreakDate } from "../helper/RecalcBestStreakDate.ts";
import { habitService } from "../services/HabitService.ts";
import type { UserRequest } from "../types/express.ts";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

interface sortTypes {
  createdAt?: number;
  streak?: number;
}

export async function getHabits(req: UserRequest, res: Response) {
  try {
    const { sortBy } = req.query as { sortBy?: string };

    const habits = await habitService.getHabits(
      req.user._id.toString(),
      sortBy,
    );

    res.status(200).json(habits);
  } catch (error) {
    console.error("Error in getHabits controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addHabit(req: UserRequest, res: Response): Promise<void> {
  try {
    const habit = habitService.addHabit(req.user._id.toString(), req.body);

    res.status(201).json(habit);
  } catch (error) {
    console.error("Error in addHabit controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updatedHabit = habitService.updateHabit(id, req.body);

    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error("Error in updateHabit controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteHabit(req: UserRequest, res: Response) {
  try {
    const { id } = req.params;

    const deletedHabit = await habitService.deleteHabit(id, req.user);

    res.status(200).json(deletedHabit);
  } catch (error) {
    console.log("Error in deleteHabit controller", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function completeHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const habit = await Habit.findById(id);

    if (!habit) {
      res.status(401).json({ message: "Habit not found" });
      return;
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
      res.status(200).json(savedHabit);
      return;
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

    res.status(200).json(savedHabit);
  } catch (error) {
    console.log("Error in completeHabit controller", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
