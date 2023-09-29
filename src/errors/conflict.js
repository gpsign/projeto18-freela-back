export function conflictError(data) {
	return {
		name: "Conflict",
		message: `${data} already in use`,
	};
}
