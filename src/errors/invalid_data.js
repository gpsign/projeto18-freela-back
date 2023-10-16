export function invalidDataError(data) {
	return {
		name: "InvalidDataError",
		message: data,
	};
}
