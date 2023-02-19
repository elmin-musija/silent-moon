import { UserController } from "@/src/controllers/index";

export default async function handler(req, res) {
	if (req.method === "POST") {
		await UserController.postListAllMeditationCourseFavorites(req, res);
		return;
	}
}
