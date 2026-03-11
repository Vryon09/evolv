import type { Response } from "express";
import type { UserRequest } from "../types/express.ts";
import { handleError } from "../helper/HandleError.ts";
import { pomodoroService } from "../services/PomodoroService.ts";

export async function getPomodoroSettings(req: UserRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    res.status(200).json(req.user.pomodoroSettings);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updatePomodoroSettings(req: UserRequest, res: Response) {
  try {
    const updatedSettings = req.body;

    const { message } = await pomodoroService.updatePomodoroSettings(
      req.user!._id,
      updatedSettings,
    );

    res.status(200).json(message);
  } catch (error) {
    handleError(error, res);
  }
}
