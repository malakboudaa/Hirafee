import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@hirafee-platforme/common";
import { createReviewRouter } from "./routes/review.create";
import { updateReviewRouter } from "./routes/review.update";
import { readAllReviewsRouter } from "./routes/review.readAll";
import { readReviewRouter } from "./routes/review.read";
import { deleteReviewRouter } from "./routes/review.delete";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createReviewRouter);
app.use(updateReviewRouter);
app.use(readAllReviewsRouter);
app.use(readReviewRouter);
app.use(deleteReviewRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
