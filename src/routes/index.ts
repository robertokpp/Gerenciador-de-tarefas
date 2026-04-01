import { Router } from "express";
import { userRoutes } from "./users-routes";
import { sessionsRouter } from "./sessions-routes";
import { tasksRouter } from "./tasks-router";
import { teamsRouter } from "./teams-router";
import { teamsMembersRouter } from "./teamsMembers-routes";
import { taskMemberRouter } from "./tasksMember-router";
import { tasksHistoryRouter } from "./taskshistory-router";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionsRouter);
router.use("/tasks", tasksRouter);
router.use("/teams", teamsRouter);
router.use("/team-member", teamsMembersRouter);
router.use("/task-member", taskMemberRouter);
router.use("/task-history", tasksHistoryRouter);

export { router };
