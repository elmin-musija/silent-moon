import React, { useState, useEffect, useContext } from "react";
import { uid } from "uid";
import { MeditationService } from "@/src/services/use-cases/index";
import clsx from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import NotificationContext from "@/context/context";
import styles from "./player.module.css";

const MeditationPlayerPage = ({ meditation }) => {
	// const { data: session, status } = useSession();
	// const { displayNotification } = useContext(NotificationContext);
	const router = useRouter();
	const [videoFullscreen, setVideoFullscreen] = useState(false);
	// const [yogaIsFavorite, setYogaIsFavorite] = useState(false);
	// const [animation, setAnimation] = useState(0);

	const videoFullscreenHandler = () => {
		setVideoFullscreen(!videoFullscreen);
	};

	// const onLikeButtonClickHandler = async () => {
	// 	// Change animation state
	// 	setAnimation(1);

	// 	const options = {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			name: session.user.name,
	// 			email: session.user.email,
	// 			meditationId: meditation._id,
	// 		}),
	// 	};
	// 	const result = await fetch("/api/meditation/exercise", options);
	// 	const response = await result.json();
	// 	if (response.status === "success") {
	// 		if (response.data.isFavorite) {
	// 			displayNotification({
	// 				type: "success",
	// 				message: "Exercise successfully added to favorites",
	// 			});
	// 		} else {
	// 			displayNotification({
	// 				type: "success",
	// 				message: "Exercise successfully removed from favorites",
	// 			});
	// 		}
	// 		setYogaIsFavorite(response.data.isFavorite);
	// 	}
	// };

	// useEffect(() => {
	// 	const options = {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({
	// 			yogaId: meditation._id,
	// 		}),
	// 	};
	// 	fetch("/api/yoga/singlefavorite", options)
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			if (result.status === "success") {
	// 				setYogaIsFavorite(result.data.isFavorite);
	// 			}
	// 		});
	// }, []);

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
					{/* <button
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
					</button> */}
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
						{/* <div className={styles.typeCategory}>
							<p key={uid()}>#</p>
							<p key={uid()}>{meditation.category}</p>
						</div> */}
					</div>
					{/* <p key={uid()} className={styles.lengthCategory}>
						Length: {yogaId.lengthCategory.toLowerCase()}
					</p> */}
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
