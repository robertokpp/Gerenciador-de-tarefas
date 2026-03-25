import { Request, Response } from "express";
import {z} from "zod"
import { prisma } from "@/database/prisma";

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      title: z.string(),
      description: z.string(),
      priority: z.enum(["high","medium", "low"]),
      teamId: z.number().int().positive(),
    })

    const { title, description , priority, teamId } = bodySchema.parse(request.body)
    
    const userId = Number(request.user?.id)

    if (!userId) {
      return response.status(401).json({ message: "Invalid authenticated user" })
    }

    const task = await prisma.tasks.create({
      data: {
        title: title,
        description: description,
        priority: priority,
        assignedTo: userId,
        teamId,
      }
    })
    return response.status(201).json(task);
  }
}

export { TasksController };
