import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("clears the cookie after signing out", async () => {
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
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
