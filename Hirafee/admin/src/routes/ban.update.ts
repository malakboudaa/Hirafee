import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  NotFoundError,
} from "@hirafee-platforme/common";

import { Ban } from "../models/ban";

const router = express.Router();

router.put(
  "/api/bans/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const { reason } = req.body;

    const ban = await Ban.findById(req.params.id);

    if (!ban) {
      throw new NotFoundError();
    }

    ban.set({ reason });
    await ban.save();

    res.send(ban);
  }
);

export { router as banUpdateRouter };
