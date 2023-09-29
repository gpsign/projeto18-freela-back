import joi from "joi";

export const signupSchema = joi.object({
	name: joi.string().required(),
	number: joi.string().required(),
	cpf: joi.string().required(),
	email: joi.string().email().required(),
	password: joi.string().required(),
});
