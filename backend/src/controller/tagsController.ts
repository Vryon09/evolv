import type { Request, Response } from "express";
import User from "../models/User.ts";

export async function getTags(req: Request, res: Response) {
  try {
    const authUser = (req as any).user;

    const user = await User.findById(authUser._id).select("tags");

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    return res.status(200).json(user.tags);
  } catch (error) {
    console.error("Error in getTags controller.", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function addTag(req: Request, res: Response) {
  try {
    const { tag } = req.body;
    const authUser = (req as any).user;

    const user = await User.findById(authUser._id);

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    if (user.tags.includes(tag.toLowerCase().trim())) {
      res.status(400).json({ message: "Tag already exists." });
      return;
    }

    user.tags.push(tag);
    await user.save();

    res.status(201).json(user.tags);
  } catch (error) {
    console.error("Error in addHabit controller.", error);
    res.status(500).json({ message: "Internam Server Error" });
  }
}
