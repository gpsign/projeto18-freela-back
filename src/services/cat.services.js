import { notFound } from "../errors/not_found.js";
import {
	catRepositores,
	catsTagsRepositories,
	usersCatsRepositories,
} from "../repositories/index.js";
import { tagServices, userServices } from "./index.js";

async function findAll() {
	const catsList = await catRepositores.findMany();
	return catsList.rows;
}

async function findAllFromUser(id) {
	await userServices.findByIdOrThrow(id);

	const list = await catRepositores.findAllByOwnerId(id);
	return list.rows;
}

async function create(cat) {
	const insertedCat = await catRepositores.insert(cat);
	const insertedCatId = insertedCat.rows[0].id;
	const tagsArray = cat.tags.split(",").map((tag) => {
		return tag.trim();
	});

	console.log();
	console.log(tagsArray);

	tagsArray.forEach(async (tag) => {
		const insertedTagId = await tagServices.insert(tag);
		await catsTagsRepositories.insert({
			catId: insertedCatId,
			tagId: insertedTagId,
		});
	});

	await usersCatsRepositories.insert({
		userId: cat.userId,
		catId: insertedCatId,
	});
}

async function update(cat) {
	const findCatQuery = await catRepositores.findById(cat.id);
	const foundCat = findCatQuery.rows[0];

	if (!foundCat) throw notFound("Cat");

	await catRepositores.update(cat);
}

export const catServices = { findAll, create, update, findAllFromUser };
