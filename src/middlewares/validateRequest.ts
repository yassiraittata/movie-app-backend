import { RequestHandler } from "express";
import { ZodObject } from "zod";
import { AppError } from "../lib/appError.js";

export const validateRequest = (schema: ZodObject): RequestHandler => {
  return (req, _res, next) => {
    const { success, error } = schema.safeParse(req.body);

    if (!success) {
      let messages = error.issues.map((err) => err.message).join(", ");
      return next(new AppError(messages, 400));
    }

    next();
  };
};
