import express, { Request, Response } from "express";
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  requireRole,
} from "@hirafee-platforme/common";
import { Profile } from "../models/profile";

const router = express.Router();

router.put(
  "/api/profiles/:id",
  requireAuth,
  requireRole("admin",'artisan'),
  async (req: Request, res: Response) => {
    const profileId = req.params.id;
    const {
      email,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      portfolio,
      role,
      belongsTo,
      createdTheProfile,
      banned,
    } = req.body;

    const profile = await Profile.findById(profileId);

    if (!profile) {
      throw new NotFoundError();
    }

   

    // Update only the provided fields
    if (email) profile.email = email;
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (username) profile.username = username;
    if (phoneNumber) profile.phoneNumber = phoneNumber;
    if (location) profile.location = location;
    if (biography) profile.biography = biography;
    if (categorie) profile.categorie = categorie;
    if (portfolio) profile.portfolio = portfolio;
    if (role) profile.role = role;
    if (belongsTo) profile.belongsTo = belongsTo;
    if (createdTheProfile) profile.createdTheProfile = createdTheProfile;
    if (banned !== undefined) profile.banned = banned;

    await profile.save();

    res.send(profile);
  }
);

export { router as updateProfileRouter };
