import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class TeamsMembersController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      userId: z.number().int().positive(),
      teamId: z.number().int().positive(),
    });

    const { userId, teamId } = bodySchema.parse(request.body);

    if (userId) {
      try {
      } catch (error) {}
    }

    const teamMembers = await prisma.teamMembers.create({
      data: {
        userId: userId,
        teamId: teamId,
      },
    });
    return response.status(201).json("ok");
  }

  async index(request: Request, response: Response) {
    const teamsMembers = await prisma.teamMembers.findMany();

    return response.status(200).json(teamsMembers);
  }

  async remove(request: Request, response: Response) {
    const paramsSchema = z.object({
      id: z.coerce.number().int().positive(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.teamMembers.delete({
      where: { id },
    });

    return response.status(200);
  }
}

export { TeamsMembersController };
