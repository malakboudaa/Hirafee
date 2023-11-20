import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  requireRole,
} from "@hirafee-platforme/common";
import { Gig } from "../models/gig";
import { natsWrapper } from "../nats-wrapper";
import { GigUpdatedPublisher } from "../events/publishers/gig-updated-publisher";

const router = express.Router();

router.put(
  "/api/gigs/:id",
  requireAuth,
  requireRole("client", "artisan"),
  async (req: Request, res: Response) => {
    const gigId = req.params.id;
    const {
      title,
      description,
      budget,
      location,
      category,
      requirements,
      banned,
      clientId,
      proposals,
      takenBy,
    } = req.body;

    const gig = await Gig.findById(gigId);

    if (!gig) {
      throw new NotFoundError();
    }

    // Update only the provided fields
    if (title) gig.title = title;
    if (description) gig.description = description;
    if (budget) gig.budget = budget;
    if (location) gig.location = location;
    if (category) gig.category = category;
    if (requirements) gig.requirements = requirements;
    if (banned !== undefined) gig.banned = banned;
    if (clientId) gig.clientId = clientId;
    if (proposals) gig.proposals = proposals;
    if (takenBy) gig.takenBy = takenBy;

    await gig.save();

    //put our publisher 
    // with the getter on natswrapper 
    new GigUpdatedPublisher(natsWrapper.client).publish({
      title: gig.title,
      description: gig.description,
      budget: gig.budget,
      location: gig.location,
      category: gig.category,
      requirements: gig.requirements,
      banned: gig.banned

     });



    res.send(gig);
  }
);

export { router as updateGigRouter };
