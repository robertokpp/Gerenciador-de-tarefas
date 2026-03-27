import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { TasksStatusController } from "@/controllers/tasksStatus-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const tasksRouter = Router();
const tasksController = new TasksController();
const tasksStatusController = new TasksStatusController();

tasksRouter.use(ensureAuthenticated)

tasksRouter.post("/", tasksController.create);
tasksRouter.get("/", tasksController.index)
tasksRouter.patch("/:id", tasksController.update)
tasksRouter.delete("/:id", tasksController.remove)

tasksRouter.get("/status", tasksStatusController.index)
tasksRouter.patch("/:id/status", tasksStatusController.update)

export { tasksRouter };
