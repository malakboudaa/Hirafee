import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@hirafee-platforme/common";
import { createProfileRouter } from "./routes/create";
import { readProfileRouter } from "./routes/read";
import { readAllProfilesRouter } from "./routes/readAll";
import { updateProfileRouter } from "./routes/update";
import { deleteProfileRouter } from "./routes/delete";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);
app.use(currentUser);

app.use(createProfileRouter);
app.use(readProfileRouter);
app.use(readAllProfilesRouter);
app.use(updateProfileRouter);
app.use(deleteProfileRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
