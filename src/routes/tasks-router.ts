import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { TasksStatusController } from "@/controllers/tasksStatus-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { TasksPriorityController } from "@/controllers/tasksPriority-controller";
import { TasksAssignedController  } from "@/controllers/tasksAssigned-controller";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";


const tasksRouter = Router();
const tasksController = new TasksController();
const tasksStatusController = new TasksStatusController();
const tasksPriorityController = new TasksPriorityController();
const tasksAssignedController  = new TasksAssignedController()

tasksRouter.use(ensureAuthenticated);

tasksRouter.post("/",verifyUserAuthorization(["admin"]), tasksController.create);
tasksRouter.get("/", tasksController.index);
tasksRouter.patch("/:id",verifyUserAuthorization(["admin"]), tasksController.update);
tasksRouter.delete("/:id",verifyUserAuthorization(["admin"]),tasksController.remove);

tasksRouter.get("/status", tasksStatusController.index);
tasksRouter.patch("/:id/status", tasksStatusController.update);

tasksRouter.get("/priority", tasksPriorityController.index);

tasksRouter.patch("/:id/assign", tasksAssignedController.update)

export { tasksRouter };
