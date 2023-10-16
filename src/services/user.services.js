import {
	conflictError,
	invalidCredentialsError,
	notFoundError,
} from "../errors/index.js";
import {
	sessionsRepositories,
	userRepositories,
} from "../repositories/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function create(user) {
	const findDuplicate = await userRepositories.findByEmail(user.email);

	if (findDuplicate.rows[0]) throw conflictError("Email");

	const passwordHash = bcrypt.hashSync(user.password, 10);

	await userRepositories.insert({ ...user, password: passwordHash });
}

async function login(user) {
	const accountQuery = await userRepositories.findByEmail(user.email);
	const account = accountQuery.rows[0];

	if (!account) throw invalidCredentialsError();
	const isPasswordValid = bcrypt.compareSync(user.password, account.password);

	if (isPasswordValid) {
		delete account.password;

		const duplicateSessionQuery = await sessionsRepositories.findByUserId(
			account.id
		);
		const duplicateSession = duplicateSessionQuery.rows[0];
		if (duplicateSession)
			await sessionsRepositories.remove(duplicateSession.token);

		const token = jwt.sign({ userId: account.id }, process.env.JWT_SECRET, {
			expiresIn: 60 * 60 * 24,
		});

		const loginData = {
			id: account.id,
			token,
		};
		await sessionsRepositories.insert(loginData);
		return { user: account, token };
	} else throw invalidCredentialsError();
}

async function logout(token) {
	await sessionsRepositories.remove(token);
}

async function findByIdOrThrow(userId) {
	const userQuery = await userRepositories.findById(userId);
	const user = userQuery.rows[0];
	if (!user) throw notFoundError("User");
	return user;
}

export const userServices = { create, login, logout, findByIdOrThrow };
