import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

// Create a user
router.post("/api/users", async (req: Request, res: Response) => {
  try {
    const userAttrs = req.body;
    const user = User.build(userAttrs);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Get all users
router.get("/api/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Get a specific user
router.get("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Update a user
router.put("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const userAttrs = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.set(userAttrs);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

// Delete a user
router.delete("/api/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

export { router };
