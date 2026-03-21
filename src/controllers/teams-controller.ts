import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";


class TeamsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = bodySchema.parse(request.body)

    const team = await prisma.teams.create({
      data: {
        name: name,
        description: description
      }
    })

    return response.status(201).json();
  }
}

export { TeamsController };
