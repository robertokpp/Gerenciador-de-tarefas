import { Request, Response } from "express";
import { json } from "zod";

class UserController {
  create(request: Request, response: Response) {
    return json({ message: "ok" });
  }
}

export { UserController };
