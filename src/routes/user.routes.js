import { Router } from "express";
import { login, signup } from "../controllers/user.controller.js";
import { validateSignUp } from "../middlewares/validateSignUp.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const userRouter = Router();

userRouter.post("/signup", validateSignUp, signup);
userRouter.post("/login", validateLogin, login);

export default userRouter;
