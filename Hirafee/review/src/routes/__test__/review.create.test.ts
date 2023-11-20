import request from "supertest";
import { app } from "../../app";
import { Review } from "../../models/review";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("has a route listening for /api/reviews for post requests", async () => {
  const response = await request(app).post("/api/reviews").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/reviews").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for invalid rating", async () => {
  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating: -1,
      comment: "Lorem ipsum",
    })
    .expect(400);

  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      comment: "Lorem ipsum",
    })
    .expect(400);
});

it("returns an error for invalid comment", async () => {
  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating: 5,
      comment: "",
    })
    .expect(400);

  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating: 5,
    })
    .expect(400);
});

it("creates a review with valid inputs", async () => {
  let reviews = await Review.find({});
  expect(reviews.length).toEqual(0);

  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating: 5,
      comment: "Lorem ipsum",
      createdAt: new Date(),
      artisanId: invalidId,
      clientId: invalidId,
    })
    .expect(201);

  reviews = await Review.find({});
  expect(reviews.length).toEqual(1);
});
