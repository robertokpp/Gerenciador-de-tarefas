import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class TasksHistoryController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      task_id: z.number(),
      newStatus: z.string(),
    });

    const user = Number(request.user?.id);

    const { task_id, newStatus } = bodySchema.parse(request.body);
    const OldTaskHistory = await prisma.tasksHistory.findFirst({
      where: { taskId: task_id },
    });

    const oldStatus = OldTaskHistory?.newStatus ?? "";

    if (oldStatus) {
      throw new AppError("Unauthorized action");
    }

    const taskHistory = await prisma.tasksHistory.create({
      data: {
        taskId: task_id,
        changedId: user,
        oldStatus: oldStatus,
        newStatus,
      },
    });

    return response.json(taskHistory);
  }

  async update(request: Request, response: Response) {
    const bodySchema = z.object({
      newStatus: z.string(),
    });

    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });
    const user = Number(request.user?.id);

    const { id } = paramsSchema.parse(request.params)
    const { newStatus } = bodySchema.parse(request.body);

    const OldTaskHistory = await prisma.tasksHistory.findFirst({
      where: { id: id },
    });

    const oldStatus = OldTaskHistory?.newStatus ?? "";

    const taskHistory = await prisma.tasksHistory.update({
      where: {id},
      data: {
        changedId: user,
        oldStatus,
        newStatus,
      },
    });

    return response.json(taskHistory);
  }
}

export { TasksHistoryController };
