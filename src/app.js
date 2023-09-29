import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import cors from "cors";
import { catsRouter, authenticationRouter } from "./routes/index.routes.js";
import { handleErrors } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
app
	.use(express.json())
	.use(cors())
	.get("/health", (_req, res) => res.send("OK!"))
	.use("/cats", catsRouter)
	.use("/", authenticationRouter)
	.use(handleErrors);

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
