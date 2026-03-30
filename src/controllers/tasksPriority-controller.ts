import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksPriorityController {
  async index(request: Request, response: Response) {
    const bodySchema = z.object({
      priority: z.enum(["high", "medium", "low"]),
    });

    const { priority } = bodySchema.parse(request.body);

    const taskPriority = await prisma.tasks.findMany({
      where: {
        priority,
      },
      orderBy: {
        id: "asc",
      },
    });

    return response.status(200).json(taskPriority);
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      priority: z.enum(["high", "medium", "low"]),
    });

    const { id } = paramsSchema.parse(request.params);
    const { priority } = bodySchema.parse(request.body);

    await prisma.tasks.update({
      where: { id },
      data: { priority },
    });

    return response.json();
  }
}

export { TasksPriorityController };
