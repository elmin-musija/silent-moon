import { connectToDatabase } from "@/src/models/mongoose-setup";
import User from "@/src/models/UserModel";

const listAllYogaFavoriteExercises = async ({ email }) => {
	await connectToDatabase();
	const userExists = await User.findOne({ email: email })
		.populate("yoga")
		.exec();

	if (userExists) {
		/** user does exist */
		const allFavoriteYogaExercises = userExists.yoga.map((element) => ({
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
	} else {
		/** user does not exist */
		return [];
	}
};

module.exports = {
	listAllYogaFavoriteExercises,
};
