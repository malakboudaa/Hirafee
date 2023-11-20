import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

// declare global {
//   function signin(): string;
// }

// declare module globalThis {
//   var signin: () => string[];
// }

// export interface global {}
// declare global {
//   var signin: ()=>string[]
// }

declare global {
  function signin(): Promise<string[]>;
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = "asdfsdfsf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
const fakeId = new mongoose.Types.ObjectId();
global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const authResponse = await request(app)
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

  const cookie = authResponse.get("Set-Cookie");
  return cookie;
};
