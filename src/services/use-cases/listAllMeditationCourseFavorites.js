import { connectToDatabase } from "@/src/models/mongoose-setup";
import User from "@/src/models/UserModel";

const listAllMeditationCourseFavorites = async ({ email }) => {
	await connectToDatabase();
	const result = await User.findOne({ email: email })
		.populate("meditation")
		.exec();

	if (result) {
		/** user does exist */
		const { meditation } = result;

		const allMeditationsCourseFavorites = meditation.map((element) => ({
			_id: element._id.toString(),
			title: element.title,
			description: element.description,
			imageUrl: element.imageUrl,
			category: element.category,
		}));

		return allMeditationsCourseFavorites;
	} else {
		/** user does not exist */
		return [];
	}
};

module.exports = {
	listAllMeditationCourseFavorites,
};
