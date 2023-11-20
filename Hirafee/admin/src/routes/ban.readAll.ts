import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "@hirafee-platforme/common";

import { Ban } from "../models/ban";

const router = express.Router();

router.get(
  "/api/bans",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const bans = await Ban.find();

    res.send(bans);
  }
);

export { router as banReadAllRouter };
