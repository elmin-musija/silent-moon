import { connectToDatabase } from "@/src/models/mongoose-setup";
import { generatePasswordHash } from "@/src/services/utils/crypt/crypt";
import User from "@/src/models/UserModel";

const signup = async ({ firstname, lastname, email, password }) => {
	/** check if user already exists in db */
	await connectToDatabase();
	const userExists = await User.findOne({ email: email }).exec();
	if (!userExists) {
		const passwordHash = await generatePasswordHash(password);

		const insertUser = await User.create({
			name: {
				firstname: firstname,
				lastname: lastname,
			},
			email: email,
			password: passwordHash,
			yoga: [],
			meditation: [],
		});

		return true;
	} else {
		/** user does not exist --> create user*/
		return false;
	}
};

module.exports = {
	signup,
};
