import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

const fakeId = new mongoose.Types.ObjectId();

it("returns a 404 if the gig is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/gigs/${id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).delete(`/api/gigs/${id}`).expect(401);
});

it("deletes the gig if it exists and the user is authenticated", async () => {
  // Create a gig
  const createResponse = await request(app)
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

  // Delete the gig
  await request(app)
    .delete(`/api/gigs/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(204);

  // Fetch the deleted gig
  const fetchResponse = await request(app)
    .get(`/api/gigs/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});

it("returns a 404 if an invalid gig ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/gigs/${invalidId}`)
    .set("Cookie", global.signin("client", fakeId))
    .expect(404);
});
