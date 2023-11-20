import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
//import { natsWrapper } from "../../nats-wrapper";
 jest.mock('../../nats-wrapper');

// beforeAll(async () => {
//   await natsWrapper.connect('your-cluster-id', 'your-client-id', 'nats://localhost:4222');
// });

// afterAll(async () => {
//   await natsWrapper.client.close();
// });

const fakeId = new mongoose.Types.ObjectId();

it("returns a 201 on successful signup", async () => {
  return request(app)
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
}, 10000);

it("returns a 400 on invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "testtest.com",
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
    .expect(400);
}, 10000);

it("returns a 400 on invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "",
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
    .expect(400);
}, 10000);

it("returns a 400 on missing password or email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
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
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",

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
    .expect(400);
}, 10000);

it("returns a 400 on duplicate email", async () => {
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
    .expect(400);
}, 10000);

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
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
  expect(response.get("Set-Cookie")).toBeDefined();
}, 10000);
