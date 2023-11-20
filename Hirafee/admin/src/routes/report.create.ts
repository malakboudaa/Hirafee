import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  requireAuth,
  requireRole,
  validateRequest,
  RequestValidationError,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Report } from "../models/report";

const router = express.Router();

router.post(
  "/api/reports",
  requireAuth,
  // Middleware to restrict access to admin users only
  [
    body("type")
      .notEmpty()
      .isIn(["gig", "profile"])
      .withMessage("Invalid report type"),
    body("reportedItemId")
      .notEmpty()
      .withMessage("Reported item ID is required"),
    body("reason").notEmpty().withMessage("Reason is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("building client");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { type, reportedItemId, reason, state } = req.body;

    const report = Report.build({
      type,
      reportedItemId,
      reason,
      state: "unprocessed",
      createdAt: new Date(),
    });

    await report.save();

    res.status(201).send(report);
  }
);

export { router as reportCreateRouter };
