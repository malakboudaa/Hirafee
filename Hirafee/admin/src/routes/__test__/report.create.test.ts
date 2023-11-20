import request from "supertest";
import { app } from "../../app";
import { Report } from "../../models/report";
import mongoose from "mongoose";

it("has a route listening for /api/reports for post requests", async () => {
  const response = await request(app).post("/api/reports").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).post("/api/reports").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is an admin", async () => {
  const response = await request(app)
    .post("/api/reports")
    .set("Cookie", global.signin("admin"))
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for missing reason, type, reportedItemId, and state", async () => {
  const response = await request(app)
    .post("/api/reports")
    .set("Cookie", global.signin("admin"))
    .send({});

  expect(response.status).toEqual(400);
});

it("creates a report with valid inputs", async () => {
  let reports = await Report.find({});
  expect(reports.length).toEqual(0);
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post("/api/reports")
    .set("Cookie", global.signin("admin"))
    .send({
      type: "gig",
      reportedItemId: fakeId,
      reason: "Some reason",
      state: "processed",
    })
    .expect(201);

  reports = await Report.find({});
  expect(reports.length).toEqual(1);
});
