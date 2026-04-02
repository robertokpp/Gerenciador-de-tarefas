import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { z } from "zod";

class TasksPriorityController {
  async index(request: Request, response: Response) {
    const querySchema = z.object({
      priority: z.enum(["high", "medium", "low"]),
    });

    const { priority } = querySchema.parse(request.query);
    const userRole = request.user?.role;
    const userId = Number(request.user?.id);

    if (userRole === "member") {
      const taskPriority = await prisma.tasks.findMany({
        where: {
          priority,
          assignedTo: userId,
        },
        orderBy: {
          id: "asc",
        },
      });
      return response.status(200).json(taskPriority);
    }
    if (userRole === "admin") {
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

    throw new AppError("Unauthorized", 401);
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
    const userRole = request.user?.role;
    const userId = Number(request.user?.id);

    if(userRole === "member"){
      const task = await prisma.tasks.findFirst({
        where: { id }
      })

      if(userId !== task?.assignedTo){
        throw new AppError("Unauthorized", 401)
      }
    }

   const task =  await prisma.tasks.update({
      where: { id },
      data: { priority },
    });

    return response.json(task);
  }
}

export { TasksPriorityController };
