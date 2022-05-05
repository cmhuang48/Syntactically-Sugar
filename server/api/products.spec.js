const { expect } = require("chai");
const request = require("supertest");
const {
  db,
  models: { Product },
} = require("../db");
const seed = require("../../script/seed");
const app = request(require("../app"));

describe("Product routes", () => {
  beforeEach(async () => {
    await seed();
  });

  describe("GET /api/products", () => {
    it("GET /api/products", async () => {
      const res = await request(app).get("/api/products").expect(200);

      expect(res.body).to.be.an("array");
      expect(res.body.length).to.equal(8);
    });
  });

  describe("GET /api/products/:id", () => {
    it("returns a product", async () => {
      const foo = await Product.findOne({
        where: {
          name: "chocolate",
        },
      });

      const res = await request(app).get(`/api/products/${foo.id}`).expect(200);

      expect(res.body).to.be.an("object");
      expect(res.body.name).to.equal("chocolate");
    });
  });

  describe("POST /api/products", () => {
    it("creates a product", async () => {
      const foo = await Product.create({
        productId: 1,
        orderId: 1,
        name: "chocolate",
        quantity: 1,
      });

      const res = request(app).post("/api/products").expect(201);
    });
  });
});
