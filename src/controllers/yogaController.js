import { connectToDatabase } from "@/src/models/mongoose-setup";
import { YogaService } from "@/src/services/use-cases/";

const postInsertYogaExercise = async (req, res) => {
	await connectToDatabase();
	const yogaInfos = {
		title: req.body.title,
		level: req.body.level,
		description: req.body.description,
		typeCategory: req.body.typeCategory,
		lengthCategory: req.body.lengthCategory,
		lengthValue: {
			minutes: Number(req.body.lengthValue.minutes),
			seconds: Number(req.body.lengthValue.seconds),
		},
		videoUrl: req.body.videoUrl,
		imageUrl: req.body.imageUrl,
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
