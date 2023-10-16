import { notificationRepositories } from "../repositories/index.js";
import {
	badRequestError,
	notFoundError,
	unauthorizedError,
	unprocessableEntityError,
} from "../errors/index.js";
import { userServices } from "./user.services.js";
import { catServices } from "./cat.services.js";

function validateType(type) {
	switch (type) {
		case "REQUEST":
			break;
		case "ACCEPTED":
			break;
		case "REJECTED":
			break;
		default:
			throw unprocessableEntityError("Invalid type");
	}
}

async function create(notification) {
	const { fromUserId, toUserId, catId, type } = notification;
	if (fromUserId === toUserId)
		throw unprocessableEntityError("Sender and Recipient can not be the same");

	validateType(type);

	await userServices.findByIdOrThrow(fromUserId);
	await userServices.findByIdOrThrow(toUserId);
	await catServices.findByIdOrThrow(catId);

	await notificationRepositories.insert(notification);
}

async function getByRecipient(id) {
	const notifications = await notificationRepositories.findByRecipient(id);
	return notifications.rows;
}

async function findByIdOrThrow(id) {
	const notification = await notificationRepositories.findById(id);
	if (!notification.rows[0]) throw notFoundError("Notification");
	return notification.rows[0];
}

async function remove(id) {
	await findByIdOrThrow(id);
	await notificationRepositories.remove(id);
}

async function recipientDismiss({ userId, id }) {
	if (isNaN(id)) throw badRequestError("Invalid ID");

	const notification = await findByIdOrThrow(id);
	if (notification.toUserId != userId)
		throw unauthorizedError("User is not recipient");
	await notificationRepositories.remove(id);
}

export const notificationServices = {
	validateType,
	create,
	getByRecipient,
	findByIdOrThrow,
	remove,
	recipientDismiss,
};
