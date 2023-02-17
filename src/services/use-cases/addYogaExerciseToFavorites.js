import User from "@/src/models/UserModel";

const addYogaExerciseToFavorites = async ({ name, email, yogaId }) => {
	const userExists = await User.findOne({ email: email }).exec();

	if (userExists) {
		/** User exists */

		/** check if given id is already in user favorites */
		const isFavorite = userExists.yoga.find(
			(element) => element.toString() === yogaId
		);

		if (!isFavorite) {
			/** add yoga exercise to user favorites */
			userExists.yoga.push(yogaId);
			userExists.save();
			return true;
		} else {
			/** remove yoga exercise from user favorites */
			const filteredYoga = userExists.yoga.filter(
				(element) => element.toString() !== yogaId
			);
			userExists.yoga = filteredYoga;
			userExists.save();
			return false;
		}
	} else {
		/** user does not exist */
		await User.create({
			name: {
				firstname: name.split(" ")[0],
				lastname: name.split(" ")[1],
			},
			email: email,
			yoga: [yogaId],
		});
		return true;
	}
};

module.exports = { addYogaExerciseToFavorites };
