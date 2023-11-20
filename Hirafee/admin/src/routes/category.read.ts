import express, { Request, Response } from "express";
import { requireAuth, requireRole } from "@hirafee-platforme/common/build";
import { Category } from "../models/category";

const router = express.Router();

router.get(
  "/api/categories/:id",
  requireAuth,

  async (req: Request, res: Response) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.send(category);
  }
);

export { router as categoryReadRouter };
