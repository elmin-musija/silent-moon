import React, { useState, useEffect, useContext } from "react";
import NotificationContext from "@/context/context";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { uid } from "uid";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import Title from "@/components/title/title";
import { MeditationService } from "@/src/services/use-cases/index";
import styles from "./meditationId.module.css";

const MeditationDetails = ({ meditationCourseInfo, meditationsById }) => {
	const { data: session, status } = useSession();
	const [meditationCourseIsFavorite, setMeditationCourseIsFavorite] =
		useState(false);
	const { displayNotification } = useContext(NotificationContext);
	const [animation, setAnimation] = useState(0);
	const router = useRouter();

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
				meditationCourseId: meditationCourseInfo._id,
			}),
		};
		const result = await fetch("/api/meditation/favorite/single/add", options);
		const response = await result.json();
		if (response.status === "success") {
			if (response.data.isFavorite) {
				displayNotification({
					type: "success",
					message: "Exercise successfully added to favorites",
				});
			} else {
				displayNotification({
					type: "success",
					message: "Exercise successfully removed from favorites",
				});
			}
			setMeditationCourseIsFavorite(response.data.isFavorite);
		}
	};

	useEffect(() => {
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				meditationCourseId: meditationCourseInfo._id,
			}),
		};
		fetch("/api/meditation/favorite/single/show", options)
			.then((res) => res.json())
			.then((result) => {
				if (result.status === "success") {
					setMeditationCourseIsFavorite(result.data.isFavorite);
				}
			});
	}, []);

	return (
		<div className={styles.mediationDetailsPage}>
			<h1>Silent Moon</h1>
			<div className={styles.imgBtnContainer}>
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
						{!meditationCourseIsFavorite && (
							<Image
								src="/img/like_btn.svg"
								width="55"
								height="55"
								alt="heart"
							/>
						)}
						{meditationCourseIsFavorite && (
							<Image
								src="/img/like_btn_filled.svg"
								width="55"
								height="55"
								alt="heart"
							/>
						)}
					</button>
				</div>

				<Image
					src={meditationCourseInfo.imageUrl}
					width="414"
					height="414"
					alt="playlist thumbnail"
					className={styles.playlistImg}
				/>
			</div>

			<div key={uid()} className={styles.playlistInfo}>
				<h2>{meditationCourseInfo.title}</h2>
				<p key={uid()}>Course</p>
				<p key={uid()}>{meditationCourseInfo.description}</p>
				<div className={styles.statisticsContainer}>
					<div key={uid()}>
						<Image
							src="/img/red-heart.svg"
							width="18"
							height="16"
							alt="heart icon"
						></Image>
						{/* <p>{playlistInfo.followers.total} Follower</p> */}
					</div>
					<div key={uid()}>
						<Image
							src="/img/headphones.svg"
							width="20"
							height="16"
							alt="headphones icon"
						></Image>
						{/* <p>{(playlistInfo.followers.total % 500) * 33} Listening</p> */}
					</div>
				</div>
			</div>
			<div key={uid()} className={styles.playlist}>
				<h3>Playlist</h3>
				{meditationsById.map((element) => (
					<div key={uid()} className={styles.trackContainer}>
						<Link key={uid()} href={`player/${element._id}`}>
							<Image
								src="/img/play_button.svg"
								width="40"
								height="40"
								alt="play icon"
								className={styles.playBtn}
							></Image>
						</Link>
						<div className={styles.trackInfoContainer}>
							<div key={uid()} className={styles.trackNameDurationContainer}>
								<Link key={uid()} href={`player/${element._id}`}>
									{element.title}
								</Link>
								<p>
									{convertDurationTimeFormat(
										(Number(element.duration.minutes) * 60 +
											Number(element.duration.seconds)) *
											1000
									)}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MeditationDetails;

export async function getStaticPaths() {
	/** generate all paths for meditation courses */
	const allMeditationCourses =
		await MeditationService.listAllMeditationCourses();
	const path = allMeditationCourses.map((element) => ({
		params: { meditationId: element._id },
	}));
	return { paths: path, fallback: "blocking" };
}

export async function getStaticProps(context) {
	/** get paths for individual meditation course */
	const { meditationId } = context.params;
	const { meditationCourseInfo, meditationsById } =
		await MeditationService.listMeditationCourseById({
			meditationCourseId: meditationId,
		});

	return {
		props: { meditationCourseInfo, meditationsById },
		revalidate: 60 * 60 * 24,
	};
}
