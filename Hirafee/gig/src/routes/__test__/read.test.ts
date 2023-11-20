import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
const fakeId = new mongoose.Types.ObjectId();
it("returns a 404 if the gig is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/gigs/${id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({})
    .expect(404);
});

it("returns the gig if the gig is found", async () => {
  const title = "Web Design";
  const description = "Lorem ipsum";
  const budget = 1000;
  const location = "New York";
  const category = "Web Development";
  const requirements = ["hi", "hi"];
  const clientId = fakeId.toHexString();
  const proposals = ["hi", "hi"];
  const takenBy = "";

  const response = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title,
      description,
      budget,
      location,
      category,
      requirements,
      clientId,
      proposals,
      takenBy,
    })
    .expect(201);

  const gigResponse = await request(app)
    .get(`/api/gigs/${response.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(gigResponse.body.title).toEqual(title);
  expect(gigResponse.body.description).toEqual(description);
  expect(gigResponse.body.budget).toEqual(budget);
  expect(gigResponse.body.location).toEqual(location);
  expect(gigResponse.body.category).toEqual(category);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).get(`/api/gigs/${id}`).send({}).expect(401);
});

it("returns a 404 if an invalid gig ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/gigs/${invalidId}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({})
    .expect(404);
});

it("returns the gig with a transformed ID", async () => {
  const title = "Web Design";
  const description = "Lorem ipsum";
  const budget = 1000;
  const location = "New York";
  const category = "Web Development";
  const requirements = ["hi", "hi"];
  const clientId = fakeId.toHexString();
  const proposals = ["hi", "hi"];
  const takenBy = "";

  const response = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title,
      description,
      budget,
      location,
      category,
      requirements,
      clientId,
      proposals,
      takenBy,
    })
    .expect(201);

  const gigResponse = await request(app)
    .get(`/api/gigs/${response.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send()
    .expect(200);

  expect(gigResponse.body.id).toBeDefined();
  expect(gigResponse.body._id).toBeUndefined();

  expect(gigResponse.body.title).toEqual(title);
  expect(gigResponse.body.description).toEqual(description);
  expect(gigResponse.body.budget).toEqual(budget);
  expect(gigResponse.body.location).toEqual(location);
  expect(gigResponse.body.category).toEqual(category);
  expect(gigResponse.body.requirements).toEqual(requirements);
});
