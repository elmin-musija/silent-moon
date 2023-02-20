import { connectToDatabase } from "@/src/models/mongoose-setup";
import Yoga from "@/src/models/YogaModel";

const listSingleYogaExercise = async (paramYogaId) => {
	await connectToDatabase();
	const result = await Yoga.findOne({ _id: paramYogaId }).exec();
	const singleYogaExercise = {
		_id: result._id.toString(),
		title: result.title,
		description: result.description,
		imageUrl: result.imageUrl,
		category: result.category,
		level: result.level,
		duration: {
			minutes: result.duration.minutes,
			seconds: result.duration.seconds,
		},
		videoUrl: result.videoUrl,
	};
	return singleYogaExercise;
};

module.exports = { listSingleYogaExercise };
