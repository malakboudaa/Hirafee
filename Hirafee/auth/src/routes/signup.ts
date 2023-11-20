import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { RequestValidationError, currentUser } from "@hirafee-platforme/common";
import { User } from "../models/user";
import { BadRequestError } from "@hirafee-platforme/common";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";


const router = express.Router();

router.post(
  "/api/users/signup",

  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters."),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(["admin", "artisan", "client"])
      .withMessage("Role must be either 'admin', 'artisan', or 'client'"),
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("biography").notEmpty().withMessage("Biography is required"),
    body("categorie").notEmpty().withMessage("Category is required"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log("building client");
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const {
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      role,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({
      email,
      password,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      portfolio: [],
      role,
      banned: false,
    });

    await user.save();
    console.log("saved");

     //put our publisher 
    // with the getter on natswrapper 
    new UserCreatedPublisher(natsWrapper.client).publish({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      location: user.location,
      biography: user.biography,
      categorie: user.categorie,
     });

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        banned:user.banned,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phoneNumber: user.phoneNumber,
        location: user.location,
        biography: user.biography,
        categorie: user.categorie,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
