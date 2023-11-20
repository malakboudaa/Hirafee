import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/profiles/${id}`)
    .set("Cookie", global.signin("client"))
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/profiles/${id}`).expect(401);
});

it("deletes the profile if it exists and the user is authenticated", async () => {
  const fakeIdd = new mongoose.Types.ObjectId().toHexString();

  const {
    email,
    firstName,
    lastName,
    username,
    role,
    phoneNumber,
    location,
    biography,
    categorie,
    portfolio,
    banned,
    belongsTo,
    createdTheProfile,
  } = {
    email: "test@test.com",
    firstName: "amine",
    lastName: "mohammd",
    username: "blix",
    phoneNumber: "123465789",
    location: "arizona",
    role: "admin",
    biography: "fjkdlqmsjfdmkjsmqfk",
    categorie: "fjkdlqmsjfdmkjsmqfk",
    portfolio: [],
    banned: false,
    belongsTo: fakeIdd,
    createdTheProfile: fakeIdd,
  };

  // Create a profile
  const createResponse = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("client"))
    .send({
      email,
      firstName,
      lastName,
      username,
      phoneNumber,
      location,
      biography,
      categorie,
      portfolio,
      role,
      belongsTo,
      createdTheProfile,
      banned,
    })
    .expect(201);

  // Delete the profile
  await request(app)
    .delete(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin("client"))
    .expect(204);

  // Fetch the deleted profile
  const fetchResponse = await request(app)
    .get(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin("client"))
    .expect(404);
});

it("returns a 404 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin("client"))
    .expect(404);
});
