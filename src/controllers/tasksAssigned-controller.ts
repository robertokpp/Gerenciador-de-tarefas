import { prisma } from "@/database/prisma";
import { Request, Response } from "express";
import { z } from "zod";

class tasksAssignedController{
  async update(request: Request, response:Response){
    const bodySchema = z.object({
      userId: z.number().int().positive()
    })

    const userCheck = await prisma.teamMembers
  }
}