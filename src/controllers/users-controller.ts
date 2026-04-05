import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);
    const hashPassword = await hash(password, 8);

    const emailAlreadyRegistered = await prisma.user.findFirst({
      where: { email },
    });

    if (emailAlreadyRegistered) {
      throw new AppError("This email has already been registered.");
    }

   const user =  await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return response.status(201).json(user);
  }

  async index(request: Request, response: Response) {
    const user = await prisma.user.findMany();

    return response.json(user);
  }
}

export { UserController };
