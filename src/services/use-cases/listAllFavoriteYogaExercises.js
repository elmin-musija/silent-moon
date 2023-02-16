import { connectToDatabase } from "@/src/models/mongoose-setup";
import User from "@/src/models/UserModel";

const listAllFavoriteYogaExercises = async ({ email }) => {
	await connectToDatabase();
	const [result] = await User.find({ email: email }).populate("yoga").exec();
	const { yoga } = result;

	const allFavoriteYogaExercises = yoga.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		description: element.description,
		imageUrl: element.imageUrl,
		category: element.category,
		level: element.level,
		duration: {
			minutes: element.duration.minutes,
			seconds: element.duration.seconds,
		},
		videoUrl: element.videoUrl,
	}));
	return allFavoriteYogaExercises;
};

module.exports = {
	listAllFavoriteYogaExercises,
};
