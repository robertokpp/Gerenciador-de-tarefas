import { Request, Response  } from "express";
import { prisma } from "@/database/prisma";

class TaskMemberController{
  async index(request: Request, response: Response){
    const user = Number(request.user?.id)
   const tasks =  await prisma.tasks.findMany({
      where: { assignedTo: user}
    })

    return response.json(tasks)
  }

  
}

export { TaskMemberController }