import { Router } from "express";
import { TasksHistoryController } from "@/controllers/tasksHistory-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"; 

const tasksHistoryRouter = Router()
const tasksHistoryController = new TasksHistoryController()

tasksHistoryRouter.use(ensureAuthenticated)

tasksHistoryRouter.post("/", tasksHistoryController.create)
tasksHistoryRouter.get("/", tasksHistoryController.index)

export { tasksHistoryRouter}