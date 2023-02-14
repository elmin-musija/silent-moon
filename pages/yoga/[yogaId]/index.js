import React from "react";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./yogaId.module.css";

const YogaDetails = ({ yogaId }) => {
	const router = useRouter();

	{
		/** extract video Id from video link and format to embed  */
	}
	const videoId = String(yogaId.videoUrl).split("?v=")[1];
	const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

	const levelStyle = clsx({
		[styles.beginner]: yogaId.level === "BEGINNER",
		[styles.medium]: yogaId.level === "MEDIUM",
		[styles.intermediate]: yogaId.level === "INTERMEDIATE",
		[styles.advanced]: yogaId.level === "ADVANCED",
	});

	return (
		<div className={styles.yogaIdPage}>
			<div className={styles.btnContainer}>
				<button onClick={() => router.back()} className={styles.backBtn}>
					<Image
						src="/img/back_arrow_yellow.svg"
						width="55"
						height="55"
						alt="back"
					/>
				</button>
				<button className={styles.likeBtn}>
					<Image src="/img/like_btn.svg" width="55" height="55" alt="heart" />
				</button>
			</div>
			<iframe src={videoUrl} title={yogaId.title} frameBorder="0"></iframe>
			<div className={styles.content}>
				<h2>{yogaId.title}</h2>
				<div className={styles.levelCategoryContainer}>
					<p key={uid()} className={levelStyle}>
						{yogaId.level}
					</p>
					<div className={styles.typeCategory}>
						<p key={uid()}>#</p>
						<p key={uid()}>{yogaId.typeCategory}</p>
					</div>
				</div>
				<p key={uid()} className={styles.lengthCategory}>
					Length: {yogaId.lengthCategory.toLowerCase()}
				</p>
				<p key={uid()} className={styles.description}>
					{yogaId.description}
				</p>
				<div className={styles.controlFullscreenContainer}>
					<button>
						<Image
							src="/img/fullscreen.svg"
							width="20"
							height="20"
							alt="fullscreen"
						/>
					</button>
					<p>Video Fullscreen</p>
				</div>
			</div>
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
