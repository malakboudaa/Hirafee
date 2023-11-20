import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/profiles/${id}`)
    .set("Cookie", global.signin("admin"))
    .send({})
    .expect(404);
});

it("returns the profile if the profile is found", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
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
    belongsTo: fakeId,
    createdTheProfile: fakeIdd,
  };
  const createResponse = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
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
    })
    .expect(201);

  const profileResponse = await request(app)
    .get(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  expect(profileResponse.body.username).toEqual(username);
  expect(profileResponse.body.firstName).toEqual(firstName);
  expect(profileResponse.body.lastName).toEqual(lastName);
  expect(profileResponse.body.email).toEqual(email);
  expect(profileResponse.body.role).toEqual(role);
  expect(profileResponse.body.biography).toEqual(biography);
  expect(profileResponse.body.phoneNumber).toEqual(phoneNumber);
  expect(profileResponse.body.location).toEqual(location);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/profiles/${id}`).send({}).expect(401);
});

it("returns a 404 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin("admin"))
    .send({})
    .expect(404);
});

it("returns the profile with a transformed ID", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
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
    belongsTo: fakeId,
    createdTheProfile: fakeIdd,
  };
  const createResponse = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
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
    })
    .expect(201);

  const profileResponse = await request(app)
    .get(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  expect(profileResponse.body.username).toEqual(username);
  expect(profileResponse.body.firstName).toEqual(firstName);
  expect(profileResponse.body.lastName).toEqual(lastName);
  expect(profileResponse.body.email).toEqual(email);
  expect(profileResponse.body.role).toEqual(role);
  expect(profileResponse.body.biography).toEqual(biography);
  expect(profileResponse.body.phoneNumber).toEqual(phoneNumber);
  expect(profileResponse.body.location).toEqual(location);
});
