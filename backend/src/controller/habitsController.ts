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

    const savedHabit = await habitService.completeHabit(id);

    res.status(200).json(savedHabit);
  } catch (error) {
    console.log("Error in completeHabit controller", error);
    res.status(500).json({ message: "Internal Server Error!" });
  }
}
