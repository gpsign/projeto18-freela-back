export function unprocessableEntityError(data) {
	return {
		name: "UnprocessableEntityError",
		message: data,
	};
}
