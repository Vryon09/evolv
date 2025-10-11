import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";

export async function getHabits(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    if (!authUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userWithHabits = await User.findById(authUser._id)
      .populate({
        path: "habits",
        model: Habit,
        match: { isArchived: false },
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
    const { title, description, frequency, tags } = req.body;
    const authUser = (req as any).user;

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
      (habit: string) => habit.toString() !== id
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
