import { postInsertYogaExercise } from "@/src/controllers/yogaController";

import { postAddYogaExerciseToFavorites } from "@/src/controllers/userController";

const YogaController = {
	postInsertYogaExercise,
};

const UserController = {
	postAddYogaExerciseToFavorites,
};

module.exports = {
	YogaController,
	UserController,
};
