import { Router } from "express";
import { validateBody, authenticateToken } from "../middlewares/index.js";
import { catSchema } from "../schemas/index.js";
import {
	getAllCats,
	getAllCatsFromUser,
	postCat,
	updateAvailableCat,
} from "../controllers/index.js";

const catsRouter = Router();

catsRouter
	.all("/*", authenticateToken)
	.post("/", validateBody(catSchema), postCat)
	.get("/", getAllCats)
	.get("/user/:userId", getAllCatsFromUser)
	.put("/:catId", updateAvailableCat);

export { catsRouter };
