const getFirstnameLastname = (name) => {
	let firstname = " ";
	let lastname = " ";

	if (name) {
		if (name.indexOf(" ") !== -1) {
			[firstname, lastname] = name.split(" ");
		} else if (name.indexOf(".") !== -1) {
			[firstname, lastname] = name.split(".");
		} else if (name.indexOf("-") !== -1) {
			[firstname, lastname] = name.split("-");
		} else if (name.indexOf("_") !== -1) {
			[firstname, lastname] = name.split("_");
		} else {
			firstname = name;
			lastname = " ";
		}
	}
	return { firstname, lastname };
};

module.exports = {
	getFirstnameLastname,
};
