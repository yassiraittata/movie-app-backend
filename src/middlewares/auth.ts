import { RequestHandler } from "express";
import { AppError } from "../lib/appError.js";
import env from "../config/env-validate.js";
import jwt from "jsonwebtoken";

export const isAccessTokenValid: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return next(new AppError("Access token not found", 401));
    }

    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET) as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new AppError("Access token not found", 401));
  }
};

export const isRefreshTokenValid: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return next(new AppError("Refresh token not found", 401));
    }

    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {
      userId: string;
    };

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return next(new AppError("Refresh token not found", 401));
  }
};
