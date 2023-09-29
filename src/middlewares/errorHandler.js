import httpStatus from "http-status";

export function handleErrors(err, _req, res, next) {
	switch (err.type) {
		case "CONFLICT":
			return res.status(httpStatus.CONFLICT).send(err.message);

		case "INVALID CREDENTIALS":
			return res.status(httpStatus.UNAUTHORIZED).send(err.message);

		case "NOT FOUND":
			return res.status(httpStatus.NOT_FOUND).send(err.message);

		case "INVALID DATA":
			return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);

		case "UNAUTHORIZED":
			return res.status(httpStatus.UNAUTHORIZED).send(err.message);

		default:
			console.error(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
				error: "InternalServerError",
				message: "Internal Server Error",
			});
	}
}
