import type { Request, Response } from "express";
import Habit from "../models/Habit.ts";
import User from "../models/User.ts";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isoWeek from "dayjs/plugin/isoWeek.js";
import timezone from "dayjs/plugin/timezone.js";
import { habitService } from "../services/HabitService.ts";
import type { UserRequest } from "../types/express.ts";
import { handleError } from "../helper/HandleError.ts";
import { parsePaginationParams } from "../types/pagination.ts";
import type { PaginatedResponse } from "../types/pagination.ts";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);

export async function getAllHabits(req: UserRequest, res: Response) {
  try {
    const { sortBy } = req.query as { sortBy?: string };
    const allHabits = await habitService.getAllHabits(req.user._id, sortBy);

    res.status(200).json(allHabits);
  } catch (error) {
    handleError(error, res);
  }
}

export async function getHabits(req: UserRequest, res: Response) {
  try {
    const { sortBy, page, limit } = req.query as {
      sortBy?: string;
      page?: string;
      limit?: string;
    };

    const { page: parsedPage, limit: parsedLimit } = parsePaginationParams({
      page,
      limit,
    });

    const { habits, pagination } = await habitService.getHabits(
      req.user._id.toString(),
      sortBy,
      parsedPage,
      parsedLimit,
    );

    const response: PaginatedResponse<any> = {
      success: true,
      data: habits,
      pagination,
    };

    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}

// export async function getHabitsSummary(req: UserRequest, res: Response){
// try {
//   const habitsSummary = await habitService.getHabitsSummary()

//   res.status(200).json(habitsSummary)
// } catch (error) {
//     handleError(error, res);

// }
// }

export async function addHabit(req: UserRequest, res: Response): Promise<void> {
  try {
    const habit = habitService.addHabit(req.user._id.toString(), req.body);

    res.status(201).json(habit);
  } catch (error) {
    handleError(error, res);
  }
}

export async function updateHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updatedHabit = habitService.updateHabit(id, req.body);

    res.status(200).json(updatedHabit);
  } catch (error) {
    handleError(error, res);
  }
}

export async function deleteHabit(req: UserRequest, res: Response) {
  try {
    const { id } = req.params;

    const deletedHabit = await habitService.deleteHabit(id, req.user);

    res.status(200).json(deletedHabit);
  } catch (error) {
    handleError(error, res);
  }
}

export async function completeHabit(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const savedHabit = await habitService.completeHabit(id);

    res.status(200).json(savedHabit);
  } catch (error) {
    handleError(error, res);
  }
}
