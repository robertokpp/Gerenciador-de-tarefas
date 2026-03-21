import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class TeamsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = bodySchema.parse(request.body);

    const team = await prisma.teams.create({
      data: {
        name: name,
        description: description,
      },
    });

    return response.status(201).json();
  }

  async index(request: Request, response: Response) {
    const teams = await prisma.teams.findMany();
    return response.json(teams);
  }

  async remove(request: Request, response: Response) {
    const bodySchema = z.object({
      id: z.number(),
    });

    const { id } = bodySchema.parse(request.body);

    const teams = await prisma.teams.delete({
      where: { id },
    });
  }

  async update(request: Request, response: Response){
    
  }
}

export { TeamsController };
