import React from "react";
import CircularSectionBottomLeft from "./circular-section-bottom-left/circular-section-bottom-left";
import CircularSectionBottomRight from "./circular-section-bottom-right/circular-section-bottom-right";
import CircularSectionTopLeft from "./circular-section-top-left/circular-section-top-left";
import CircularSectionTopRight from "./circular-section-top-right/circular-section-top-right";

const CircularSection = () => {
	return (
		<>
			<CircularSectionTopLeft />
			<CircularSectionTopRight />
			<CircularSectionBottomLeft />
			<CircularSectionBottomRight />
		</>
	);
};

export default CircularSection;
