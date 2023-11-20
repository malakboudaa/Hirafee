import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
const fakeId = new mongoose.Types.ObjectId();

it("returns all gigs", async () => {
  const gig1 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };

  const gig2 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };

  // Create two gigs
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig1)
    .expect(201);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig2)
    .expect(201);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Read all gigs
  const response = await request(app)
    .get("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  // Assert the response contains both gigs

  expect(response.body[0].title).toEqual(gig1.title);
  expect(response.body[0].description).toEqual(gig1.description);
  expect(response.body[0].budget).toEqual(gig1.budget);
  expect(response.body[0].location).toEqual(gig1.location);
  expect(response.body[0].category).toEqual(gig1.category);
  expect(response.body[0].requirements).toEqual(gig1.requirements);

  expect(response.body[1].title).toEqual(gig2.title);
  expect(response.body[1].description).toEqual(gig2.description);
  expect(response.body[1].budget).toEqual(gig2.budget);
  expect(response.body[1].location).toEqual(gig2.location);
  expect(response.body[1].category).toEqual(gig2.category);
  expect(response.body[1].requirements).toEqual(gig2.requirements);
});

it("returns a 401 if the user is not authenticated", async () => {
  await request(app).get("/api/gigs").send({}).expect(401);
});

it("returns an empty array if no gigs exist", async () => {
  const response = await request(app)
    .get("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

it("returns gigs in descending order of creation", async () => {
  const gig1 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };

  const gig2 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };
  // Create gig2 first, then gig1
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig2)
    .expect(201);

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig1)
    .expect(201);

  // Read all gigs
  const response = await request(app)
    .get("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  // Assert the response contains gigs in descending order of creation

  expect(response.body[0].title).toEqual(gig2.title);
  expect(response.body[1].title).toEqual(gig1.title);
});

it("returns gigs with transformed IDs", async () => {
  const gig1 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };

  const gig2 = {
    title: "Web Design",
    description: "Lorem ipsum",
    budget: 1000,
    location: "New York",
    category: "Web Development",
    requirements: [],
    clientId: fakeId.toHexString(),
    proposals: [],
    takenBy: "",
  };
  // Create two gigs
  const response1 = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig1)
    .expect(201);

  const response2 = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig2)
    .expect(201);

  // Read all gigs
  const response = await request(app)
    .get("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  // Assert the response contains gigs with transformed IDs

  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).toBeUndefined();
  expect(response.body[0].id).toEqual(response1.body.id);

  expect(response.body[1].id).toBeDefined();
  expect(response.body[1]._id).toBeUndefined();
  expect(response.body[1].id).toEqual(response2.body.id);
});
