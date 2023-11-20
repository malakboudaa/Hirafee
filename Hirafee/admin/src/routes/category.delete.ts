import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "@hirafee-platforme/common";

import { Category } from "../models/category";

const router = express.Router();

router.delete(
  "/api/categories/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(204).send();
  }
);

export { router as categoryDeleteRouter };
