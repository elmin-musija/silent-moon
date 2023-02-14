import { insertYogaExercise } from "@/src/services/use-cases/insertYogaExercise";
import { listAllYogaExercises } from "@/src/services/use-cases/listAllYogaExercises";
import { listAllYogaCategories } from "@/src/services/use-cases/listAllYogaCategories";

const YogaService = {
	insertYogaExercise,
	listAllYogaExercises,
	listAllYogaCategories,
};

module.exports = {
	YogaService,
};
