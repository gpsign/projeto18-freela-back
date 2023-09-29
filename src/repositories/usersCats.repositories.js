import { db } from "../database/database.connection.js";

function insert(relation) {
	return db.query(`INSERT INTO usersCats (userId, catId) VALUES ($1, $2);`, [
		relation.ownerId,
		relation.catId,
	]);
}

function readByUserId(id) {
	return db.query(
		`SELECT cats.* FROM usersCats JOIN cats ON cats.id = usersCats.catId WHERE usersCats.userId = $1;`,
		[id]
	);
}

export const usersCatsRepositories = { insert };
