const { describe, it } = require("mocha");
const request = require("supertest");
const assert = require("assert");

const app = require("./api");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const res = await request(app).get("/contact").expect(200);
      assert.deepStrictEqual(res.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const res = await request(app).get("/hi").expect(200);
      assert.deepStrictEqual(res.text, "hello world");
    });
  });

  describe("/login", () => {
    it("should login successfully and return 200 status", async () => {
      const res = await request(app)
        .post("/login")
        .send({ userName: "wiinan", password: 123 })
        .expect(200);
      assert.deepStrictEqual(res.text, "Login has succeeded!");
    });

    it("should unauthorize a request when requesting it using wrong credentials and return HTTP Status 401", async () => {
      const res = await request(app)
        .post("/login")
        .send({ userName: "outro", password: 123 })
        .expect(401);

      assert.ok(res.unauthorized)
      assert.deepStrictEqual(res.text, "Login failed!");
    });
  });
});
