import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { z } from "zod";

class TasksAssignedController {
  async update(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const bodySchema = z.object({
      userId: z.number().int().positive()
    });

    const { id } = paramsSchema.parse(request.params)
    const { userId } = bodySchema.parse(request.body);

    const task = await prisma.tasks.findFirst({
      where:{
        id
      }
    })

    
    
    //Verifica se o usuário pertence ao time
    const exists = await prisma.teamMembers.findFirst({
      where: {
        userId,
        teamId: task?.teamId
      },
    });

    if (!exists) {
      throw new AppError("This user is not part of this team.");
    }

    const taskUpdate = await prisma.tasks.update({
      where: { id },
      data:{
        assignedTo: userId
      }
    })

    return response.status(200).json(taskUpdate);
  }
}

export { TasksAssignedController };
