export function notFound(data) {
	return {
		type: "NOT FOUND",
		message: `${data} not found`,
	};
}
