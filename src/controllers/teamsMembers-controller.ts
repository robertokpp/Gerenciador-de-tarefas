import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";

class TeamsMembersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.number().int().positive(),
      teamId: z.number().int().positive(),
    });

    const { userId, teamId } = bodySchema.parse(request.body);

    const teamMembers = await prisma.teamMembers.create({
      data: {
        userId: userId,
        teamId: teamId,
      },
    });
    return response.status(201).json("ok");
  }

  async remove(request: Request, response: Response) {
    return response.json("message: ok");
  }
}

export { TeamsMembersController };
