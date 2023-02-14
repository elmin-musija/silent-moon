import { connectToDatabase } from "@/src/models/mongoose-setup";
import Yoga from "@/src/models/YogaModel";

const listSingleYogaExercise = async (paramYogaId) => {
	await connectToDatabase();
	const result = await Yoga.findOne({ _id: paramYogaId });
	const singleYogaExercise = {
		_id: result._id.toString(),
		title: result.title,
		level: result.level,
		description: result.description,
		typeCategory: result.typeCategory,
		lengthCategory: result.lengthCategory,
		lengthValue: {
			minutes: result.lengthValue.minutes,
			seconds: result.lengthValue.seconds,
		},
		videoUrl: result.videoUrl,
		imageUrl: result.imageUrl,
	};
	return singleYogaExercise;
};

module.exports = { listSingleYogaExercise };
