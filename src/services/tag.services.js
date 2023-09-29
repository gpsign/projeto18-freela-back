import { tagRepositories } from "../repositories/index.js";

async function insertTag(name) {
	const findDuplicate = await tagRepositories.findByName(name);
	if (findDuplicate.rows[0]) return findDuplicate.rows[0].id;
	const insertedTag = await tagRepositories.insert(name);
	return insertedTag;
}

export const tagServices = { insertTag };
