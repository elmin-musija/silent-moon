import { connectToDatabase } from "@/src/models/mongoose-setup";
import User from "@/src/models/UserModel";

const listSingleMeditationCourseFavorite = async ({
	email,
	meditationCourseId,
}) => {
	await connectToDatabase();
	const result = await User.findOne({ email: email })
		.populate("meditation")
		.exec();

	if (result) {
		/** user does exist */
		const { meditation } = result;

		const favoriteMeditationCourse = meditation.filter(
			(element) => element._id.toString() === meditationCourseId
		);

		if (favoriteMeditationCourse.length !== 0) {
			/** yoga is in user favorites */
			return true;
		} else {
			/** yoga is not in user favorites */
			return false;
		}
	} else {
		/** user does not exist */
		return false;
	}
};

module.exports = {
	listSingleMeditationCourseFavorite,
};
