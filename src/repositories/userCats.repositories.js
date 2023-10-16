import { db } from "../database/database.connection.js";

function insert(relation) {
	return db.query(
		`INSERT INTO "usersCats" ("user_id", "cat_id") VALUES ($1, $2);`,
		[relation.userId, relation.catId]
	);
}

function removeAllCatTagsByCatId(id) {
	return db.query(`DELETE FROM "cat_tags" ct WHERE ct."cat_id" = $1;`, [id]);
}

export const userCatsRepositories = { insert, removeAllCatTagsByCatId };
