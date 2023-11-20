import {
  requireAuth,
  validateRequest,
  RequestValidationError,
  currentUser,
} from "@hirafee-platforme/common/build";
import { validationResult } from "express-validator";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import { Profile } from "../models/profile";

const router = express.Router();

router.post(
  "/api/profiles",
  requireAuth,
  [
    body("email")
      .notEmpty()
      .withMessage("email is required")
      .isString()
      .withMessage("email must be a string"),
    body("role")
      .notEmpty()
      .withMessage("role is required")
      .isIn(["artisan", "admin", "client"])
      .withMessage("Invalid role value")
      .isString()
      .withMessage("role must be a string"),
    body("firstName")
      .notEmpty()
      .withMessage("firstName is required")
      .isString()
      .withMessage("firstName must be a string"),
    body("lastName")
      .notEmpty()
      .withMessage("lastName is required")
      .isString()
      .withMessage("lastName must be a string"),
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isString()
      .withMessage("username must be a string"),
    body("biography")
      .notEmpty()
      .withMessage("biography is required")
      .isString()
      .withMessage("biography must be a string"),
    body("categorie")
      .notEmpty()
      .withMessage("categorie is required")
      .isString()
      .withMessage("categorie must be a string"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("phoneNumber is required")
      .isString()
      .withMessage("phoneNumber must be a string"),
    body("location")
      .notEmpty()
      .withMessage("location is required")
      .isString()
      .withMessage("location must be a string"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("building profile");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const {
      email,
      role,
      firstName,
      lastName,
      username,
      biography,
      categorie,
      phoneNumber,
      location,
      portfolio,

      belongsTo,
    } = req.body;
    const profile = Profile.build({
      email,
      role,
      firstName,
      lastName,
      username,
      biography,
      categorie,
      phoneNumber,
      location,
      belongsTo,
      portfolio,
      createdTheProfile: req.currentUser!.id,
      banned: false,
    });
    await profile.save();
    res.status(201).send(profile);
  }
);

export { router as createProfileRouter };
