import { TeamsMembersController } from "@/controllers/teamsMembers-controller";
import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const teamsMembersRouter = Router();
const teamsMembersController = new TeamsMembersController();

teamsMembersRouter.use(ensureAuthenticated, verifyUserAuthorization(["admin"]))

teamsMembersRouter.post("/", teamsMembersController.create)
teamsMembersRouter.delete("/", teamsMembersController.remove)

