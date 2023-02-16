import User from "@/src/models/UserModel";

const addYogaExerciseToFavorites = async ({ name, email, yogaId }) => {
	const userExists = await User.find({ email: email }).exec();

	if (userExists.length !== 0) {
		/** User exists */
		const [yogaObjectId] = userExists.map((user) => user.yoga);

		const yoga = yogaObjectId.filter(
			(objectId) => objectId.toString() === yogaId
		);

		if (yoga.length !== 1) {
			/** add yoga exercise to user favorites */
			userExists[0].yoga.push(yogaId);
			userExists[0].save();
			return true;
		} else {
			/** remove yoga exercise from user favorites */
			const filteredYoga = yogaObjectId.filter(
				(objectId) => objectId.toString() !== yogaId
			);
			userExists[0].yoga = filteredYoga;
			userExists[0].save();
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
			yoga: yogaId,
		});
		return true;
	}
};

module.exports = { addYogaExerciseToFavorites };
