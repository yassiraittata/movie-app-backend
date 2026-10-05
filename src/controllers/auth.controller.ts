import { RequestHandler } from "express";
import * as argon2 from "argon2";

import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { generateTokens, saveTokenToCookie } from "../utils/token.js";

export const register: RequestHandler = async (req, res, next) => {
  const { success, data, error } = registerSchema.safeParse(req.body);

  if (!success) {
    let messages = error.issues.map((err) => err.message).join(", ");
    return next(new AppError(messages, 400));
  }

  const { name, email, password } = data;

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

export const login: RequestHandler = async (req, res, next) => {
  const { success, data, error } = loginSchema.safeParse(req.body);

  if (!success) {
    let messages = error.issues.map((err) => err.message).join(", ");
    return next(new AppError(messages, 400));
  }

  const { email, password } = data;

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
