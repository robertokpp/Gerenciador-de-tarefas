import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class TasksStatusController {
  async index(request: Request, response: Response) {
    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    });

    const { status } = bodySchema.parse(request.body);

    const taskStatus = await prisma.tasks.findMany({
      where: {
        status,
      },
    });

    return response.json(taskStatus);
  }

  async update(request: Request, response: Response){
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive()
    })

    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]),
    })

    const { id } = paramsSchema.parse(request.params)
    const { status } = bodySchema.parse(request.body)

    await prisma.tasks.update({
      where:{
        id
      },
      data :{
        status
      }
    })

    return response.json()
  }
}

export { TasksStatusController };
