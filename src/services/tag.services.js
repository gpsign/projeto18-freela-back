import { tagRepositories } from "../repositories/index.js";

async function insertReturningId(name) {
	const findDuplicate = await tagRepositories.findByName(name);
	if (findDuplicate.rows[0]) return findDuplicate.rows[0].id;
	const insertedTag = await tagRepositories.insert(name);
	return insertedTag.rows[0].id;
}

export const tagServices = { insertReturningId };
