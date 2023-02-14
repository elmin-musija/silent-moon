import { connectToDatabase } from "@/src/models/mongoose-setup";
import Yoga from "@/src/models/YogaModel";

const listAllYogaExercises = async () => {
	await connectToDatabase();
	const result = await Yoga.find();
	const yoga = result.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		level: element.level,
		description: element.description,
		typeCategory: element.typeCategory,
		lengthCategory: element.lengthCategory,
		lengthValue: {
			minutes: element.lengthValue.minutes,
			seconds: element.lengthValue.seconds,
		},
		videoUrl: element.videoUrl,
		imageUrl: element.imageUrl,
	}));

	return yoga;
};

module.exports = { listAllYogaExercises };
