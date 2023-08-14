import { Router } from "express";
import homeRouter from "./home.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use(homeRouter);
router.use(userRouter);

export default router;
