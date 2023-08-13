import { Router } from "express";
import ufcRouter from "./ufc.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use(ufcRouter);
router.use(userRouter);

export default router;
