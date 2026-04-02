import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

class TasksStatusController {
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    });

    const userId = Number(request.user?.id);
    const userRole = request.user?.role;
    const { status } = querySchema.parse(request.query);

    if (userRole === "member") {
      const tasks = await prisma.tasks.findMany({
        where: {
          assignedTo: userId,
          status,
        },
      });

      return response.json(tasks);
    }

    if (userRole === "admin") {
      const tasks = await prisma.tasks.findMany({
        where: {
          status,
        },
      });

      return response.json(tasks);
    }
    throw new AppError("Unauthorized", 401);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { status } = bodySchema.parse(request.body);

    const userId = Number(request.user?.id);
    const userRole = request.user?.role;

    if (userRole === "member") {
      const task = await prisma.tasks.findFirst({
        where: { id },
      });

      if (!task) {
        throw new AppError("Task not found", 404);
      }

      if (task.assignedTo !== userId) {
        throw new AppError("Unauthorized", 401);
      }
    }

    if (userRole === "admin") {
      const tasks = await prisma.tasks.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
      return response.json(tasks);
    }

    throw new AppError("Unauthorized", 401);
  }
}

export { TasksStatusController };
