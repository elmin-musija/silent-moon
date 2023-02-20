import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import { MeditationService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import NotificationContext from "@/context/context";
import styles from "./player.module.css";

const MeditationPlayerPage = ({ meditation }) => {
	const { getPhoneRotated, setPhoneRotated } = useContext(NotificationContext);
	const router = useRouter();

	const videoFullscreenHandler = () => {
		setPhoneRotated();
	};

	{
		/** extract video Id from video link and format to embed  */
	}

	const videoId = String(meditation.videoUrl).split("?v=")[1];
	const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

	const levelStyle = clsx({
		[styles.beginner]: meditation.level === "beginner",
		[styles.medium]: meditation.level === "medium",
		[styles.intermediate]: meditation.level === "intermediate",
		[styles.advanced]: meditation.level === "advanced",
	});

	if (!getPhoneRotated()) {
		return (
			<div className={styles.yogaIdPage}>
				<div className={styles.btnContainer}>
					<button onClick={() => router.back()} className={styles.backBtn}>
						<Image
							src="/img/arrow-back.svg"
							width="18"
							height="18"
							alt="back"
						></Image>
					</button>
				</div>
				<iframe
					src={videoUrl}
					title={meditation.title}
					frameBorder="0"
				></iframe>
				<div className={styles.content}>
					<h2>{meditation.title}</h2>
					<div className={styles.levelCategoryContainer}>
						<p key={uid()} className={levelStyle}>
							{meditation.level}
						</p>
					</div>
					<p key={uid()} className={styles.description}>
						{meditation.description}
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
						<p onClick={videoFullscreenHandler}>Video Fullscreen</p>
					</div>
				</div>
			</div>
		);
	}

	if (getPhoneRotated()) {
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
				<iframe
					src={videoUrl}
					title={meditation.title}
					frameBorder="0"
				></iframe>
			</div>
		);
	}
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
	return { props: { meditation }, revalidate: 60 * 60 * 24 };
}
