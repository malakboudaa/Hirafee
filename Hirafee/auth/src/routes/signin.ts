import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {body, validationResult} from 'express-validator'
import { User } from "../models/user";
import { validateRequest } from "@hirafee-platforme/common";
import { BadRequestError } from "@hirafee-platforme/common";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password").trim().notEmpty().withMessage("you must add a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("invalid credentials");
    }
    console.log(existingUser);
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError("invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role, // Include the role in the JWT payload
        firstName: existingUser.firstName, // Add additional attributes here
        lastName: existingUser.lastName,
        username: existingUser.username,
        phoneNumber: existingUser.phoneNumber,
        location: existingUser.location,
        biography: existingUser.biography,
        categorie: existingUser.categorie,
        banned: existingUser.banned,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
