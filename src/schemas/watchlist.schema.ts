import { z } from "zod";

export const watchlistSchema = z.object({
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"])
    .default("PLANNED")
    .optional(),
  rating: z.int(),
  notes: z.string().optional(),
});
