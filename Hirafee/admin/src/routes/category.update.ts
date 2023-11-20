import express, { Request, Response } from "express";
import {
  requireAuth,
  requireRole,
  validateRequest,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Category } from "../models/category";

const router = express.Router();

router.put(
  "/api/categories/:id",
  requireAuth,
  requireRole("admin"), // Middleware to restrict access to admin users only
  [body("name").notEmpty().withMessage("Name is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    category.set({ name });
    await category.save();

    res.send(category);
  }
);

export { router as categoryUpdateRouter };
