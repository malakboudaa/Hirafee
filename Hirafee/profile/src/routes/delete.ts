import express, { Request, Response } from "express";
import { requireAuth, NotFoundError } from "@hirafee-platforme/common";
import { Profile } from "../models/profile";

const router = express.Router();

router.delete(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    const profile = await Profile.findById(req.params.id);
    console.log('searching for profile ...');
    

    if (!profile) {
      console.log("didnt find the profile");
      
      throw new NotFoundError();
    }

    await Profile.findByIdAndDelete(req.params.id);
    console.log("found and deleted");
    

    res.status(204).send();
  }
);

export { router as deleteProfileRouter };
