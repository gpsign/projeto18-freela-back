export function notFound(data) {
	return {
		name: "NotFoundError",
		message: `${data} not found`,
	};
}
