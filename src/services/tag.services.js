import { tagRepositories } from "../repositories/index.js";

async function insertReturningId(name) {
	const findDuplicate = await tagRepositories.findByName(name);
	if (findDuplicate.rows[0]) return findDuplicate.rows[0].id;
	const insertedTag = await tagRepositories.insert(name.toUpperCase());
	return insertedTag.rows[0].id;
}

async function popularTags() {
	const result = await tagRepositories.findPopularTags();
	return result.rows;
}

export const tagServices = { insertReturningId, popularTags };
