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

export const tagRepositories = { insert, findById, findByName };
