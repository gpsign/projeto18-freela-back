import Joi from "joi";

export const catSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().allow(null, ''),
	url: Joi.string().uri().required(),
	tags: Joi.string().allow(null, ''),
});
