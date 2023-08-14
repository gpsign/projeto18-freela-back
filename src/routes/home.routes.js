import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {
	getMiausList,
	getMiauTags,
	postMiau,
	getMiauByOwner,
	editMiau,
	exit,
} from "../controllers/home.controller.js";

const homeRouter = Router();

homeRouter.get("/home", validateToken, getMiausList);
homeRouter.get("/tags/:id", validateToken, getMiauTags);
homeRouter.get("/owner/:id", validateToken, getMiauByOwner);
homeRouter.post("/miau", validateToken, postMiau);
homeRouter.put("/miau/:id", validateToken, editMiau);
homeRouter.delete("/exit", exit);

export default homeRouter;
