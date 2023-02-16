import React from "react";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./yogaId.module.css";

const YogaDetails = ({ yogaId }) => {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [videoFullscreen, setVideoFullscreen] = useState(false);

	const videoFullscreenHandler = () => {
		setVideoFullscreen(!videoFullscreen);
	};

	const onLikeButtonClickHandler = async () => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: session.user.name,
				email: session.user.email,
				yogaId: yogaId._id,
			}),
		};
		const result = await fetch("/api/yoga/exercise", options);
		const response = await result.json();
	};

	{
		/** extract video Id from video link and format to embed  */
	}
	const videoId = String(yogaId.videoUrl).split("?v=")[1];
	const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

	const levelStyle = clsx({
		[styles.beginner]: yogaId.level === "beginner",
		[styles.medium]: yogaId.level === "medium",
		[styles.intermediate]: yogaId.level === "intermediate",
		[styles.advanced]: yogaId.level === "advanced",
	});

	if (!videoFullscreen) {
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
					<button className={styles.likeBtn} onClick={onLikeButtonClickHandler}>
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
							<p key={uid()}>{yogaId.category}</p>
						</div>
					</div>
					{/* <p key={uid()} className={styles.lengthCategory}>
						Length: {yogaId.lengthCategory.toLowerCase()}
					</p> */}
					<p key={uid()} className={styles.description}>
						{yogaId.description}
					</p>
					<div className={styles.controlFullscreenContainer}>
						<button onClick={videoFullscreenHandler}>
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
	}

	if (videoFullscreen) {
		return (
			<div className={styles.videoFullscreenContainer}>
				<div className={styles.overlay}>
					<button onClick={videoFullscreenHandler}>
						<Image
							src="/img/close_player.svg"
							width="55"
							height="55"
							alt="close player"
						/>
					</button>
				</div>
				<iframe src={videoUrl} title={yogaId.title} frameBorder="0"></iframe>
			</div>
		);
	}
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
