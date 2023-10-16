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
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'email', u.email, 'userId', u.id, 'url', u.url) AS "owner",
            ARRAY_REMOVE(ARRAY_AGG(t.name), null) AS "tags"
        FROM "user_cats" uc
        JOIN cats c ON uc."cat_id" = c.id
        JOIN users u ON uc."user_id" = u.id
        LEFT JOIN "cat_tags" ct ON ct."cat_id" = c.id
        LEFT JOIN tags t ON ct."tag_id" = t.id
        WHERE available = true
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        `
	);
}

function findManyLikeTag(tag) {
	let tagsQuery = "";
	tag.forEach((tag, index) => {
		if (tagsQuery != "") tagsQuery += " AND";
		tagsQuery += ` bool_or(t.name ILIKE $${index + 1})`;
	});
	const queryInput = tag.map((tag) => tag + "%");
	return db.query(
		`
        SELECT 
            c.name AS "catName", 
            c.description, 
            c.url, 
            c.id AS "catId", 
            c.available,  
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'email', u.email, 'userId', u.id, 'url', u.url) AS "owner",
            ARRAY_REMOVE(ARRAY_AGG(t.name), null) AS "tags"
        FROM "user_cats" uc
        JOIN cats c ON uc."cat_id" = c.id
        JOIN users u ON uc."user_id" = u.id
        LEFT JOIN "cat_tags" ct ON ct."cat_id" = c.id
        LEFT JOIN tags t ON ct."tag_id" = t.id
        WHERE available = true
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        HAVING ${tagsQuery};
        `,
		queryInput
	);
}

function findManyLikeName(name) {
	return db.query(
		`
        SELECT 
            c.name AS "catName", 
            c.description, 
            c.url, 
            c.id AS "catId", 
            c.available,  
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'email', u.email, 'userId', u.id, 'url', u.url) AS "owner",
            ARRAY_REMOVE(ARRAY_AGG(t.name), null) AS "tags"
        FROM "user_cats" uc
        JOIN cats c ON uc."cat_id" = c.id
        JOIN users u ON uc."user_id" = u.id
        LEFT JOIN "cat_tags" ct ON ct."cat_id" = c.id
        LEFT JOIN tags t ON ct."tag_id" = t.id
        WHERE available = true
        AND c.name ILIKE $1
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        `,
		["%" + name + "%"]
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
            JSON_BUILD_OBJECT('username', u.name, 'phone', u.phone, 'email', u.email, 'userId', u.id, 'url', u.url) AS "owner",
            ARRAY_REMOVE(ARRAY_AGG(t.name), null) AS "tags"
        FROM "user_cats" uc
        JOIN cats c ON uc."cat_id" = c.id
        JOIN users u ON uc."user_id" = u.id
        LEFT JOIN "cat_tags" ct ON ct."cat_id" = c.id
        LEFT JOIN tags t ON ct."tag_id" = t.id
        WHERE u.id = $1
        GROUP BY u.name, u.phone, u.cpf, u.id, c.id
        `,
		[id]
	);
}

function findById(id) {
	return db.query(`SELECT * FROM cats WHERE id = $1;`, [id]);
}

function updateAvailableCat(cat) {
	console.log(cat);
	return db.query(`UPDATE cats SET available = $1 WHERE cats.id = $2;`, [
		cat.available,
		cat.id,
	]);
}

export const catRepositores = {
	insert,
	findMany,
	updateAvailableCat,
	findById,
	findAllByOwnerId,
	findManyLikeTag,
	findManyLikeName,
};
