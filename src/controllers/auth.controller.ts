import { RequestHandler } from "express";
import * as argon2 from "argon2";

import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { loginType, registerType } from "../schemas/auth.schema.js";
import { generateTokens, saveTokenToCookie } from "../utils/token.js";

export const register: RequestHandler<unknown, unknown, registerType> = async (
  req,
  res,
  next,
) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    return next(new AppError("Email already exists", 400));
  }

  const hashedPassword = await argon2.hash(password);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const { accessToken, refreshToken } = generateTokens({ userId: newUser.id });
  saveTokenToCookie(res, accessToken, "accessToken");
  saveTokenToCookie(res, refreshToken, "refreshToken");

  res.status(201).json(
    ok({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }),
  );
};

export const login: RequestHandler<unknown, unknown, loginType> = async (
  req,
  res,
  next,
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return next(new AppError("User was not found", 404));
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    return next(new AppError("Invalid password", 401));
  }

  const { accessToken, refreshToken } = generateTokens({
    userId: user.id,
  });
  saveTokenToCookie(res, accessToken, "accessToken");
  saveTokenToCookie(res, refreshToken, "refreshToken");

  res.status(201).json(
    ok({
      id: user.id,
      name: user.name,
      email: user.email,
    }),
  );
};

export const logout: RequestHandler = async (_req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json(ok({ message: "Logged out successfully" }));
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  const { accessToken, refreshToken } = generateTokens({
    userId: req.userId!,
  });
  saveTokenToCookie(res, accessToken, "accessToken");
  saveTokenToCookie(res, refreshToken, "refreshToken");

  res.status(201).json(
    ok({
      accessToken,
      refreshToken,
    }),
  );
};
