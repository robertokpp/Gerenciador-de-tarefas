import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksHistoryController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      taskId: z.number().int().positive(),
      newStatus: z.string(),
    });

    const user = Number(request.user?.id);
    const { taskId } = bodySchema.parse(request.body);
    const { newStatus } = bodySchema.parse(request.body);

    const lastTaskHistory = await prisma.tasksHistory.findFirst({
      where: { taskId },
      orderBy: { id: "desc" },
    });

    if (lastTaskHistory) {
      const oldStatus = lastTaskHistory.newStatus;
      const taskHistory = await prisma.tasksHistory.create({
        data: {
          taskId,
          changedId: user,
          oldStatus: oldStatus,
          newStatus,
        },
      });
      return response.json(taskHistory);
    }

    const task = await prisma.tasksHistory.create({
      data: {
        taskId,
        changedId: user,
        oldStatus: "",
        newStatus,
      },
    });

    return response.json();
  }

  async index(request: Request, response: Response) {
    const taskHistory = await prisma.tasksHistory.findMany();
    return response.json(taskHistory);
  }
}

export { TasksHistoryController };
