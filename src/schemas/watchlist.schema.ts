import { z } from "zod";

export const watchlistSchema = z.object({
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"])
    .default("PLANNED")
    .optional(),
  rating: z.coerce.number().int().optional(),
  notes: z.string().optional(),
});

export type watchlistDto = z.infer<typeof watchlistSchema>;
