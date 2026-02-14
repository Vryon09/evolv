import type { Response } from "express";
import type { UserRequest } from "../types/express.ts";
import { tagService } from "../services/TagService.ts";
import { handleError } from "../helper/HandleError.ts";

export async function getTags(req: UserRequest, res: Response) {
  try {
    const tags = await tagService.getTags(req.user._id);

    return res.status(200).json(tags);
  } catch (error) {
    handleError(error, res);
  }
}

export async function addTag(req: UserRequest, res: Response) {
  try {
    const { tag } = req.body;

    const tags = await tagService.addTag(req.user._id, tag);

    return res.status(201).json(tags);
  } catch (error) {
    handleError(error, res);
  }
}

export async function removeTag(req: UserRequest, res: Response) {
  try {
    const { tag } = req.body;

    const tags = await tagService.removeTag(req.user._id, tag);

    return res.status(200).json(tags);
  } catch (error) {
    handleError(error, res);
  }
}
