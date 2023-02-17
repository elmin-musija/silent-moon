import { connectToDatabase } from "@/src/models/mongoose-setup";
import MeditationCourse from "@/src/models/MeditationCourseModel";

const listAllMeditationCourses = async () => {
	await connectToDatabase();

	const result = await MeditationCourse.find();
	const meditationCourses = result.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		description: element.description,
		imageUrl: element.imageUrl,
		category: element.category,
	}));
	return meditationCourses;
};

module.exports = { listAllMeditationCourses };
