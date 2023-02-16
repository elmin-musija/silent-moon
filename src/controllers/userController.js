import { connectToDatabase } from "@/src/models/mongoose-setup";
import { UserService } from "@/src/services/use-cases/";

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
		data: result,
	});
};

module.exports = {
	postAddYogaExerciseToFavorites,
};
