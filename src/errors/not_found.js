export function notFoundError(data) {
	return {
		name: "NotFoundError",
		message: `${data} not found`,
	};
}
