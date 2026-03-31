import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksHistoryController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      task_id: z.number(),
      newStatus: z.string(),
    });

    const user = Number(request.user?.id);

    const { task_id, newStatus } = bodySchema.parse(request.body);

    const taskHistory = await prisma.tasksHistory.create({
      data: {
        taskId: task_id,
        changedId: user,
        oldStatus: newStatus,
        newStatus,
      },
    });

    return response.json(taskHistory)
  }
}
