import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function login(req, res) {
	const { email, password } = req.body;

	if (!email) return res.status(422);
	else {
		try {
			const owner = await db.query(`SELECT * FROM owners WHERE email = $1;`, [
				email,
			]);
			if (!owner.rows[0]) return res.sendStatus(404);

			if (bcrypt.compareSync(password, owner.rows[0].password)) {
				delete owner.rows[0].password;

				const token = uuid();
				await db.query(
					`INSERT INTO ownersSession (ownerId, token) VALUES ($1, $2)`,
					[owner.rows[0].id, token]
				);

				return res.status(200).send({ token: token, id: owner.rows[0].id });
			} else {
				return res.sendStatus(401);
			}
		} catch (err) {
			res.status(500).send(err);
		}
	}
}

export async function signup(req, res) {
	const { name, number, cpf, email, password } = req.body;

	// const validation = registerSchema.validate(req.body);
	// if (validation.error) {
	// 	const errors = validation.error.details.map((details) => details.message);
	// 	console.log(errors);
	// 	return res.status(422).send(errors);
	// }

	try {
		const newOwnerValidation = await db.query(
			`SELECT * FROM owners WHERE email = $1;`,
			[email]
		);
		if (newOwnerValidation.rows[0]) return res.sendStatus(409);

		const passwordHash = bcrypt.hashSync(password, 10);

		await db.query(
			`INSERT INTO owners (name, number, cpf, email, password) VALUES ($1, $2, $3, $4, $5)`,
			[name, number, cpf, email, passwordHash]
		);

		res.sendStatus(201);
	} catch (err) {
		res.status(500).send(err);
	}
}
