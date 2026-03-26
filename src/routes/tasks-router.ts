import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.use(ensureAuthenticated)
tasksRouter.post("/", tasksController.create);
tasksRouter.get("/", tasksController.index)
tasksRouter.patch("/:id", tasksController.update)
tasksRouter.delete("/:id", tasksController.remove)
export { tasksRouter };
