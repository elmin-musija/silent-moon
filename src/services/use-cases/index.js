import { insertYogaExercise } from "@/src/services/use-cases/insertYogaExercise";
import { listAllYogaExercises } from "@/src/services/use-cases/listAllYogaExercises";
import { listAllYogaCategories } from "@/src/services/use-cases/listAllYogaCategories";
import { listSingleYogaExercise } from "@/src/services/use-cases/listSingleYogaExercise";

const YogaService = {
	insertYogaExercise,
	listAllYogaExercises,
	listAllYogaCategories,
	listSingleYogaExercise,
};

module.exports = {
	YogaService,
};
