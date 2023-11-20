import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
const fakeId = new mongoose.Types.ObjectId();

it("returns a 404 if the gig is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/gigs/${id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Updated Title",
      description: "Updated Description",
      budget: 2000,
      location: "Updated Location",
      category: "Updated Category",
      requirements: ["Updated Requirement 1", "Updated Requirement 2"],
      banned: false,
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/gigs/${id}`)
    .send({
      title: "Updated Title",
      description: "Updated Description",
      budget: 2000,
      location: "Updated Location",
      category: "Updated Category",
      requirements: ["Updated Requirement 1", "Updated Requirement 2"],
      banned: false,
    })
    .expect(401);
});

it("updates the gig if valid inputs are provided", async () => {
  const gig = {
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

  // Create a gig
  const createResponse = await request(app)
    .post("/api/gigs")
    .set("Cookie", global.signin("client", fakeId))
    .send(gig)
    .expect(201);

  const updatedTitle = "Updated Title";
  const updatedDescription = "Updated Description";
  const updatedBudget = 2000;
  const updatedLocation = "Updated Location";
  const updatedCategory = "Updated Category";
  const updatedRequirements = [
    "Updated Requirement 1",
    "Updated Requirement 2",
  ];

  // Update the gig
  const updateResponse = await request(app)
    .put(`/api/gigs/${createResponse.body.id}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: updatedTitle,
      description: updatedDescription,
      budget: updatedBudget,
      location: updatedLocation,
      category: updatedCategory,
      requirements: updatedRequirements,
    })
    .expect(200);

  // Assert the gig is updated
  expect(updateResponse.body.title).toEqual(updatedTitle);
  expect(updateResponse.body.description).toEqual(updatedDescription);
  expect(updateResponse.body.budget).toEqual(updatedBudget);
  expect(updateResponse.body.location).toEqual(updatedLocation);
  expect(updateResponse.body.category).toEqual(updatedCategory);
  expect(updateResponse.body.requirements).toEqual(updatedRequirements);
});

it("returns a 404 if an invalid gig ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/gigs/${invalidId}`)
    .set("Cookie", global.signin("client", fakeId))
    .send({
      title: "Updated Title",
      description: "Updated Description",
      budget: 2000,
      location: "Updated Location",
      category: "Updated Category",
      requirements: ["Updated Requirement 1", "Updated Requirement 2"],
      banned: false,
    })
    .expect(404);
});
