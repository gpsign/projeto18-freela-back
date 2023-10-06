import { db } from "../database/database.connection.js";

function insert(tag) {
	return db.query(
		`
	INSERT INTO tags (name) VALUES ($1) RETURNING id;`,
		[tag]
	);
}

function findByName(tag) {
	return db.query(`SELECT id FROM tags WHERE name = $1;`, [tag]);
}

function findById(id) {
	return db.query(`SELECT name FROM tags WHERE id = $1;`, [id]);
}

function findPopularTags() {
	return db.query(`
		SELECT t.name as tag, COUNT(t.name) AS "popularity"
		FROM "catsTags" ct 
		INNER JOIN tags t 
		ON ct."tagId" = t.id
		GROUP BY t.name
		ORDER BY popularity DESC
		LIMIT 14;
	`);
}

export const tagRepositories = {
	insert,
	findById,
	findByName,
	findPopularTags,
};
