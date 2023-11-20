import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@hirafee-platforme/common";
import { Review } from "../models/review";

const router = express.Router();

router.get(
  "/api/reviews/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      throw new NotFoundError();
    }

    res.send(review);
  }
);

export { router as readReviewRouter };
