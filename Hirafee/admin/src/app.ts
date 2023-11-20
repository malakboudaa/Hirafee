import express from "express";
import "express-async-errors";

import cookieSession from "cookie-session";
import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@hirafee-platforme/common";
import { banCreateRouter } from "./routes/ban.create";
import { banReadAllRouter } from "./routes/ban.readAll";
import { banReadRouter } from "./routes/ban.read";
import { banUpdateRouter } from "./routes/ban.update";
import { banDeleteRouter } from "./routes/ban.delete";
import { reportCreateRouter } from "./routes/report.create";
import { reportReadAllRouter } from "./routes/report.readAll";
import { reportReadRouter } from "./routes/report.read";
import { reportUpdateRouter } from "./routes/report.update";
import { reportDeleteRouter } from "./routes/report.delete";
import { categoryCreateRouter } from "./routes/category.create";
import { categoryReadAllRouter } from "./routes/category.readAll";
import { categoryReadRouter } from "./routes/category.read";
import { categoryUpdateRouter } from "./routes/category.update";
import { categoryDeleteRouter } from "./routes/category.delete";

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

app.use(banCreateRouter);
app.use(banReadAllRouter);
app.use(banReadRouter);
app.use(banUpdateRouter);
app.use(banDeleteRouter);

app.use(reportCreateRouter);
app.use(reportReadAllRouter);
app.use(reportReadRouter);
app.use(reportUpdateRouter);
app.use(reportDeleteRouter);

app.use(categoryCreateRouter);
app.use(categoryReadAllRouter);
app.use(categoryReadRouter);
app.use(categoryUpdateRouter);
app.use(categoryDeleteRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
