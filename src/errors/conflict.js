export function conflictError(data) {
	return {
		name: "ConflictError",
		message: `${data} already in use`,
	};
}
