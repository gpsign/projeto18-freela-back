export function conflictError(data) {
	return {
		type: "CONFLICT",
		message: `${data} already in use`,
	};
}
