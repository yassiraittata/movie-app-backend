import type { Request, Response, NextFunction } from "express";
import { AppError, fail } from "../lib/appError.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    console.error(err);
    return res.status(err.statusCode).json(fail(err.message, "APP_ERROR"));
  }

  return res.status(500).json(fail("Internal Server Error", "  "));
}
