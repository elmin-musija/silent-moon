import React from "react";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";

const YogaDetails = ({ yogaId }) => {
	{
		/** extract video Id from video link and format to embed  */
	}
	const videoId = String(yogaId.videoUrl).split("?v=")[1];
	const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

	return (
		<div>
			<iframe src={videoUrl} title={yogaId.title} frameBorder="0"></iframe>
			<h2>{yogaId.title}</h2>
			<p key={uid()}>{yogaId.level}</p>
			<p key={uid()}>{yogaId.typeCategory}</p>
			<p key={uid()}>{yogaId.lengthCategory}</p>
			<p key={uid()}>{yogaId.description}</p>
		</div>
	);
};

export default YogaDetails;

export async function getStaticPaths() {
	{
		/** get all yoga exercises here */
	}
	const allYogaExercises = await YogaService.listAllYogaExercises();
	const path = allYogaExercises.map((element) => ({
		params: { yogaId: element._id },
	}));

	return { paths: path, fallback: "blocking" };
}

export async function getStaticProps(context) {
	{
		/**
		 * get info about specific yoga exercise
		 */
	}
	const { yogaId } = context.params;
	const yogaExercise = await YogaService.listSingleYogaExercise(yogaId);
	return { props: { yogaId: yogaExercise }, revalidate: 60 * 60 * 24 };
}
