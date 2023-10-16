import { badRequestError } from "../errors/index.js";

export function validateBody(schema) {
	return validate(schema, "body");
}

export function validateParams(schema) {
	return validate(schema, "params");
}

function validate(schema, type) {
	return (req, res, next) => {
		const { error } = schema.validate(req[type], {
			abortEarly: false,
		});

		if (!error) {
			next();
		} else {
			let errorMessage = "";
			error.details.forEach((d) => (errorMessage += d.message + ". "));
			throw badRequestError(errorMessage);
		}
	};
}
