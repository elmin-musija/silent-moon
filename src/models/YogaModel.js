import { mongoose } from "mongoose";

const yogaSchema = new mongoose.Schema({
	// _id: { type: mongoose.Types.ObjectId },
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

module.exports = mongoose.models.Yoga || mongoose.model("Yoga", yogaSchema);
