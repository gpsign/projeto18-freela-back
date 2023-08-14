import { signUpSchema } from "../schemas/signUp.schema.js";

export function validateSignUp(req, res, next) {
	const validation = signUpSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		const errors = validation.error.details.map((detail) => detail.message);
		return res.status(422).send(errors);
	}

	next();
}
