import request from "supertest";
import { app } from "../../app";
import { Category } from "../../models/category";
import mongoose from "mongoose";

it("returns 200 and the updated category data on successful update", async () => {
  const category = Category.build({ name: "Test Category" });
  await category.save();

  const updatedName = "Updated Category";
  await request(app)
    .put(`/api/categories/${category.id}`)
    .set("Cookie", global.signin("admin"))
    .send({ name: updatedName })
    .expect(200);

  const updatedCategory = await Category.findById(category.id);
  expect(updatedCategory!.name).toEqual(updatedName);
});

it("returns 401 if user is not authenticated", async () => {
  await request(app).put("/api/categories/123456").expect(401);
});

it("returns 401 if user is not an admin", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/categories/${invalidId}`)
    .set("Cookie", global.signin("user"))
    .expect(401);
});

it("returns 404 if category does not exist", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/categories/${invalidId}`)
    .set("Cookie", global.signin("admin"))
    .send({ name: "Updated Category" })
    .expect(404);
});

it("returns 400 if name is not provided", async () => {
  const category = Category.build({ name: "Test Category" });
  await category.save();

  await request(app)
    .put(`/api/categories/${category.id}`)
    .set("Cookie", global.signin("admin"))
    .send({})
    .expect(400);
});
