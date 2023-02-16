import { connectToDatabase } from "@/src/models/mongoose-setup";
import User from "@/src/models/UserModel";

const listSingleFavoriteYogaExercise = async ({ email, yogaId }) => {
	await connectToDatabase();
	const result = await User.find({ email: email }).populate("yoga").exec();
	if (result.length !== 0) {
		/** user does exist */
		const { yoga } = result[0];

		const favoriteYogaExercise = yoga.filter(
			(element) => element._id.toString() === yogaId
		);

		if (favoriteYogaExercise.length !== 0) {
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
	listSingleFavoriteYogaExercise,
};
