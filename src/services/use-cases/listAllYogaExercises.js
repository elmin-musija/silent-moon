import { connectToDatabase } from "@/src/models/mongoose-setup";
import Yoga from "@/src/models/YogaModel";

const listAllYogaExercises = async () => {
	await connectToDatabase();
	const result = await Yoga.find();
	const yoga = result.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		imageUrl: element.imageUrl,
		category: element.category,
		description: element.description,
		level: element.level,
		duration: {
			minutes: element.duration.minutes,
			seconds: element.duration.seconds,
		},
		videoUrl: element.videoUrl,
	}));

	return yoga;
};

module.exports = { listAllYogaExercises };
