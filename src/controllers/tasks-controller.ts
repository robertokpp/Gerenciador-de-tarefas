import { Request, Response } from "express";
import { number, z } from "zod";
import { prisma } from "@/database/prisma";

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      teamId: z.number().int().positive(),
    });

    const { title, description, priority, teamId } = bodySchema.parse(
      request.body,
    );

    const userId = Number(request.user?.id);

    if (!userId) {
      return response
        .status(401)
        .json({ message: "Invalid authenticated user" });
    }

    const task = await prisma.tasks.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        assignedTo: userId,
        teamId: teamId,
      },
    });
    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const userRole = request.user?.role;

    if (userRole === "admin") {
      const tasks = await prisma.tasks.findMany({
        orderBy: { id: "asc" },
      });
      return response.json(tasks);
    } else if(userRole === "member"){
      const userId = Number(request.user?.id);

      const tasks = await prisma.tasks.findMany({
        where: { assignedTo: userId },
        orderBy: { id: "asc" },
      });
      return response.json(tasks);
    }
  }

  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high", "medium", "low"]),
      teamId: z.number().int().positive(),
    });
    const { id } = paramsSchema.parse(request.params);
    const { title, description, priority, teamId } = bodySchema.parse(
      request.body,
    );

    const task = await prisma.tasks.update({
      where: { id },
      data: {
        title: title,
        description: description,
        priority: priority,
        teamId: teamId,
      },
    });

    return response.json(task);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.tasks.delete({
      where: { id },
    });

    return response.json();
  }
}

export { TasksController };
