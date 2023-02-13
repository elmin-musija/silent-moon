import Yoga from "../../models/YogaModel";

const insertYogaExercise = async ({
	title,
	level,
	description,
	typeCategory,
	lengthCategory,
	lengthValue,
	videoUrl,
}) => {
	const yoga = Yoga.create({
		title,
		level,
		description,
		typeCategory,
		lengthCategory,
		lengthValue,
		videoUrl,
	});
	return yoga;
};

module.exports = { insertYogaExercise };
