import { postInsertYogaExercise } from "@/src/controllers/yogaController";

import { postAddYogaExerciseToFavorites } from "@/src/controllers/userController";
import { postListSingleYogaFavorite } from "@/src/controllers/userController";
import { postListAllYogaFavorites } from "@/src/controllers/userController";
import { postAddMeditationCourseToFavorites } from "@/src/controllers/userController";
import { postListSingleMeditationCourseFavorite } from "@/src/controllers/userController";
import { postListAllMeditationCourseFavorites } from "@/src/controllers/userController";
import { postSignUp } from "@/src/controllers/userController";

const YogaController = {
	postInsertYogaExercise,
};

const UserController = {
	postAddYogaExerciseToFavorites,
	postListSingleYogaFavorite,
	postListAllYogaFavorites,
	postAddMeditationCourseToFavorites,
	postListSingleMeditationCourseFavorite,
	postListAllMeditationCourseFavorites,
	postSignUp,
};

module.exports = {
	YogaController,
	UserController,
};
