export function unauthorizedError() {
	return { type: "UNAUTHORIZED", message: "Session expired" };
}
