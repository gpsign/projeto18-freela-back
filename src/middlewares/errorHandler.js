import httpStatus from "http-status";

export function handleErrors(err, _req, res, next) {
	switch (err.name) {
		case "ConflictError":
			return res.status(httpStatus.CONFLICT).send(err.message);

		case "InvalidCredentialsError":
			return res.status(httpStatus.UNAUTHORIZED).send(err.message);

		case "NotFoundError":
			return res.status(httpStatus.NOT_FOUND).send(err.message);

		case "UnprocessableEntityError":
			return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);

		case "BadRequestError":
			return res.status(httpStatus.BAD_REQUEST).send(err.message);

		case "UnauthorizedError":
			return res.status(httpStatus.UNAUTHORIZED).send(err.message);

		case "TokenExpiredError":
			return res.status(httpStatus.UNAUTHORIZED).send("Session expired");

		case "JsonWebTokenError":
			return res.status(httpStatus.UNAUTHORIZED).send("Bad token");

		default:
			console.error(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
				error: "InternalServerError",
				message: "Internal Server Error",
			});
	}
}
