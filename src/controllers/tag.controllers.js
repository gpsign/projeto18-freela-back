import { tagServices } from "../services/index.js";
import httpStatus from "http-status";

export async function getPopularTags(req, res) {
	const data = await tagServices.popularTags();
	return res.status(httpStatus.OK).send(data);
}
