import type { Request, Response } from "express";
import type { IJournal } from "../models/Journal.ts";
import User from "../models/User.ts";
import Journal from "../models/Journal.ts";
import { journalService } from "../services/JournalService.ts";
import type { UserRequest } from "../types/express.ts";
import { handleError } from "../helper/HandleError.ts";
import { parsePaginationParams } from "../types/pagination.ts";
import type { PaginatedResponse } from "../types/pagination.ts";

export async function getJournals(req: UserRequest, res: Response) {
  try {
    const { page, limit } = req.query as { page?: string; limit?: string };

    const { page: parsedPage, limit: parsedLimit } = parsePaginationParams({
      page,
      limit,
    });

    const { journals, pagination } = await journalService.getJournal(
      req.user!._id,
      parsedPage,
      parsedLimit,
    );

    const response: PaginatedResponse<any> = {
      success: true,
      data: journals,
      pagination,
    };

    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
}

//create addJournal controller
export async function addJournal(req: UserRequest, res: Response) {
  try {
    const savedJournal = journalService.addJournal(req.user!._id, req.body);

    res.status(201).json(savedJournal);
  } catch (error) {
    handleError(error, res);
  }
}

export async function deleteJournal(req: UserRequest, res: Response) {
  try {
    const deletedJournal = journalService.deleteJournal(
      req.user!,
      req.params.id,
    );

    res.status(200).json(deletedJournal);
  } catch (error) {
    handleError(error, res);
  }
}
