import { connectToDatabase } from "@/src/models/mongoose-setup";
import Yoga from "@/src/models/YogaModel";

const listAllYogaCategories = async () => {
	await connectToDatabase();
	/** get a unique set of all categories */
	const result = await Yoga.aggregate([
		{ $group: { _id: "$category" } },
		{ $sort: { _id: 1 } },
	]);
	/** add missing category "all" */
	const allYogaCategories = [{ _id: "all" }, ...result];

	return allYogaCategories;
};

module.exports = { listAllYogaCategories };
