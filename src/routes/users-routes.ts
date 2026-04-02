import { Router } from "express";
import { UserController } from "@/controllers/users-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.get("/",ensureAuthenticated, verifyUserAuthorization(["admin"]), userController.index)

export { userRoutes };
