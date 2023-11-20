import express, { Request, Response } from "express";
import { requireAuth, currentUser } from "@hirafee-platforme/common";
import { Review } from "../models/review";

const router = express.Router();

router.get(
  "/api/reviews",
  requireAuth,
  currentUser,
  async (req: Request, res: Response) => {
    const reviews = await Review.find({});

    res.send(reviews);
  }
);

export { router as readAllReviewsRouter };
