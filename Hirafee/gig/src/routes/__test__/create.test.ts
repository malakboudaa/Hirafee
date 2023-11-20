import request from "supertest";
import { app } from "../../app";
import { Gig } from "../../models/gig";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("has a route listening for /api/gigs for post requests", async () => {
  const response = await request(app).post("/api/gigs").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/api/gigs").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({});

  expect(response.status).not.toEqual(401);
});

it("returns an error for invalid title", async () => {
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "string",
      description: "string",
      budget: 5,
      location: "string",
      clientId: new mongoose.Types.ObjectId().toHexString(),
      category: "string",
      requirements: [],
      banned: false,
    })
    .expect(400);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      description: "Lorem ipsum",
      budget: 1000,
      location: "New York",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);
});

it("returns an error for invalid description", async () => {
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "",
      budget: 1000,
      location: "New York",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      budget: 1000,
      location: "New York",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);
});

it("returns an error for invalid budget", async () => {
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: -100,
      location: "New York",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      location: "New York",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);
});

it("returns an error for invalid location", async () => {
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: 1000,
      location: "",
      category: "Web Development",
      requirements: [],
    })
    .expect(400);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: 1000,
      category: "Web Development",
      requirements: [],
    })
    .expect(400);
});

it("returns an error for invalid category", async () => {
  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: 1000,
      location: "New York",
      category: "",
      requirements: [],
    })
    .expect(400);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: 1000,
      location: "New York",
      requirements: [],
    })
    .expect(400);
});

it("creates a gig with valid inputs", async () => {
  let gigs = await Gig.find({});
  expect(gigs.length).toEqual(0);

  await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Web Design",
      description: "Lorem ipsum",
      budget: 1000,
      location: "New York",
      category: "Web Development",
      requirements: [],
      clientId: fakeId.toHexString(),
      proposals: [],
      takenBy: "",
    })
    .expect(201);

  gigs = await Gig.find({});
  expect(gigs.length).toEqual(1);
});
