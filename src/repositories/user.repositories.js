import { db } from "../database/database.connection.js";

function insert(user) {
	return db.query(
		`INSERT INTO users (name, phone, cpf, email, password) VALUES ($1, $2, $3, $4, $5)`,
		[user.name, user.number, user.cpf, user.email, user.password]
	);
}

function findById(id) {
	return db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
}

function findByEmail(email) {
	return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export const userRepositories = { insert, findByEmail, findById };
