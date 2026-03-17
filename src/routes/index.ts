import {Router} from "express"
import { userRoutes } from "./users-routes"
import { sessionsRouter } from "./sessions-routes"

const router = Router()


router.use("/users", userRoutes)
router.use("/sessions", sessionsRouter)

export { router }