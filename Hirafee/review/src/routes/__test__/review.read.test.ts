import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
const fakeId = new mongoose.Types.ObjectId();

it("returns a 404 if the review is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/reviews/${id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({})
    .expect(404);
});

it("returns the review if the review is found", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisanId = invalidId;
  const clientId = invalidId;

  const createResponse = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating,
      comment,
      artisanId,
      clientId,
      createdAt,
    })
    .expect(201);

  const reviewResponse = await request(app)
    .get(`/api/reviews/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(reviewResponse.body.rating).toEqual(rating);
  expect(reviewResponse.body.comment).toEqual(comment);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/reviews/${id}`).send({}).expect(401);
});

it("returns a 404 if an invalid review ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/reviews/${invalidId}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({})
    .expect(404);
});

it("returns the review with a transformed ID", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisanId = invalidId;
  const clientId = invalidId;

  const createResponse = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating,
      comment,
      artisanId,
      clientId,
      createdAt,
    })
    .expect(201);

  const reviewResponse = await request(app)
    .get(`/api/reviews/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(reviewResponse.body.id).toBeDefined();
  expect(reviewResponse.body._id).toBeUndefined();

  expect(reviewResponse.body.rating).toEqual(rating);
  expect(reviewResponse.body.comment).toEqual(comment);
});
