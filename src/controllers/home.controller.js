import { db } from "../database/database.connection.js";

export async function getMiausList(req, res) {
	try {
		const miausList = await db.query(
			`SELECT owners.name AS ownerName, owners.number, owners.id AS ownerId, cats.name AS catName, cats.description, cats.url, cats.id AS catid, cats.available
		     FROM catsOwnerId
		   	JOIN cats ON catsOwnerId.catId = cats.id
		    JOIN owners ON catsOwnerId.ownerId = owners.id
			WHERE available = true`
		);

		return res.send(miausList.rows);
	} catch (err) {
		console.log(err);
	}
}

export async function getMiauTags(req, res) {
	const { id } = req.params;

	try {
		const tags = await db.query(
			`SELECT tags.tag FROM catTags JOIN tags ON catTags.tagId = tags.id WHERE catTags.catId = $1;`,
			[id]
		);
		res.send(tags.rows);
	} catch (err) {
		console.log(err);
	}
}

export async function getMiauByOwner(req, res) {
	const { id } = req.params;

	try {
		const miausList = await db.query(
			`SELECT cats.*
		     FROM catsOwnerId
		   	JOIN cats ON catsOwnerId.catId = cats.id
		    JOIN owners ON catsOwnerId.ownerId = $1;`,
			[id]
		);

		return res.send(miausList.rows);
	} catch (err) {
		console.log(err);
	}
}

export async function editMiau(req, res) {
	const { id } = req.params;

	try {
		await db.query(`UPDATE cats SET available = $1 WHERE cats.id = $2;`, [
			req.body.available,
			id,
		]);

		return res.sendStatus(200);
	} catch (err) {
		console.log(err);
	}
}

export async function postMiau(req, res) {
	const { ownerId, name, url, description } = req.body;

	try {
		//Resquicios de sistema de tag
		// const catTagsArray = tags.split(",").map(function (item) {
		// 	return item.trim();
		// });
		
		const insertMiau = await db.query(
			`INSERT INTO cats (name, url, description) VALUES ($1, $2, $3) RETURNING id;`,
			[name, url, description]
		);
		const insertedMiauId = insertMiau.rows[0].id;
		console.log(insertedMiauId);

		await db.query(
			`INSERT INTO catsOwnerId (ownerId, catId) VALUES ($1, $2);`,
			[ownerId, insertedMiauId]
		);

		return res.sendStatus(201);
	} catch (err) {
		console.log(err);
	}
}

export async function exit(req, res) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace("Bearer ", "");

	try {
		await db.query(`DELETE FROM ownersSession WHERE token = $1;`, [token]);

		return res.sendStatus(200);
	} catch (err) {
		console.log(err);
	}
}
