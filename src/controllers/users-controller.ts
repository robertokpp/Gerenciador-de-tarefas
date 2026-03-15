import { Request, Response } from "express";
import { z } from "zod";
import { hash } from "bcrypt";

class UserController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim(),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(request.body);

    const hashPassword = await hash(password, 8);

    return response.json({ message: "ok", hashPassword });
  }
}

export { UserController };
