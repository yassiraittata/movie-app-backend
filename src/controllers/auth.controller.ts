import { RequestHandler } from "express";
import * as argon2 from "argon2";

import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { registerSchema } from "../schemas/auth.schema.js";

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

  res.status(201).json(
    ok({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    }),
  );
};
