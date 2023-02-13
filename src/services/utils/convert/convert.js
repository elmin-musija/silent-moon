const convertDurationTimeFormat = (paramDurationMilliseconds) => {
	const seconds = Math.floor((paramDurationMilliseconds / 1000) % 60);
	const minutes = Math.floor((paramDurationMilliseconds / 1000 / 60) % 60);
	const hours = Math.floor((paramDurationMilliseconds / 1000 / 60 / 60) % 24);

	return hours !== 0
		? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
				2,
				"0"
		  )}`
		: `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export default convertDurationTimeFormat;

module.exports = {
	convertDurationTimeFormat,
};
