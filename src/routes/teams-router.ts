import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";


const teamsRouter = Router();
const teamsController = new TeamsController();

teamsRouter.use(ensureAuthenticated)
teamsRouter.post("/", teamsController.create);

export { teamsRouter };
