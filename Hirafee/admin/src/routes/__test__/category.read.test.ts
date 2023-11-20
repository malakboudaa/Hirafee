import request from "supertest";
import { app } from "../../app";
import { Category } from "../../models/category";
import mongoose from "mongoose";

it("returns 200 and the category data on successful read", async () => {
  const category = Category.build({ name: "Test Category" });
  await category.save();

  const response = await request(app)
    .get(`/api/categories/${category.id}`)
    .set("Cookie", global.signin("admin"))
    .expect(200);

  expect(response.body.id).toEqual(category.id);
  expect(response.body.name).toEqual(category.name);
});

it("returns 404 if category does not exist", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/categories/${invalidId}`)
    .set("Cookie", global.signin("admin"))
    .expect(404);
});
