import { Router } from "express";
import { authenticateToken, validateBody } from "../middlewares/index.js";
import { notificationSchema } from "../schemas/index.js";
import {
	postNotification,
	getNotificationsForUser,
	deleteNotification,
} from "../controllers/index.js";

const notificationsRouter = Router();

notificationsRouter
	.all("/*", authenticateToken)
	.post("/", validateBody(notificationSchema), postNotification)
	.get("/", getNotificationsForUser)
	.delete("/:id", deleteNotification);

export { notificationsRouter };
