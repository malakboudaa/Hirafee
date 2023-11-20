import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("fails when a none existing email is supplied ", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      phoneNumber: "1234567890",
      location: "New York",
      biography: "I am a client",
      categorie: "category",
      role: "client",
      belongsTo: fakeId.toHexString(), // Replace with valid MongoDB ObjectId
      createdTheProfile: fakeId.toHexString(), // Replace with valid MongoDB ObjectId
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "pasdsword",
    })
    .expect(400);
});

it("responds with a cookie when given the right information", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      phoneNumber: "1234567890",
      location: "New York",
      biography: "I am a client",
      categorie: "category",
      role: "client",
      belongsTo: fakeId.toHexString(), // Replace with valid MongoDB ObjectId
      createdTheProfile: fakeId.toHexString(), // Replace with valid MongoDB ObjectId
    })
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
