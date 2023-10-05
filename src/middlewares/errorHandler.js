import httpStatus from "http-status";

export function handleErrors(err, _req, res, next) {
	switch (err.name) {
		case "Conflict":
			return res.status(httpStatus.CONFLICT).send(err.message);

		case "InvalidCredentials":
			return res.status(httpStatus.UNAUTHORIZED).send(err.message);

		case "NotFound":
			return res.status(httpStatus.NOT_FOUND).send(err.message);

		case "InvalidData":
			return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);

		case "Unauthorized":
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
