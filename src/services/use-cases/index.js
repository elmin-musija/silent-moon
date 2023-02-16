import { insertYogaExercise } from "@/src/services/use-cases/insertYogaExercise";
import { listAllYogaExercises } from "@/src/services/use-cases/listAllYogaExercises";
import { listAllYogaCategories } from "@/src/services/use-cases/listAllYogaCategories";
import { listSingleYogaExercise } from "@/src/services/use-cases/listSingleYogaExercise";

import { addYogaExerciseToFavorites } from "@/src/services/use-cases/addYogaExerciseToFavorites";
import { listAllFavoriteYogaExercises } from "@/src/services/use-cases/listAllFavoriteYogaExercises";

const YogaService = {
	insertYogaExercise,
	listAllYogaExercises,
	listAllYogaCategories,
	listSingleYogaExercise,
};

const UserService = {
	addYogaExerciseToFavorites,
	listAllFavoriteYogaExercises,
};

module.exports = {
	YogaService,
	UserService,
};
