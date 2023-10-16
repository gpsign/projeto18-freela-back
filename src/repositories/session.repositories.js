import { db } from "../database/database.connection.js";

function insert(user) {
	return db.query(`INSERT INTO sessions ("user_id", token) VALUES ($1, $2)`, [
		user.id,
		user.token,
	]);
}

function findByToken(token) {
	return db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);
}

function findByUserId(id) {
	return db.query(`SELECT * FROM sessions WHERE "user_id" = $1;`, [id]);
}

function remove(token) {
	return db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}

export const sessionsRepositories = { insert, findByToken, remove, findByUserId };
