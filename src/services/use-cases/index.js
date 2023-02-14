import { insertYogaExercise } from "@/src/services/use-cases/insertYogaExercise";
import { listAllYogaExercises } from "@/src/services/use-cases/listAllYogaExercises";

const YogaService = {
	insertYogaExercise,
	listAllYogaExercises,
};

module.exports = {
	YogaService,
};
