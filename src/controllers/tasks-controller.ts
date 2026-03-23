import { Request, Response } from "express";
import {z} from "zod"
import { Priority } from "../../generated/prisma/enums";
import { prisma } from "@/database/prisma";

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      priority: z.string(),
    })

    const { title, description , priority } = bodySchema.parse(request.body)

    const task = await prisma.tasks.create({
      data: {
        title: title,
        description: description,
        priority: priority,
      }
    })
    return response.json("ok");
  }
}

export { TasksController };
