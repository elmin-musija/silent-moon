const getRandomItemFromArray = (paramArray) => {
	const max = paramArray.length - 1;
	const min = 0;
	const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
	return paramArray[randomIndex];
};

module.exports = {
	getRandomItemFromArray,
};
