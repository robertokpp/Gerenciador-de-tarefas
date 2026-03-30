import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksStatusController {
  async index(request: Request, response: Response) {
    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    });

    const userRole = request.user?.role;

    if (userRole === "admin") {
      const { status } = bodySchema.parse(request.body);
      const taskStatus = await prisma.tasks.findMany({
        where: {
          status,
        },
      });
      return response.json(taskStatus);
    } else if (userRole === "member") {
      const userId = Number(request.user?.id);

      const { status } = bodySchema.parse(request.body);
      const taskStatus = await prisma.tasks.findMany({
        where: {
          assignedTo: userId,
          status,
        },
      });

      return response.json(taskStatus);
    }
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    });

    const userRole = request.user?.role;
    const userId = Number(request.user?.id);

    const assignedUser = await prisma.tasks.count({
      where: { assignedTo: userId },
    });

    //teste de verificação
    if (userRole === "admin" || assignedUser > 0) {
      const { id } = paramsSchema.parse(request.params);
      const { status } = bodySchema.parse(request.body);

      await prisma.tasks.update({
        where: {
          id,
        },
        data: {
          status,
        },
      });
    }

    return response.json();
  }
}

export { TasksStatusController };
