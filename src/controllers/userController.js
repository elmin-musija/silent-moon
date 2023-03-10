import { connectToDatabase } from "@/src/models/mongoose-setup";
import { UserService } from "@/src/services/use-cases/index";
import { getToken } from "next-auth/jwt";

const postAddYogaExerciseToFavorites = async (req, res) => {
	await connectToDatabase();
	const favorite = {
		name: req.body.name,
		email: req.body.email,
		yogaId: req.body.yogaId,
	};
	const result = await UserService.addYogaExerciseToFavorites(favorite);
	return res.json({
		status: "success",
		data: { isFavorite: result },
	});
};

const postAddMeditationCourseToFavorites = async (req, res) => {
	await connectToDatabase();
	const favorite = {
		name: req.body.name,
		email: req.body.email,
		meditationCourseId: req.body.meditationCourseId,
	};
	const result = await UserService.toggleMeditationCourseFavorites(favorite);
	return res.json({
		status: "success",
		data: { isFavorite: result },
	});
};

const postListSingleYogaFavorite = async (req, res) => {
	const session = await getToken({ req });
	if (!session) {
		return res.json({
			status: "error",
			message: "Error: You are not logged in!",
		});
	}
	await connectToDatabase();
	const favorite = {
		email: session.email,
		yogaId: req.body.yogaId,
	};
	const result = await UserService.listSingleFavoriteYogaExercise(favorite);
	return res.json({
		status: "success",
		data: { isFavorite: result },
	});
};

const postListAllYogaFavorites = async (req, res) => {
	const session = await getToken({ req });
	if (!session) {
		return res.json({
			status: "error",
			message: "Error: You are not logged in!",
		});
	}
	await connectToDatabase();
	const favorite = {
		email: session.email,
	};
	const result = await UserService.listAllYogaFavoriteExercises(favorite);
	return res.json({
		status: "success",
		data: { favorites: result },
	});
};

const postListSingleMeditationCourseFavorite = async (req, res) => {
	const session = await getToken({ req });
	if (!session) {
		return res.json({
			status: "error",
			message: "Error: You are not logged in!",
		});
	}
	await connectToDatabase();
	const favorite = {
		email: session.email,
		meditationCourseId: req.body.meditationCourseId,
	};
	const result = await UserService.listSingleMeditationCourseFavorite(favorite);
	return res.json({
		status: "success",
		data: { isFavorite: result },
	});
};

const postListAllMeditationCourseFavorites = async (req, res) => {
	const session = await getToken({ req });
	if (!session) {
		return res.json({
			status: "error",
			message: "Error: You are not logged in!",
		});
	}
	await connectToDatabase();
	const favorite = {
		email: session.email,
	};
	const result = await UserService.listAllMeditationCourseFavorites(favorite);
	return res.json({
		status: "success",
		data: { favorites: result },
	});
};

const postSignUp = async (req, res) => {
	/** error handling */
	await connectToDatabase();

	const user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,

		email: req.body.email,
		password: req.body.password,
		yoga: [],
		meditation: [],
	};
	const result = await UserService.signup(user);
	return res.json({
		status: "success",
		data: { isRegistered: result },
	});
};

module.exports = {
	postAddYogaExerciseToFavorites,
	postListSingleYogaFavorite,
	postListAllYogaFavorites,
	postAddMeditationCourseToFavorites,
	postListSingleMeditationCourseFavorite,
	postListAllMeditationCourseFavorites,
	postSignUp,
};
