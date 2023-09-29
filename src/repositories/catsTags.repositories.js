import { db } from "../database/database.connection.js";

function insert(relation) {
	return db.query(
		`INSERT INTO "catsTags" ("tagId", "catId") VALUES ($1, $2);`,
		[relation.tagId, relation.catId]
	);
}

function findByCatId(id) {
	return db.query(
		`SELECT tags.name FROM "catsTags" INNER JOIN tags ON "catsTags"."tagId" = tags.id WHERE "catsTags"."catId" = $1;`,
		[id]
	);
}

function findByTagId(id) {
	return db.query(
		`SELECT cats.* FROM "catsTags" INNER JOIN cats ON "catsTags"."catId" = cats.id WHERE "catsTags"."tagId" = $1;`,
		[id]
	);
}

export const catsTagsRepositories = { insert, findByCatId, findByTagId };
