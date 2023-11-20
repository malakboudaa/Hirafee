import express, { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  requireAuth,
  requireRole,
  validateRequest,
  RequestValidationError,
} from "@hirafee-platforme/common";
import { body } from "express-validator";
import { Gig } from "../models/gig";
import mongoose from "mongoose";
import { natsWrapper } from "../nats-wrapper";
import { GigCreatedPublisher } from "../events/publishers/gig-created-publisher";

const router = express.Router();

router.post(
  "/api/gigs",
  requireAuth,
  requireRole("client"),
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("description").not().isEmpty().withMessage("Description is required"),
    body("budget")
      .isNumeric()
      .withMessage("Budget must be a number")
      .custom((value) => value > 0)
      .withMessage("Budget must be a positive number"),
    body("location").not().isEmpty().withMessage("Location is required"),
    body("category").not().isEmpty().withMessage("Category is required"),
    body("requirements")
      .not()
      .isEmpty()
      .withMessage("Requirements must be full"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("building client");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { title, description, budget, location, category, requirements } =
      req.body;
    const gigs = Gig.build({
      title,
      description,
      budget,
      location,
      clientId: req.currentUser!.id,
      proposals: [],
      takenBy: "",
      category,
      requirements,
      banned: false,
    });
    await gigs.save();

        //put our publisher 
    // with the getter on natswrapper 
    new GigCreatedPublisher(natsWrapper.client).publish({
      title: gigs.title,
      description: gigs.description,
      budget: gigs.budget,
      location: gigs.location,
      category: gigs.category,
      requirements: gigs.requirements,
      banned: gigs.banned

     });
    res.status(201).send(gigs);
  }
);

export { router as createGigRouter };
