import { connectToDatabase } from "@/src/models/mongoose-setup";
import Meditation from "@/src/models/MeditationModel";

const listAllMeditations = async () => {
	await connectToDatabase();
	const allMeditations = await Meditation.find({});

	const meditationsById = allMeditations.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		description: element.description,
		imageUrl: element.imageUrl,
		level: element.level,
		duration: {
			minutes: element.duration.minutes,
			seconds: element.duration.seconds,
		},
		videoUrl: element.videoUrl,
	}));

	return meditationsById;
};

module.exports = { listAllMeditations };
