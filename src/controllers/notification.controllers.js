import httpStatus from "http-status";
import { notificationServices } from "../services/index.js";

export async function postNotification(req, res) {
	const notification = { ...req.body, fromUserId: req.userId };
	await notificationServices.create(notification);
	return res.sendStatus(httpStatus.CREATED);
}

export async function getNotificationsForUser(req, res) {
	const notifications = await notificationServices.getByRecipient(req.userId);

	return res.status(httpStatus.OK).send(notifications);
}

export async function deleteNotification(req, res) {
	await notificationServices.recipientDismiss({
		userId: req.userId,
		id: Number(req.params.id),
	});
	return res.sendStatus(httpStatus.OK);
}
