import express, { Request, Response } from "express";
import { requireAuth, currentUser } from "@hirafee-platforme/common";
import { Gig } from "../models/gig";

const router = express.Router();

router.get(
  "/api/gigs",
  requireAuth,
  currentUser,
  async (req: Request, res: Response) => {
    let gigs = await Gig.find();

    res.send(gigs);
  }
);

export { router as readAllGigsRouter };
