import request from "supertest";
import { prisma } from "@/database/prisma";
import { app } from "@/app";

describe("TasksController", () => {
  let id: number;
  let token: string;
  let teamId: number;

  afterAll(async () => {
    if (teamId) {
      await prisma.tasks.deleteMany({
        where: { assignedTo: id, teamId },
      });

      await prisma.teams.deleteMany({
        where: { id: teamId },
      });
    }

    await prisma.user.delete({
      where: { id },
    });
  });

  it("Creating the user for testing and starting a session.", async () => {
    const CreateUserResponse = await request(app).post("/users").send({
      name: "Test tasks",
      email: "taskstest@email.com",
      password: "password123",
    });
    id = CreateUserResponse.body.id;

    await prisma.user.update({
      where: { id },
      data: { role: "admin" },
    });

    const SessionUserResponse = await request(app).post("/sessions").send({
      email:"taskstest@email.com",
      password: "password123",
    });

    token = SessionUserResponse.body.token;

    const TeamResponse = await request(app)
      .post("/teams")
      .set("Authorization", "Bearer " + token)
      .send({
        name: "Test team",
        description: "Team created for tasks test",
      });

    teamId = TeamResponse.body.id;
  });

  it("Creating a task as an admin role.", async () => {
    const TasksResponse = await request(app)
      .post("/tasks")
      .set("Authorization", "Bearer " + token)
      .send({
        title: "task title test",
        description: "description test",
        priority: "low",
        teamId,
      });

    expect(TasksResponse.status).toBe(201);
  });
});
