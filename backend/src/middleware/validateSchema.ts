import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";

export function validateSchema(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync(req.body);

      req.body = validated;

      next();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: error.message,
        });
      }

      return res.status(400).json({
        success: false,
        error: "Validation failed",
      });
    }
  };
}
