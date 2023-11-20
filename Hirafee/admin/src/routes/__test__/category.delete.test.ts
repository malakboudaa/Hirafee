import request from "supertest";
import { app } from "../../app";
import { Category } from "../../models/category";
import mongoose from "mongoose";

it("returns 204 on successful category deletion", async () => {
  const category = Category.build({ name: "Test Category" });
  await category.save();

  await request(app)
    .delete(`/api/categories/${category.id}`)
    .set("Cookie", global.signin("admin"))
    .expect(204);

  const deletedCategory = await Category.findById(category.id);
  expect(deletedCategory).toBeNull();
});

it("returns 401 if user is not authenticated", async () => {
  await request(app).delete("/api/categories/123456").expect(401);
});

it("returns 401 if user is not an admin", async () => {
  const catId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .delete(`/api/categories/${catId}`)
    .set("Cookie", global.signin("user"))
    .expect(401);
});

it("returns 404 if category does not exist", async () => {
  const invalidId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/categories/${invalidId}`)
    .set("Cookie", global.signin("admin"))
    .expect(404);
});
