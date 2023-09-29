import Joi from "joi";

export const catSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string(),
	url: Joi.string().uri().required(),
	tags: Joi.string(),
});
