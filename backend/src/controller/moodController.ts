import type { Request, Response } from "express";
import { handleError } from "../helper/HandleError.ts";
import { moodService } from "../services/MoodService.ts";
import type { UserRequest } from "../types/express.ts";

export async function getMood(req: UserRequest, res: Response) {
  try {
    const moods = await moodService.getMood(req.user._id);

    res.status(200).json(moods);
  } catch (error) {
    handleError(error, res);
  }
}

export async function addMood(req: UserRequest, res: Response) {
  try {
    const savedMood = moodService.addMood(req.user._id, req.body);

    res.status(201).json(savedMood);
  } catch (error) {
    handleError(error, res);
  }
}

export async function deleteMood(req: UserRequest, res: Response) {
  try {
    const deletedMood = moodService.deleteMood(req.user, req.params.id);

    res.status(200).json(deletedMood);
  } catch (error) {
    handleError(error, res);
  }
}
