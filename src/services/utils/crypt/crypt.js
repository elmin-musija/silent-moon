import { hash, compare } from "bcryptjs";

const generatePasswordHash = async (paramPassword) => {
	const passwordHash = await hash(paramPassword, 12);
	return passwordHash;
};

const verifyPassword = async (paramUserPassword, paramHashedPasswort) => {
	const isVerified = await compare(paramUserPassword, paramHashedPasswort);
	return isVerified;
};

module.exports = {
	generatePasswordHash,
	verifyPassword,
};
