import express, { Request, Response } from "express";
import { NotFoundError, requireAuth } from "@hirafee-platforme/common";

import { Profile } from "../models/profile";

const router = express.Router();

router.get(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      throw new NotFoundError();
    }

    res.send(profile);
  }
);

export { router as readProfileRouter };
