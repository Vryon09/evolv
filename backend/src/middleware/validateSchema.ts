import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export function validateSchema(schema: ZodType<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = schema.parse(req.body);

      req.body = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.message,
        });
      }

      next(error);
    }
  };
}
