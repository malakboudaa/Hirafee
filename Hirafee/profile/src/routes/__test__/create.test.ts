import request from "supertest";
import { app } from "../../app";
import { Profile } from "../../models/profile";
import mongoose from "mongoose";

it("has a route listening for /api/profiles for post requests", async () => {
  const response = await request(app).post("/api/profiles").send({});
  expect(response.status).not.toEqual(404);
});

it("it can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/profiles").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for an invalid name", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});

it("returns an error for an invalid biography", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});

it("returns an error for an invalid phoneNumber", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});

it("returns an error for an invalid location", async () => {
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);

  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email: "fdqfds",
      firsName: "",
      lastName: "",
      username: "",
      role: "",
      biography: "lorem",
      phoneNumber: "0561294776",
      location: "fdjkqmsjf",
      portfolio: [],
    })
    .expect(400);
});

it("creates a profile with valid inputs", async () => {
  let profiles = await Profile.find({});
  expect(profiles.length).toEqual(0);
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
  await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
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

  profiles = await Profile.find({});
  expect(profiles.length).toEqual(1);
});
