// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { YogaController } from "@/src/controllers/index";

export default async function handler(req, res) {
	if (req.method === "POST") {
		await YogaController.postInsertYogaExercise(req, res);
		return;
	}
	res.status(400).json({ status: "Bad Request!" });
}
