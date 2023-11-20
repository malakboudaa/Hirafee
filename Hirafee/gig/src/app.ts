import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@hirafee-platforme/common";
import { createGigRouter } from "./routes/create";
import { readGigRouter } from "./routes/read";
import { readAllGigsRouter } from "./routes/readAll";
import { updateGigRouter } from "./routes/update";
import { deleteGigRouter } from "./routes/delete";

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

app.use(createGigRouter);
app.use(readGigRouter);
app.use(readAllGigsRouter);
app.use(updateGigRouter);
app.use(deleteGigRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
