import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  function signin(role: string, id: mongoose.Types.ObjectId): string[];
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

global.signin = (role, id) => {
  // build a jwt payload
  const payload = {
    id: id,
    email: "test@test.com",
    role: role,
  };
  // create the jsonwebtoken
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build the session object
  const session = { jwt: token };
  // turn that session to json
  const sessionJSON = JSON.stringify(session);
  // encode json as base 64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  // return a string  cookie with encodded data
  return [`session=${base64}`];
};
