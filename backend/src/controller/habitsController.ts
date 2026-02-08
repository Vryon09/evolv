import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import type { IHabit } from "../models/Habit.ts";
import User from "../models/User.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isoWeek from "dayjs/plugin/isoWeek.js";
import timezone from "dayjs/plugin/timezone.js";
import { recalcBestStreakDate } from "../helper/RecalcBestStreakDate.ts";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

interface sortTypes {
  createdAt?: number;
  streak?: number;
}

export async function getHabits(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;
    const { sortBy } = req.query;
    const sortType: sortTypes = {};

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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

    const userWithHabits = await User.findById(authUser._id)
      .populate<{ habits: IHabit[] }>({
        path: "habits",
        model: Habit,
        match: { isArchived: false },
        options: { sort: sortType },
      })
      .select("habits");

    if (!userWithHabits) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userWithHabits.habits);
  } catch (error) {
    console.error("Error in getHabits controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function addHabit(req: Request, res: Response): Promise<void> {
  try {
    const authUser = (req as any).user;

    const { title, description, frequency, tags } = req.body;

    const newHabit = new Habit({
      user: authUser._id,
      title,
      description,
      frequency,
      tags,
    });

    const savedHabit = await newHabit.save();

    await User.findByIdAndUpdate(authUser._id, {
      $push: { habits: savedHabit._id },
    });

    res.status(201).json(savedHabit);
  } catch (error) {
    console.error("Error in addHabit controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function updateHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      res.status(401).json({ message: "No id passed" });
    }

    const updatedHabit = await Habit.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedHabit) {
      res.status(404).json({ message: "Habit not found" });
      return;
    }

    res.status(200).json(updatedHabit);
  } catch (error) {
    console.error("Error in updateHabit controller.", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}

export async function deleteHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedHabit = await Habit.findByIdAndDelete(id);

    const authUser = (req as any).user;

    if (!authUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const updatedUserHabit = authUser.habits.filter(
      (habit: string) => habit.toString() !== id,
    );

    const habitUser = await User.findById(authUser._id);

    if (!habitUser) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    habitUser.habits = updatedUserHabit;

    await habitUser.save();

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
          frequency: habit.frequency,
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
