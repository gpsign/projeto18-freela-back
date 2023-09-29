import httpStatus from "http-status";

export function handleErrors(err, _req, res, next) {
	switch (err.type) {
		case "CONFLICT":
			return res.status(httpStatus.CONFLICT).send({
				message: err.message,
			});

		case "INVALID CREDENTIALS":
			return res.status(httpStatus.UNAUTHORIZED).send({
				message: err.message,
			});

		case "NOT FOUND":
			return res.status(httpStatus.NOT_FOUND).send({ message: err.message });

		default:
			console.error(err);
			return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
				error: "InternalServerError",
				message: "Internal Server Error",
			});
	}
}
