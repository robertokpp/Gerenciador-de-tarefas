import { Request, Response } from "express";
import {z} from "zod"

class TasksController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
    
    })



    return response.json("ok");
  }
}

export { TasksController };
