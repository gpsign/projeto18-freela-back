import { notFound } from "../errors/not_found.js";
import {
	catRepositores,
	catsTagsRepositories,
	usersCatsRepositories,
} from "../repositories/index.js";
import { tagServices } from "./index.js";

async function findAll() {
	const catsList = await catRepositores.findMany();
	return catsList.rows;
}

async function findAllFromUser(id) {
	await userServices.findByIdOrThrow(id);

	const list = await catRepositores.findAllFromUser(id);
	return list;
}

async function create(cat) {
	const insertedCat = await catRepositores.insert(cat);
	const tagsArray = cat.tags.split(",").map((tag) => {
		return tag.trim();
	});

	tagsArray.forEach(async (tag) => {
		const insetedTag = await tagServices.insert(tag);
		await catsTagsRepositories.insert({
			catId: insertedCat,
			tagId: insetedTag,
		});
	});

	await usersCatsRepositories.insert({
		ownerId: cat.userId,
		catId: insertedCat,
	});
}

async function update(cat) {
	const findCatQuery = await catRepositores.findById(cat.id);
	const foundCat = findCatQuery.rows[0];

	if (!foundCat) throw notFound("Cat");

	await catRepositores.update(cat);
}

export const catServices = { findAll, create, update, findAllFromUser };
