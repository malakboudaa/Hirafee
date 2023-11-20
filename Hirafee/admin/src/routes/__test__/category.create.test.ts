import request from "supertest";
import { app } from "../../app";
import { Category } from "../../models/category";

it("returns 201 on successful category creation", async () => {
  const response = await request(app)
    .post("/api/categories")
    .set("Cookie", global.signin("admin"))
    .send({ name: "Test Category" })
    .expect(201);

  const { id, name } = response.body;
  const category = await Category.findById(id);

  expect(category).toBeDefined();
  expect(category!.name).toEqual(name);
});

it("returns 401 if user is not authenticated", async () => {
  await request(app)
    .post("/api/categories")
    .send({ name: "Test Category" })
    .expect(401);
});

it("returns 401 if user is not an admin", async () => {
  await request(app)
    .post("/api/categories")
    .set("Cookie", global.signin("user"))
    .send({ name: "Test Category" })
    .expect(401);
});

it("returns 400 if name is not provided", async () => {
  await request(app)
    .post("/api/categories")
    .set("Cookie", global.signin("admin"))
    .send({})
    .expect(400);
});
