import { mongoose } from "mongoose";

const meditationCourseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		enum: ["anxious", "sleep", "kids", "recovery", "fitness"],
		required: true,
	},
	program: [
		{ type: mongoose.Types.ObjectId, ref: "Meditation", required: true },
	],
});

module.exports =
	mongoose.models.MeditationCourse ||
	mongoose.model("MeditationCourse", meditationCourseSchema);
