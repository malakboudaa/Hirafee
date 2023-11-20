import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  requireAuth,
  requireRole,
  validateRequest,
  RequestValidationError,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Ban } from "../models/ban";

const router = express.Router();

// this creates a user ban , only the admin can do that

router.post(
  "/api/bans",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [
    body("userId").notEmpty().withMessage("User ID is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("building client");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { userId, reason } = req.body;

    const ban = Ban.build({
      userId,
      reason,
      createdAt: new Date(),
    });

    await ban.save();

    res.status(201).send(ban);
  }
);

export { router as banCreateRouter };

// checked manually
