import jwt from "jsonwebtoken";
import env from "../config/env-validate.js";
import { Response } from "express";

interface TokenPayload {
  userId: string;
}

const accessTokenSecret = env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = env.REFRESH_TOKEN_SECRET;

export function generateAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, accessTokenSecret, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });
}

export function generateTokens(payload: TokenPayload) {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export function saveTokenToCookie(
  res: Response,
  token: string,
  name: "accessToken" | "refreshToken",
) {
  const maxAge =
    name === "accessToken" ? 15 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge,
  });
}
