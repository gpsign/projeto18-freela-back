import { db } from "../database/database.connection.js";

function insert(relation) {
	return db.query(
		`INSERT INTO "cat_tags" ("tag_id", "cat_id") VALUES ($1, $2);`,
		[relation.tagId, relation.catId]
	);
}

function findByCatId(id) {
	return db.query(
		`SELECT tags.name FROM "cat_tags" INNER JOIN tags ON "cat_tags"."tag_id" = tags.id WHERE "cat_tags"."cat_id" = $1;`,
		[id]
	);
}

function findByTagId(id) {
	return db.query(
		`SELECT cats.* FROM "cat_tags" INNER JOIN cats ON "cat_tags"."cat_id" = cats.id WHERE "cat_tags"."tag_id" = $1;`,
		[id]
	);
}

export const catTagsRepositories = { insert, findByCatId, findByTagId };
