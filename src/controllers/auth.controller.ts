import { NextFunction, Request, Response } from "express";
import { AppError, ok } from "../lib/AppError";

export const register = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json(
    ok({
      user: { name: "John Doe", email: "hello@gmail.com" },
    }),
  );
};
