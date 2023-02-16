import { postInsertYogaExercise } from "@/src/controllers/yogaController";

import { postAddYogaExerciseToFavorites } from "@/src/controllers/userController";
import { postListSingleYogaFavorite } from "@/src/controllers/userController";

const YogaController = {
	postInsertYogaExercise,
};

const UserController = {
	postAddYogaExerciseToFavorites,
	postListSingleYogaFavorite,
};

module.exports = {
	YogaController,
	UserController,
};
