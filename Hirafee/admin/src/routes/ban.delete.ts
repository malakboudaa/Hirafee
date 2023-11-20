import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  NotFoundError,
} from "@hirafee-platforme/common";

import { Ban } from "../models/ban";

const router = express.Router();
// this routes allows to delete a ban only by an admin
router.delete(
  "/api/bans/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const ban = await Ban.findById(req.params.id);

    if (!ban) {
      throw new NotFoundError();
    }

    await Ban.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as banDeleteRouter };

// checked manually
