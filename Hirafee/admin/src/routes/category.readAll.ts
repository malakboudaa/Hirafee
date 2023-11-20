import express, { Request, Response } from "express";
import { requireAuth } from "@hirafee-platforme/common";
import { Category } from "../models/category";

const router = express.Router();

router.get(
  "/api/categories",

  async (req: Request, res: Response) => {
    const categories = await Category.find();

    res.send(categories);
  }
);

export { router as categoryReadAllRouter };
