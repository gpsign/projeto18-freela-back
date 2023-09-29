import { db } from "../database/database.connection.js";

function insert(relation) {
	return db.query(
		`INSERT INTO "usersCats" ("userId", "catId") VALUES ($1, $2);`,
		[relation.userId, relation.catId]
	);
}

function removeAllCatTagsByCatId(id) {
	return db.query(`DELETE FROM "catsTags" ct WHERE ct."catId" = $1;`, [id]);
}

export const usersCatsRepositories = { insert, removeAllCatTagsByCatId };
