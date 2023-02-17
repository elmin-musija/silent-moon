import React from "react";
import { MeditationService } from "@/src/services/use-cases/index";

const MeditationPlayerPage = ({ meditation }) => {
	return (
		<div>
			<h1>MeditationPlayerPage</h1>
		</div>
	);
};

export default MeditationPlayerPage;

export async function getStaticPaths() {
	const allMeditations = await MeditationService.listAllMeditations();

	const path = allMeditations.map((element) => ({
		params: { meditationId: element._id },
	}));
	return { paths: path, fallback: "blocking" };
}

export async function getStaticProps(context) {
	const { meditationId } = context.params;
	const meditation = await MeditationService.listSingleMeditationById({
		meditationId: meditationId,
	});
	return { props: { meditation } };
}
