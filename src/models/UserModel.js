import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
	// _id: { type: mongoose.Types.ObjectId },
	name: {
		firstname: { type: String, required: true },
		lastname: { type: String, required: true },
	},
	email: { type: String },
	password: { type: String },
	yoga: [{ type: mongoose.Types.ObjectId, ref: "Yoga" }],
	meditation: [{ type: mongoose.Types.ObjectId, ref: "MeditationCourse" }],
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
