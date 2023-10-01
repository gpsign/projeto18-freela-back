import httpStatus from "http-status";
import { catServices } from "../services/index.js";

export async function postCat(req, res) {
	const cat = { ...req.body, userId: req.userId };
	await catServices.insertCat(cat);
	return res.sendStatus(httpStatus.CREATED);
}

export async function getAllCats(req, res) {
	const { tags, name } = req.query;
	let catsList;

	if (name != undefined) {
		catsList = await catServices.findAllByName(name);
	} else if (tags != undefined) {
		catsList = await catServices.findAllByTags(tags);
	} else catsList = await catServices.findAll();

	return res.status(httpStatus.OK).send(catsList);
}

export async function getAllCatsFromUser(req, res) {
	const { userId } = req;
	const catsList = await catServices.findAllFromUser(userId);
	return res.status(httpStatus.OK).send(catsList);
}

export async function updateAvailableCat(req, res) {
	const cat = {...req.body, id: req.params.catId }
	await catServices.updateAvailableCat(cat);
	return res.sendStatus(httpStatus.OK);
}
