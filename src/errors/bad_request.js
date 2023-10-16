export function badRequestError(data) {
	return {
		name: "BadRequestError",
		message: data,
	};
}
