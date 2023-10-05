import jwt from "jsonwebtoken";
import { unauthorizedError } from "../errors/index.js";
import { sessionsRepositories } from "../repositories/index.js";

export async function authenticateToken(req, res, next) {
	const authHeader = req.header("Authorization");
	if (!authHeader) throw unauthorizedError();

	const token = authHeader.split(" ")[1];
	if (!token) throw unauthorizedError();
	
	const { userId } = jwt.verify(token, process.env.JWT_SECRET);

	const session = await sessionsRepositories.read(token);
	if (!session.rows[0]) throw unauthorizedError("Couldn't find session");

	req.userId = userId;
	next();
}
