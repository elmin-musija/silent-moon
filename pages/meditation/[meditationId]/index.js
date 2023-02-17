import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { uid } from "uid";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import Title from "@/components/title/title";
import { MeditationService } from "@/src/services/use-cases/index";
import styles from "./meditationId.module.css";

const MeditationDetails = ({ meditationCourseInfo, meditationsById }) => {
	const router = useRouter();

	return (
		<div className={styles.mediationDetailsPage}>
			<Title />
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

			<Image
				src={meditationCourseInfo.imageUrl}
				width="414"
				height="414"
				alt="playlist thumbnail"
				className={styles.playlistImg}
			/>

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
						<Link key={uid()} href={`/player/${element.videoUrl}`}>
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
