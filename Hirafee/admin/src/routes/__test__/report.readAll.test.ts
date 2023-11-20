import request from "supertest";
import { app } from "../../app";
import { Report } from "../../models/report";
import mongoose from "mongoose";

it("has a route listening for GET requests to /api/reports", async () => {
  const response = await request(app).get("/api/reports");
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).get("/api/reports");
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
    .get("/api/reports")
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
    .get("/api/reports")
    .set("Cookie", global.signin("user"));

  expect(response.status).toEqual(401);
});

it("returns an array of bans if the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const fakeId1 = new mongoose.Types.ObjectId().toHexString();
  const report1 = Report.build({
    reportedItemId: fakeId,
    type: "gig",
    reason: "Some reason",
    state: "unprocessed",
    createdAt: new Date(),
  });
  const report2 = Report.build({
    reportedItemId: fakeId1,
    type: "gig",
    reason: "Some reason",
    state: "unprocessed",
    createdAt: new Date(),
  });
  await report1.save();
  await report2.save();

  const response = await request(app)
    .get("/api/reports")
    .set("Cookie", global.signin("admin"))
    .expect(200);

  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(report1.id);
  expect(response.body[0].reportedItemId).toEqual(report1.reportedItemId);
  expect(response.body[0].type).toEqual(report1.type);
  expect(response.body[0].state).toEqual(report1.state);
  expect(response.body[0].reason).toEqual(report1.reason);
  expect(response.body[1].id).toEqual(report2.id);
  expect(response.body[1].reportedItemId).toEqual(report2.reportedItemId);
  expect(response.body[1].type).toEqual(report2.type);
  expect(response.body[1].state).toEqual(report2.state);
  expect(response.body[1].reason).toEqual(report2.reason);
});
