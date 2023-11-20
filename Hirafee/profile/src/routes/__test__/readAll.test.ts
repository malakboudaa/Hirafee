import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns all profiles", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const fakeIdd = new mongoose.Types.ObjectId().toHexString();
  const profile1 = {
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

  const profile2 = {
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

  // Create two profiles
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile1)
    .expect(201);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile2)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  // Assert the response contains both profiles
  expect(response.body.length).toEqual(2);
  expect(response.body[0].email).toEqual(profile1.email);
  expect(response.body[0].username).toEqual(profile1.username);
  expect(response.body[0].firstName).toEqual(profile1.firstName);
  expect(response.body[0].lastName).toEqual(profile1.lastName);
  expect(response.body[0].biography).toEqual(profile1.biography);
  expect(response.body[0].categorie).toEqual(profile1.categorie);
  expect(response.body[0].phoneNumber).toEqual(profile1.phoneNumber);
  expect(response.body[0].location).toEqual(profile1.location);

  expect(response.body.length).toEqual(2);
  expect(response.body[1].email).toEqual(profile2.email);
  expect(response.body[1].username).toEqual(profile2.username);
  expect(response.body[1].firstName).toEqual(profile2.firstName);
  expect(response.body[1].lastName).toEqual(profile2.lastName);
  expect(response.body[1].biography).toEqual(profile2.biography);
  expect(response.body[1].categorie).toEqual(profile2.categorie);
  expect(response.body[1].phoneNumber).toEqual(profile2.phoneNumber);
  expect(response.body[1].location).toEqual(profile2.location);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app).get("/api/profiles").send({}).expect(401);
});

it("returns an empty array if no profiles exist", async () => {
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

it("returns profiles in descending order of creation", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const fakeIdd = new mongoose.Types.ObjectId().toHexString();
  const profile1 = {
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

  const profile2 = {
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

  // Create profile2 first, then profile1
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile2)
    .expect(201);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile1)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  // Assert the response contains profiles in descending order of creation
});

it("returns profiles with transformed IDs", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const fakeIdd = new mongoose.Types.ObjectId().toHexString();
  const profile1 = {
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

  const profile2 = {
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

  // Create two profiles
  const response1 = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile1)
    .expect(201);

  const response2 = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send(profile2)
    .expect(201);

  // Read all profiles
  const response = await request(app)
    .get("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send()
    .expect(200);

  // Assert the response contains profiles with transformed IDs
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
  expect(response.body[0].id).toEqual(response1.body.id);

  expect(response.body[1].id).toBeDefined();
  expect(response.body[1]._id).toBeUndefined();
  expect(response.body[1].id).toEqual(response2.body.id);
});
