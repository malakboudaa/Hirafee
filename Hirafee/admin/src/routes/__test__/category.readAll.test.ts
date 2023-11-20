import request from "supertest";
import { app } from "../../app";
import { Category } from "../../models/category";

it("returns 200 and all categories on successful read", async () => {
  await Category.create({ name: "Category 1" });
  await Category.create({ name: "Category 2" });

  const response = await request(app)
    .get("/api/categories")
    .set("Cookie", global.signin("admin"))
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0].name).toEqual("Category 1");
  expect(response.body[1].name).toEqual("Category 2");
});
