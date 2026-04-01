import { Router } from "express";
import { TaskMemberController } from "@/controllers/tasksMember-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const taskMemberRouter = Router();
const taskMemberController = new TaskMemberController();

taskMemberRouter.use(ensureAuthenticated, verifyUserAuthorization(["member", "admin"]))
taskMemberRouter.get("/", taskMemberController.index)

export { taskMemberRouter }