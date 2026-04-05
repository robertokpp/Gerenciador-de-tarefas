import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";


describe("UsersController", () => {
  let id: number;
  afterAll(async () => {
    await prisma.user.delete({
      where: { id },
    });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: `testUser@email.com`,
      password: "password123",
    });

    expect(response.status).toBe(201);
    id = response.body.id;
  });
});

