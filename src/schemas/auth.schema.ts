import { z } from "zod";

const email = z
  .string("Email is required")
  .trim()
  .email("Invalid email address")
  .toLowerCase()
  .max(255, "Email address must be less than 255 characters");
const password = z
  .string("Password is required")
  .min(8, "Password must be at least 8 characters")
  .max(255, "Password must be less than 255 characters");

export const registerSchema = z.object({
  name: z
    .string("Name is required")
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),
  email,
  password,
});

export const loginSchema = z.object({
  email,
  password,
});

export type loginType = z.infer<typeof loginSchema>;
export type registerType = z.infer<typeof registerSchema>;
