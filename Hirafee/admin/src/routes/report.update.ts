import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Report } from "../models/report";

const router = express.Router();

router.put(
  "/api/reports/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [
    body("reportedItemId")
      .notEmpty()
      .withMessage("Reported item ID is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("type").isIn(["gig", "profile"]).withMessage("Invalid type value"),
    body("reason").notEmpty().withMessage("Reason is required"),
    body("state").notEmpty().withMessage("State is required"),
    body("state")
      .isIn(["processed", "unprocessed"])
      .withMessage("Invalid state value"),
    body("createdAt").notEmpty().withMessage("Created at is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { reportedItemId, type, reason, state, createdAt } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).send("Report not found");
    }

    report.set({ reportedItemId, type, reason, state, createdAt });
    await report.save();

    res.send(report);
  }
);

export { router as reportUpdateRouter };
