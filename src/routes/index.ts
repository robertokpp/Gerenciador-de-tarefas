import {Router} from "express"
import { userRoutes } from "./users-routes"
import { sessionsRouter } from "./sessions-routes"
import { tasksRouter } from "./tasks-router"
import { teamsRouter } from "./teams-router"
const router = Router()


router.use("/users", userRoutes)
router.use("/sessions", sessionsRouter)
router.use("/tasks", tasksRouter)
router.use("/teams", teamsRouter)

export { router }