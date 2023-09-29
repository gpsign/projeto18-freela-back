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

async function findAllByTags(tags) {
	const tagsArray = tags.split(", ").map((tag) => {
		return tag.trim();
	});

	const catsList = await catRepositores.findManyLikeTag(tagsArray);
	return catsList.rows;
}

async function findAllByName(name) {
	const catsList = await catRepositores.findManyLikeName(name);
	return catsList.rows;
}

async function findAllFromUser(id) {
	await userServices.findByIdOrThrow(id);

	const list = await catRepositores.findAllByOwnerId(id);
	return list.rows;
}

async function insertCat(cat) {
	const insertedCat = await catRepositores.insert(cat);
	const insertedCatId = insertedCat.rows[0].id;
	const tagsArray = cat.tags.split(",").map((tag) => {
		return tag.trim();
	});

	tagsArray.forEach(async (tag) => {
		const insertedTagId = await tagServices.insertReturningId(tag);
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

async function updateAvailableCat(cat) {
	const findCatQuery = await catRepositores.findById(cat.id);
	const foundCat = findCatQuery.rows[0];

	if (!foundCat) throw notFound("Cat");

	await catRepositores.updateAvailableCat(cat);
}

export const catServices = {
	findAll,
	insertCat,
	updateAvailableCat,
	findAllFromUser,
	findAllByName,
	findAllByTags,
};
