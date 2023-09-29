import {
	conflictError,
	invalidCredentials,
	notFound,
} from "../errors/index.js";
import {
	sessionsRepositories,
	userRepositories,
} from "../repositories/index.js";
import jwt from "jsonwebtoken";

async function create(user) {
	const findDuplicate = await userRepositories.findByEmail(user.email);

	if (findDuplicate.rows[0]) throw conflictError("Email");

	const passwordHash = bcrypt.hashSync(user.password, 10);

	await userRepositories.insert({ ...user, password: passwordHash });
}

async function login(user) {
	const accountQuery = await userRepositories.findByEmail(user.email);
	const account = accountQuery.rows[0];

	if (!account) throw invalidCredentials();
	const isPasswordValid = bcrypt.compareSync(user.password, account.password);

	if (isPasswordValid) {
		delete account.password;

		const token = jwt.sign({ userId: account.id }, process.env.JWT_SECRET);

		const loginData = {
			userId: account.id,
			token,
		};
		await sessionsRepositories.insert(loginData);
		return { user: account, token };
	}
}

async function logout(token) {
	await sessionsRepositories.remove(token);
}

async function findByIdOrThrow(userId) {
	const userQuery = await userRepositories.findById(userId);
	const user = userQuery.rows[0];
	if (!user) throw notFound("User");
	return user;
}

export const userServices = { create, login, logout, findByIdOrThrow };
