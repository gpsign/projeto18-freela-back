import { db } from "../database/database.connection.js";

export async function validateToken(req, res, next) {
	const authorization = req.headers.authorization;
	const token = authorization?.replace("Bearer ", "");

	if (!token) {
		return res.sendStatus(401);
	}

	let session = await db.query(
		`SELECT * FROM owners
    JOIN ownersSession ON token = $1;`,
		[token]
	);

	if (!session.rows[0]) {
		return res.sendStatus(401);
	} else session = session.rows[0];

	delete session.password;

	res.locals.user = session;

	next();
}
