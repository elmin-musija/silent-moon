import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import { YogaService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NotificationContext from "@/context/context";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./yogaId.module.css";

const YogaDetails = ({ yogaId }) => {
	const { data: session, status } = useSession();
	const {
		displayNotification,
		getPhoneRotated,
		setPhoneRotated,
		resetPhoneRotated,
	} = useContext(NotificationContext);
	const router = useRouter();
	const [yogaIsFavorite, setYogaIsFavorite] = useState(false);
	const [animation, setAnimation] = useState(0);

	const onLikeButtonClickHandler = async () => {
		// Change animation state
		setAnimation(1);

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
		const result = await fetch("/api/yoga/favorite/single/add", options);
		const response = await result.json();
		if (response.status === "success") {
			if (response.data.isFavorite) {
				displayNotification({
					type: "success",
					message: "Yoga session added to favourites",
				});
			} else {
				displayNotification({
					type: "success",
					message: "Yoga session removed from favourites",
				});
			}
			setYogaIsFavorite(response.data.isFavorite);
		}
	};

	useEffect(() => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				yogaId: yogaId._id,
			}),
		};
		fetch("/api/yoga/favorite/single/show", options)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === "success") {
					setYogaIsFavorite(result.data.isFavorite);
				}
			});
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

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

	if (!getPhoneRotated()) {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={styles.yogaIdPage}
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
						<button
							className={styles.likeBtn}
							onClick={onLikeButtonClickHandler}
							onAnimationEnd={() => setAnimation(0)}
							animation={animation}
						>
							{!yogaIsFavorite && (
								<Image
									src="/img/like_btn.svg"
									width="55"
									height="55"
									alt="heart"
								/>
							)}
							{yogaIsFavorite && (
								<Image
									src="/img/like_btn_filled.svg"
									width="55"
									height="55"
									alt="heart"
								/>
							)}
						</button>
					</div>
					<iframe src={videoUrl} title={yogaId.title} frameBorder="0"></iframe>
					<div className={styles.content}>
						<h2>{yogaId.title}</h2>
						<div className={styles.statisticsContainer}>
							<div key={uid()} className={styles.iconNumberContainer}>
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
							<div key={uid()} className={styles.iconNumberContainer}>
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
							<p key={uid()} className={levelStyle}>
								{yogaId.level}
							</p>
							<div className={styles.typeCategory}>
								<p key={uid()}>#</p>
								<p key={uid()}>{yogaId.category}</p>
							</div>
						</div>
						<p key={uid()} className={styles.description}>
							{yogaId.description}
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
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={styles.videoFullscreenContainer}
					id="top"
				>
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
					<iframe src={videoUrl} title={yogaId.title} frameBorder="0"></iframe>
				</motion.div>
			</AnimatePresence>
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
