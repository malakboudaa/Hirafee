import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("returns all reviews", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisanId = invalidId;
  const clientId = invalidId;

  const review1 = {
    rating,
    comment,
    artisanId,
    clientId,
    createdAt,
  };

  const review2 = {
    rating,
    comment,
    artisanId,
    clientId,
    createdAt,
  };

  // Create two reviews
  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send(review1)
    .expect(201);

  await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send(review2)
    .expect(201);

  // Read all reviews
  const response = await request(app)
    .get("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  // Assert the response contains both reviews
  expect(response.body.length).toEqual(2);
  expect(response.body[0].artisanId).toEqual(review1.artisanId);

  expect(response.body[0].rating).toEqual(review1.rating);
  expect(response.body[0].comment).toEqual(review1.comment);

  expect(response.body[1].artisanId).toEqual(review2.artisanId);

  expect(response.body[1].rating).toEqual(review2.rating);
  expect(response.body[1].comment).toEqual(review2.comment);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app).get("/api/reviews").send({}).expect(401);
});

it("returns an empty array if no reviews exist", async () => {
  const response = await request(app)
    .get("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

it("returns reviews with transformed IDs", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  const rating = 5;
  const comment = "Lorem ipsum";
  const createdAt = new Date();
  const artisanId = invalidId;
  const clientId = invalidId;

  const review1 = {
    rating,
    comment,
    artisanId,
    clientId,
    createdAt,
  };

  const review2 = {
    rating,
    comment,
    artisanId,
    clientId,
    createdAt,
  };
  // Create two reviews
  const response1 = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send(review1)
    .expect(201);

  const response2 = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send(review2)
    .expect(201);

  // Read all reviews
  const response = await request(app)
    .get("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  // Assert the response contains reviews with transformed IDs
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
  expect(response.body[0].id).toEqual(response1.body.id);

  expect(response.body[1].id).toBeDefined();
  expect(response.body[1]._id).toBeUndefined();
  expect(response.body[1].id).toEqual(response2.body.id);
});
