import request from "supertest";
import { app } from "../../app";
import { Ban } from "../../models/ban";
import mongoose from "mongoose";

it("has a route listening for PUT requests to /api/bans/:id", async () => {
  const response = await request(app).put("/api/bans/123456");
  expect(response.status).not.toEqual(404);
});

it("can only be accessed by admin users", async () => {
  const response = await request(app).put("/api/bans/123456");
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
    .put(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("admin"))
    .send({ reason: "Updated reason" });

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
    .put(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("user"))
    .send({ reason: "Updated reason" });

  expect(response.status).toEqual(401);
});

it("returns a 404 if the ban is not found", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/bans/${invalidId}`)

    .set("Cookie", global.signin("admin"))
    .send({ reason: "Updated reason" })
    .expect(404);
});

it("updates the ban if it exists and the user is an admin", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const ban = Ban.build({
    userId: fakeId,
    reason: "Some reason",
    createdAt: new Date(),
  });
  await ban.save();

  const updatedReason = "Updated reason";

  const response = await request(app)
    .put(`/api/bans/${ban.id}`)
    .set("Cookie", global.signin("admin"))
    .send({ reason: updatedReason })
    .expect(200);

  expect(response.body.id).toEqual(ban.id);
  expect(response.body.userId.toString()).toEqual(ban.userId.toString());
  expect(response.body.reason).toEqual(updatedReason);

  const updatedBan = await Ban.findById(ban.id);
  expect(updatedBan!.reason).toEqual(updatedReason);
});

// checked manually and working
