const request = require("supertest");
const app = require("./server");

describe("User API", () => {
  test("GET /users should return users", async () => {
    const response = await request(app)
      .get("/users");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /users/1 should return user", async () => {
    const response = await request(app)
      .get("/users/1");

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
    expect(response.body.name).toBe("John");
  });

  test("GET /users/999 should return 404", async () => {
    const response = await request(app)
      .get("/users/999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  test("POST /users should create a user", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Alice",
        email: "alice@example.com",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("Alice");
    expect(response.body.email).toBe("alice@example.com");
  });

  test("POST /users should return 400 without required fields", async () => {
    const response = await request(app)
      .post("/users")
      .send({
        name: "Alice",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe(
      "Name and email are required"
    );
  });
});