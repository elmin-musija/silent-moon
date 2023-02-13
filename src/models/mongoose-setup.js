import { mongoose } from "mongoose";

const MONGO_URL = process.env.MONGO_URL;
const DBNAME = process.env.MONGO_DB_NAME;

async function connectToDatabase() {
	try {
		console.log("Connecting to database...");
		await mongoose.connect(MONGO_URL, {
			DBNAME,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to database successfully");
	} catch (error) {
		console.log("Error connecting to database, will abort!");
		console.log(error);
		process.exit(1); // Node prozess beenden
	}
}

module.exports = {
	connectToDatabase,
};
