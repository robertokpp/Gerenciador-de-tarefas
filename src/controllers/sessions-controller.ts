import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { authConfig } from "@/configs/auth";

class SessionsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new AppError("User or password incorrect", 401);
    }

    const userMatched = await compare(password, user.password);

    if (!userMatched) {
      throw new AppError("User or password incorrect", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role ?? "member" }, secret, {
      subject: String(user.id),
      expiresIn,
    });
    
    return response.json({ token });
  }
}

export { SessionsController };
