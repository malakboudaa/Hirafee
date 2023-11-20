import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 404 if the profile is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${id}`)
    .set("Cookie", global.signin("admin"))
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${id}`)
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(401);
});

it("updates the profile if valid inputs are provided", async () => {
  const fakeId = new mongoose.Types.ObjectId().toHexString();
  const fakeIdd = new mongoose.Types.ObjectId().toHexString();
  const {
    email,
    firstName,
    lastName,
    username,
    role,
    phoneNumber,
    location,
    biography,
    categorie,
    portfolio,
    banned,
    belongsTo,
    createdTheProfile,
  } = {
    email: "test@test.com",
    firstName: "amine",
    lastName: "mohammd",
    username: "blix",
    phoneNumber: "123465789",
    location: "arizona",
    role: "admin",
    biography: "fjkdlqmsjfdmkjsmqfk",
    categorie: "fjkdlqmsjfdmkjsmqfk",
    portfolio: [],
    banned: false,
    belongsTo: fakeId,
    createdTheProfile: fakeIdd,
  };
  // Create a profile
  const createResponse = await request(app)
    .post("/api/profiles")
    .set("Cookie", global.signin("admin"))
    .send({
      email,
      firstName,
      lastName,
      username,
      role,
      phoneNumber,
      location,
      biography,
      categorie,
      portfolio,
      banned,
      belongsTo,
      createdTheProfile,
    })
    .expect(201);

  const updatedBiography = "Updated Biography";
  const updatedPhoneNumber = "Updated Phone Number";
  const updatedLocation = "Updated Location";
  const updatedemail = "Updated Location";
  const updatedfirstName = "Updated Location";
  const updatedlastName = "Updated Location";
  const updatedusername = "Updated Location";

  // Update the profile
  const updateResponse = await request(app)
    .put(`/api/profiles/${createResponse.body.id}`)
    .set("Cookie", global.signin("admin"))
    .send({
      email: updatedemail,
      role: "admin",
      firstName: updatedfirstName,
      lastName: updatedlastName,
      username: updatedusername,
      biography: updatedBiography,
      phoneNumber: updatedPhoneNumber,
      location: updatedLocation,
      portfolio: [],
      banned: false,
      belongsTo: new mongoose.Types.ObjectId(),
      createdTheProfile: new mongoose.Types.ObjectId(),
    })
    .expect(200);

  // Assert the profile is updated
  expect(updateResponse.body.username).toEqual(updatedusername);
  expect(updateResponse.body.firstName).toEqual(updatedfirstName);
  expect(updateResponse.body.lastName).toEqual(updatedlastName);
  expect(updateResponse.body.email).toEqual(updatedemail);

  expect(updateResponse.body.biography).toEqual(updatedBiography);
  expect(updateResponse.body.phoneNumber).toEqual(updatedPhoneNumber);
  expect(updateResponse.body.location).toEqual(updatedLocation);
  //   expect(updateResponse.body.portfolio).toEqual(updatedPortfolio);
});

it("returns a 404 if an invalid profile ID is provided", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .put(`/api/profiles/${invalidId}`)
    .set("Cookie", global.signin("admin"))
    .send({
      name: "Updated Name",
      biography: "Updated Biography",
      phoneNumber: "Updated Phone Number",
      location: "Updated Location",
      portfolio: [{ image: "updated.jpg", description: "Updated Description" }],
    })
    .expect(404);
});
