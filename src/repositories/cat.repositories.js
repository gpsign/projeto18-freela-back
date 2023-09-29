import { db } from "../database/database.connection.js";

function insert(cat) {
	return db.query(
		`INSERT INTO cats (name, url, description) VALUES ($1, $2, $3) RETURNING id;`,
		[cat.name, cat.url, cat.description]
	);
}

function findMany() {
	return db.query(
		`
        SELECT 
            c.name AS "catName", 
            c.description, 
            c.url, 
            c.id AS "catId", 
            c.available,  
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'CPF', u.cpf, 'userId', u.id) AS "owner",
            ARRAY_AGG(t.name) AS "tags"
        FROM "usersCats" uc
        JOIN cats c ON uc."catId" = c.id
        JOIN users u ON uc."userId" = u.id
        LEFT JOIN "catsTags" ct ON ct."catId" = c.id
        LEFT JOIN tags t ON ct."tagId" = t.id
        WHERE available = true
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        `
	);
}

function findAllByOwnerId(id) {
	return db.query(
		`
        SELECT 
            c.name AS "catName", 
            c.description, 
            c.url, 
            c.id AS "catId", 
            c.available,  
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'CPF', u.cpf, 'userId', u.id) AS "owner",
            ARRAY_AGG(t.name) AS "tags"
        FROM "usersCats" uc
        JOIN cats c ON uc."catId" = c.id
        JOIN users u ON uc."userId" = u.id
        LEFT JOIN "catsTags" ct ON ct."catId" = c.id
        LEFT JOIN tags t ON ct."tagId" = t.id
        WHERE u.id = $1
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        `,
		[id]
	);
}

function findById(id) {
	return db.query(`SELECT * FROM cats WHERE id = $1;`, [id]);
}

function updateAvailable(cat) {
	return db.query(`UPDATE cats SET available = $1 WHERE cats.id = $2;`, [
		cat.available,
		cat.id,
	]);
}

export const catRepositores = {
	insert,
	findMany,
	updateAvailable,
	findById,
	findAllByOwnerId,
};
