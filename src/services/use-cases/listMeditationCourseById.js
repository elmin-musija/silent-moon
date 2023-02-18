import { connectToDatabase } from "@/src/models/mongoose-setup";
import MeditationCourse from "@/src/models/MeditationCourseModel";

const listMeditationCourseById = async ({ meditationCourseId }) => {
	await connectToDatabase();
	const meditationCourse = await MeditationCourse.findById({
		_id: meditationCourseId,
	}).populate("program");

	/** get info about the meditation course */
	const meditationCourseInfo = {
		_id: meditationCourse._id.toString(),
		title: meditationCourse.title,
		description: meditationCourse.description,
		imageUrl: meditationCourse.imageUrl,
		category: meditationCourse.category,
	};

	/** get info about all the meditations of the course by given ID */
	const meditationsById = meditationCourse.program.map((element) => ({
		_id: element._id.toString(),
		title: element.title,
		description: element.description,
		imageUrl: element.imageUrl,
		level: element.level,
		duration: {
			minutes: element.duration.minutes,
			seconds: element.duration.seconds,
		},
		videoUrl: element.videoUrl,
	}));

	return { meditationCourseInfo, meditationsById };
};

module.exports = { listMeditationCourseById };
