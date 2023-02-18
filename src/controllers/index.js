import { postInsertYogaExercise } from "@/src/controllers/yogaController";

import { postAddYogaExerciseToFavorites } from "@/src/controllers/userController";
import { postListSingleYogaFavorite } from "@/src/controllers/userController";
import { postAddMeditationCourseToFavorites } from "@/src/controllers/userController";
import { postListSingleMeditationCourseFavorite } from "@/src/controllers/userController";

const YogaController = {
	postInsertYogaExercise,
};

const UserController = {
	postAddYogaExerciseToFavorites,
	postListSingleYogaFavorite,
	postAddMeditationCourseToFavorites,
	postListSingleMeditationCourseFavorite,
};

module.exports = {
	YogaController,
	UserController,
};
