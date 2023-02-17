import { connectToDatabase } from "@/src/models/mongoose-setup";
import Meditation from "@/src/models/MeditationModel";

const listSingleMeditationById = async ({ meditationId }) => {
	await connectToDatabase();
	const meditation = await Meditation.findById({
		_id: meditationId,
	});

	const meditationById = {
		_id: meditation._id.toString(),
		title: meditation.title,
		description: meditation.description,
		imageUrl: meditation.imageUrl,
		level: meditation.level,
		videoUrl: meditation.videoUrl,
	};

	return meditationById;
};

module.exports = { listSingleMeditationById };
