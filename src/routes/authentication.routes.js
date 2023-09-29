import { Router } from "express";
import { signIn, signUp } from "../controllers/index.js";
import { signinSchema, signupSchema } from "../schemas/index.js";
import { validateBody } from "../middlewares/index.js";

const authenticationRouter = Router();

authenticationRouter
	.post("/sign-in", validateBody(signinSchema), signIn)
	.post("/sign-up", validateBody(signupSchema), signUp);

export { authenticationRouter };
