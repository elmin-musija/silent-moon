import { connectToDatabase } from "@/src/models/mongoose-setup";
import { verifyPassword } from "@/src/services/utils/crypt/crypt";
import User from "@/src/models/UserModel";

const signin = async ({ email, password }) => {
	console.log("use-case, signin...", email, password);
	await connectToDatabase();
	/** check if user already exists in db */
	const userExists = await User.findOne({ email }).exec();
	console.log({ userExists });

	if (userExists) {
		const enteredPasswordIsValid = await verifyPassword(
			password,
			userExists.password
		);
		if (enteredPasswordIsValid) {
			return {
				name: `${userExists.name.firstname} ${userExists.name.lastname}`,
				email: userExists.email,
			};
		} else {
			return false;
		}
	} else {
		return false;
	}
};

module.exports = {
	signin,
};
