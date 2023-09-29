export function invalidDataError(data) {
	return {
		type: "INVALID DATA",
		message: data,
	};
}
