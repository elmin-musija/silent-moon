import { mongoose } from "mongoose";

const yogaSchema = new mongoose.Schema({
	title: { type: String, required: true },
	level: {
		type: String,
		enum: ["BEGINNER", "MEDIUM", "INTERMEDIATE", "ADVANCED"],
		required: true,
	},
	description: { type: String, required: true },
	typeCategory: {
		type: String,
		enum: ["ANXIOUS", "SLEEP", "KIDS", "RECOVERY", "FITNESS"],
		required: true,
	},
	lengthCategory: {
		type: String,
		enum: ["SHORT", "MEDIUM", "LONG"],
		required: true,
	},
	lengthValue: {
		minutes: { type: Number, min: 0, required: true },
		seconds: { type: Number, min: 0, required: true },
	},
	videoUrl: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.models.Yoga || mongoose.model("Yoga", yogaSchema);
