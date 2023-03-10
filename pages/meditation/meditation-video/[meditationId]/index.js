import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import { MeditationService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import NotificationContext from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./player.module.css";

const MeditationPlayerPage = ({ meditation }) => {
	const { getPhoneRotated, setPhoneRotated, resetPhoneRotated } =
		useContext(NotificationContext);
	const router = useRouter();

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

	useEffect(() => {
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

	if (!getPhoneRotated()) {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={styles.meditationIdPage}
					id="top"
				>
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
						<div className={styles.statisticsContainer}>
							<div key={uid()}>
								<Image
									src="/img/red-heart.svg"
									width="18"
									height="16"
									alt="heart icon"
								></Image>
								<p>
									{Math.floor(Math.random() * (35000 - 2000) + 2000)} Follower
								</p>
							</div>
							<div key={uid()}>
								<Image
									src="/img/headphones.svg"
									width="20"
									height="16"
									alt="headphones icon"
								></Image>
								<p>
									{Math.floor(Math.random() * (15000 - 500) + 500)} Listening
								</p>
							</div>
						</div>
						<div className={styles.levelContainer}>
							<p key={uid()} className={levelStyle}>
								{meditation.level}
							</p>
						</div>
						<p key={uid()} className={styles.description}>
							{meditation.description}
						</p>
						<div className={styles.controlFullscreenContainer}>
							<button
								onClick={() => {
									setPhoneRotated();
								}}
							>
								<Image
									src="/img/fullscreen.svg"
									width="20"
									height="20"
									alt="fullscreen"
								/>
							</button>
							<p
								onClick={() => {
									setPhoneRotated();
								}}
							>
								Fullscreen
							</p>
						</div>
					</div>
				</motion.div>
			</AnimatePresence>
		);
	}

	if (getPhoneRotated()) {
		return (
			<div className={styles.videoFullscreenContainer}>
				<div className={styles.overlay}>
					<button
						onClick={() => {
							resetPhoneRotated();
						}}
					>
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
