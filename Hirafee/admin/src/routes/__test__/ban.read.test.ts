import request from "supertest";
import { app } from "../../app";
import { Ban } from "../../models/ban";
import mongoose from "mongoose";

it("has a route listening for GET requests to /api/bans/:id", async () => {
  const response = await request(app).get("/api/bans/123456");
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).get("/api/bans/123456");
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const ban = Ban.build({
    userId: fakeId,
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const response = await request(app)
    .get(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("admin"));

  expect(response.status).not.toEqual(401);
});

it("returns a 401 if the user is not an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const ban = Ban.build({
    userId: fakeId,
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const response = await request(app)
    .get(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("user"));

  expect(response.status).toEqual(401);
});

it("returns a 404 if the ban is not found", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/bans/${fakeId}`)

    .set("Cookie", global.signin("admin"))
    .expect(404);
});

it("returns the ban if it exists and the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const ban = Ban.build({
    userId: fakeId,
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const response = await request(app)
    .get(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("admin"))
    .expect(200);

  console.log("Response userId:", response.body.userId);
  console.log("Ban userId:", ban.userId);

  expect(response.body.id).toEqual(ban.id);
  expect(response.body.userId.toString()).toEqual(ban.userId.toString());
  expect(response.body.reason).toEqual(ban.reason);
});

// checked manually and working
