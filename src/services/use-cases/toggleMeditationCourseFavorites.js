import User from "@/src/models/UserModel";
import { getFirstnameLastname } from "@/src/services/utils/name/name";

const toggleMeditationCourseFavorites = async ({
	name,
	email,
	meditationCourseId,
}) => {
	const userExists = await User.findOne({ email: email }).exec();

	if (userExists) {
		/** User exists */

		/** check if given id is already in user favorites */
		const isFavorite = userExists.meditation.find(
			(element) => element.toString() === meditationCourseId
		);

		if (!isFavorite) {
			/** add yoga exercise to user favorites */
			userExists.meditation.push(meditationCourseId);
			userExists.save();
			return true;
		} else {
			/** remove yoga exercise from user favorites */
			const filteredMeditationCourses = userExists.meditation.filter(
				(element) => element.toString() !== meditationCourseId
			);
			userExists.meditation = filteredMeditationCourses;
			userExists.save();
			return false;
		}
	} else {
		/** user does not exist */

		const { firstname, lastname } = getFirstnameLastname(name);

		await User.create({
			name: {
				firstname: firstname || " ",
				lastname: lastname || " ",
			},
			email: email,
			meditation: [meditationCourseId],
		});
		return true;
	}
};

module.exports = { toggleMeditationCourseFavorites };
