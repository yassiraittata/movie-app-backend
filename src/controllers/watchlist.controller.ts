import { RequestHandler } from "express-serve-static-core";
import prisma from "../config/db.js";
import { AppError, ok } from "../lib/appError.js";
import { watchlistDto, watchlistSchema } from "../schemas/watchlist.schema.js";

export const addTowatchList: RequestHandler<{ movieId: string }> = async (
  req,
  res,
  next,
) => {
  const { success, data, error } = watchlistSchema.safeParse(req.body);
  const { movieId } = req.params;
  const { userId } = req;

  if (!success) {
    let messages = error.issues.map((err) => err.message).join(", ");
    return next(new AppError(messages, 400));
  }

  const { rating, status, notes } = data;

  //   check if the movie already is in the eatch list
  const existingMovie = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        movieId,
        userId: userId!,
      },
    },
  });

  if (existingMovie) {
    return next(new AppError("movie already in the watch list", 400));
  }

  const watchListItem = await prisma.watchlistItem.create({
    data: {
      movieId,
      notes,
      status,
      rating,
      userId: userId!,
    },
    include: {
      movie: true,
    },
  });

  res.status(201).json(ok(watchListItem));
};

export const updateWatchlist: RequestHandler<
  { id: string },
  unknown,
  watchlistDto
> = async (req, res, next) => {
  const { id } = req.params;
  const { notes, rating, status } = req.body;

  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: {
      id,
    },
  });

  if (!watchlistItem) {
    return next(new AppError("Item was not found", 404));
  }

  await prisma.watchlistItem.update({
    where: { id },
    data: {
      notes: notes || watchlistItem.notes,
      rating: rating || watchlistItem.rating,
      status: status || watchlistItem.status,
    },
  });

  res.status(201).json(
    ok({
      message: "item was updated successfully",
    }),
  );
};
