import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  NotFoundError,
} from "@hirafee-platforme/common";

import { Ban } from "../models/ban";

const router = express.Router();

router.get(
  "/api/bans/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const ban = await Ban.findById(req.params.id);

    if (!ban) {
      throw new NotFoundError();
    }

    res.send(ban);
  }
);

export { router as banReadRouter };
