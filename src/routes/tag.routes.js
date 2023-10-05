import { Router } from "express";
import { authenticateToken } from "../middlewares/index.js";
import { getPopularTags } from "../controllers/index.js";

const tagsRouter = Router();

tagsRouter.all("/*", authenticateToken).get("/", getPopularTags);

export { tagsRouter };
