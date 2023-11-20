import express, { Request, Response } from "express";
import { requireAuth } from "@hirafee-platforme/common";
import { Profile } from "../models/profile";

const router = express.Router();

router.get(
  "/api/profiles",

  async (req: Request, res: Response) => {
    const profiles = await Profile.find();

    res.send(profiles);
  }
);

export { router as readAllProfilesRouter };
