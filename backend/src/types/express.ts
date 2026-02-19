import type { Request } from "express";
import type { IUser } from "../models/User.ts";
export interface UserRequest extends Request {
  user?: IUser;
}
