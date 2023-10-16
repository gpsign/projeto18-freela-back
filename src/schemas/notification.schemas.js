import Joi from "joi";

export const notificationSchema = Joi.object({
	toUserId: Joi.number().integer().min(1).required(),
	catId: Joi.number().integer().min(1).required(),
	type: Joi.string().required(),
});
