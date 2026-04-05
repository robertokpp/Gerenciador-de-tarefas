import { app } from "@/app";
import { prisma } from "@/database/prisma";
import request from "supertest";

describe("SessionsController", () => {
  let id: number;
  afterAll(async () => {
    await prisma.user.delete({
      where: { id },
    });
  });

  it("Create the user for testing.", async () => {
    const UserResponse = await request(app).post("/users").send({
      name: "Roberto Kennedy",
      email: "robertokennedy@email.com",
      password: "123456",
    });

    id = UserResponse.body.id;
  });

  it("It tests user authentication and becomes a token.", async () => {
    const SessionsResponse = await request(app).post("/sessions").send({
      email: "robertokennedy@email.com",
      password: "123456",
    });
    expect(SessionsResponse.status).toBe(200);
    expect(SessionsResponse.body.token);
  });

});
