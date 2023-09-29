import { userServices } from "../services/index.js";
import httpStatus from "http-status";

export async function signIn(req, res) {
	const user = req.body;

	const data = await userServices.login(user);
	return res.status(httpStatus.OK).send(data);
}

export async function signUp(req, res) {
	const user = req.body;

	await userServices.create(user);
	return res.sendStatus(httpStatus.CREATED);
}
