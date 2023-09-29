import { db } from "../database/database.connection.js";

function insert(user) {
	return db.query(
		`INSERT INTO ownersSession (ownerId, token) VALUES ($1, $2)`,
		[user.id, user.token]
	);
}

function read(token) {
	return db.query(`SELECT * FROM owners JOIN sessions ON token = $1;`, [token]);
}

function remove(token) {
	return db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}

export const sessionsRepositories = { insert, read, remove };
