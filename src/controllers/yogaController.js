import { connectToDatabase } from "@/src/models/mongoose-setup";
import { YogaService } from "@/src/services/use-cases/";

const postInsertYogaExercise = async (req, res) => {
	await connectToDatabase();
	const yogaInfos = {
		title: req.body.title,
		description: req.body.description,
		imageUrl: req.body.imageUrl,
		category: req.body.category,
		level: req.body.level,
		duration: {
			minutes: Number(req.body.duration.minutes),
			seconds: Number(req.body.duration.seconds),
		},

		videoUrl: req.body.videoUrl,
	};
	const result = await YogaService.insertYogaExercise(yogaInfos);
	return res.json({
		status: "success",
		data: result,
	});
};

module.exports = {
	postInsertYogaExercise,
};
