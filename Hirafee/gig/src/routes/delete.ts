import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  currentUser,
  requireRole,
} from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.delete(
  "/api/gigs/:id",
  requireAuth,
  requireRole("client"),
  currentUser,
  async (req: Request, res: Response) => {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      throw new NotFoundError();
    }

    // Check if the authenticated user is the owner of the gig or has the role of admin
    if (gig.clientId.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    await Gig.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as deleteGigRouter };
