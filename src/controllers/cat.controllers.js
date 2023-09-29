import httpStatus from "http-status";
import { catServices } from "../services/index.js";

export async function postCat(req, res) {
	const cat = { ...req.body, userId: req.userId };
	await catServices.create(cat);
	return res.sendStatus(httpStatus.CREATED);
}

export async function getAllCats(req, res) {
	const catsList = await catServices.findAll();
	return res.status(httpStatus.OK).send(catsList);
}

export async function getAllCatsFromUser(req, res) {
	const { userId } = req.params;

	const catsList = await catServices.findAllFromUser(userId);
	return res.status(httpStatus.OK).send(catsList);
}

export async function updateCat(req, res) {
	const { catId } = req.params;
	await catServices.update(catId);
	return res.sendStatus(httpStatus.OK);
}
