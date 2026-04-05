import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

describe("TeamController", () => {
  let id: number;
  let token: string;
  let idTeam: number;
  afterAll(async () => {
    await prisma.user.delete({
      where: { id },
    });
  });

  it("Create the user for testing. - add admin role", async () => {
    const UserResponse = await request(app).post("/users").send({
      name: "Test admin",
      email: "testadmin@email.com",
      password: "123456",
    });

    id = UserResponse.body.id;

    await prisma.user.update({
      where: { id },
      data: { role: "admin" },
    });
  });

  it("enters the session", async () => {
    const SessionsResponse = await request(app).post("/sessions").send({
      email: "testadmin@email.com",
      password: "123456",
    });
    token = SessionsResponse.body.token;
  });

  it("create the team", async () => {
    const createTeamResponse = await request(app)
      .post("/teams")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "test team",
        description: "team created for testing",
      });

    expect(createTeamResponse.status).toBe(201);
    idTeam = createTeamResponse.body.id;
  });

  it("show all teams", async () => {
    const showTeamsResponse = await request(app)
      .get("/teams")
      .set("Authorization", "Bearer " + token)
      .send({});
    expect(showTeamsResponse.status).toBe(200);
  });

  it("Update the team", async () => {
    const updateTeamsResponse = await request(app)
      .patch(`/teams/${idTeam}`)
      .set("Authorization", "Bearer " + token)
      .send({
        name: "test update team",
        description: "updating the created team",
      });

    expect(updateTeamsResponse.status).toBe(200);
  });

  it("Remove the team", async () => {
    const updateTeamsResponse = await request(app)
      .delete("/teams")
      .set("Authorization", "Bearer " + token)
      .send({
        id: idTeam,
      });

    expect(updateTeamsResponse.status).toBe(204);
  });
});
