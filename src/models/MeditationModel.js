import { mongoose } from "mongoose";

const meditationSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: {
		type: String,
		required: true,
	},
	level: {
		type: String,
		enum: ["beginner", "medium", "intermediate", "advanced"],
		required: true,
	},
	duration: {
		minutes: { type: Number, min: 0, required: true },
		seconds: { type: Number, min: 0, required: true },
	},
	videoUrl: {
		type: String,
		required: true,
	},
});

module.exports =
	mongoose.models.Meditation || mongoose.model("Meditation", meditationSchema);
