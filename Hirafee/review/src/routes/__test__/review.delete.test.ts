import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("returns a 404 if the review is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/reviews/${id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/reviews/${id}`).expect(401);
});

it("deletes the review if it exists and the user is authenticated", async () => {
  const rating = 5;
  const comment = "Lorem ipsum";
  const id = new mongoose.Types.ObjectId().toHexString();

  // Create a review
  const createResponse = await request(app)
    .post("/api/reviews")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      rating,
      comment,
      clientId: fakeId,
      artisanId: id,
      createdAt: new Date(),
    })
    .expect(201);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Delete the review
  await request(app)
    .delete(`/api/reviews/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(204);

  // Fetch the deleted review
  const fetchResponse = await request(app)
    .get(`/api/reviews/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});

it("returns a 404 if an invalid review ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/reviews/${invalidId}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});
