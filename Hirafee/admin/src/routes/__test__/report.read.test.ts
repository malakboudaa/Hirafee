import request from "supertest";
import { app } from "../../app";
import { Report } from "../../models/report";
import mongoose from "mongoose";

it("has a route listening for GET requests to /api/reports/:id", async () => {
  const response = await request(app).get("/api/reports/123456");
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).get("/api/reports/123456");
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const report = Report.build({
    reportedItemId: fakeId,
    type: "gig",
    reason: "Some reason",
    state: "unprocessed",
    createdAt: new Date(),
  });
  await report.save();

  const response = await request(app)
    .get(`/api/reports/${report.id}`)
    .set("Cookie", global.signin("admin"));

  expect(response.status).not.toEqual(401);
});

it("returns a 401 if the user is not an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const report = Report.build({
    reportedItemId: fakeId,
    type: "gig",
    reason: "Some reason",
    state: "unprocessed",
    createdAt: new Date(),
  });
  await report.save();

  const response = await request(app)
    .get(`/api/reports/${report.id}`)
    .set("Cookie", global.signin("user"));

  expect(response.status).toEqual(401);
});

it("returns a 404 if the ban is not found", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/reports/${invalidId}`)

    .set("Cookie", global.signin("admin"))
    .expect(404);
});

it("returns the ban if it exists and the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const report = Report.build({
    reportedItemId: fakeId,
    type: "gig",
    reason: "Some reason",
    state: "unprocessed",
    createdAt: new Date(),
  });
  await report.save();

  const response = await request(app)
    .get(`/api/reports/${report.id}`)
    .set("Cookie", global.signin("admin"))
    .expect(200);

  expect(response.body.type).toEqual(report.type);
  expect(response.body.reportedItemId).toEqual(report.reportedItemId);
  expect(response.body.state).toEqual(report.state);
  expect(response.body.reason).toEqual(report.reason);
});
