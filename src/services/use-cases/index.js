import { insertYogaExercise } from "@/src/services/use-cases/insertYogaExercise";
import { listAllYogaExercises } from "@/src/services/use-cases/listAllYogaExercises";
import { listAllYogaCategories } from "@/src/services/use-cases/listAllYogaCategories";
import { listSingleYogaExercise } from "@/src/services/use-cases/listSingleYogaExercise";

import { addYogaExerciseToFavorites } from "@/src/services/use-cases/addYogaExerciseToFavorites";
import { listAllYogaFavoriteExercises } from "@/src/services/use-cases/listAllYogaFavoriteExercises";
import { listSingleFavoriteYogaExercise } from "@/src/services/use-cases/listSingleYogaFavoriteExercise";
import { toggleMeditationCourseFavorites } from "@/src/services/use-cases/toggleMeditationCourseFavorites";
import { listSingleMeditationCourseFavorite } from "@/src/services/use-cases/listSingleMeditationCourseFavorite";
import { listAllMeditationCourseFavorites } from "@/src/services/use-cases/listAllMeditationCourseFavorites";
import { signup } from "@/src/services/use-cases/signup";

import { listAllMeditationCourses } from "@/src/services/use-cases/listAllMeditationCourses";
import { listMeditationCourseById } from "@/src/services/use-cases/listMeditationCourseById";
import { listAllMeditations } from "@/src/services/use-cases/listAllMeditations";
import { listSingleMeditationById } from "@/src/services/use-cases/listSingleMeditationById";
// import { createMeditations } from "@/src/services/use-cases/createMeditations";
// import { createMeditationCourses } from "@/src/services/use-cases/createMeditationCourses";

const YogaService = {
	insertYogaExercise,
	listAllYogaExercises,
	listAllYogaCategories,
	listSingleYogaExercise,
};

const UserService = {
	addYogaExerciseToFavorites,
	listSingleFavoriteYogaExercise,
	/** list all favorite yoga exercises of a given user*/
	listAllYogaFavoriteExercises,
	/** toggle meditation course by given id from user favorites */
	toggleMeditationCourseFavorites,
	/** get single meditation course favorite by given id from user */
	listSingleMeditationCourseFavorite,
	/** get all meditation course favorites by given email from user*/
	listAllMeditationCourseFavorites,
	/** signup user */
	signup,
};

const MeditationService = {
	/** list all meditation courses */
	listAllMeditationCourses,
	/** list meditation course by a given ID */
	listMeditationCourseById,
	/** list all meditations */
	listAllMeditations,
	/** list single meditation by a given ID*/
	listSingleMeditationById,

	/**
	 * helper service to create meditations
	 * and meditation courses */
	// createMeditations,
	// createMeditationCourses,
};

module.exports = {
	YogaService,
	UserService,
	MeditationService,
};
