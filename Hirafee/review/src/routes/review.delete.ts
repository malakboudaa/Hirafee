import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  currentUser,
  requireRole,
} from "@hirafee-platforme/common";
import { Review } from "../models/review";

const router = express.Router();

router.delete(
  "/api/reviews/:id",
  requireAuth,
  requireRole("client"),
  currentUser,
  async (req: Request, res: Response) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      throw new NotFoundError();
    }

    // Check if the authenticated user is the owner of the review or has the role of admin
    if (review.clientId.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as deleteReviewRouter };
