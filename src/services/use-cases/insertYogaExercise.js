import Yoga from "../../models/YogaModel";

const insertYogaExercise = async ({
	title,
	description,
	imageUrl,
	category,
	level,
	duration,
	videoUrl,
}) => {
	const yoga = Yoga.create({
		title,
		description,
		imageUrl,
		category,
		level,
		duration,
		videoUrl,
	});
	return yoga;
};

module.exports = { insertYogaExercise };
