import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { uid } from "uid";
import { getPlaylistTracks, getPlaylistInfo } from "@/utils/spotify/spotify";
import { convertDurationTimeFormat } from "@/utils/convert/convert";
import styles from "./meditationId.module.css";
import Title from "@/components/title/title";

const MeditationDetails = ({ playlistInfo, playlistTracks }) => {
	const { items } = playlistTracks;
	console.log(playlistInfo);

	return (
		<div className={styles.mediationDetailsPage}>
			<Title />
			<Image
				src={playlistInfo.images[0].url}
				width="414"
				height="414"
				alt="playlist thumbnail"
				className={styles.playlistImg}
			/>

			<div key={uid()} className={styles.playlistInfo}>
				<h2>{playlistInfo.name}</h2>
				<p key={uid()}>Course</p>
				<p key={uid()}>{playlistInfo.description}</p>
				<div className={styles.statisticsContainer}>
					<div key={uid()}>
						<Image
							src="/img/red-heart.svg"
							width="18"
							height="16"
							alt="heart icon"
						></Image>
						<p>{playlistInfo.followers.total} Follower</p>
					</div>
					<div key={uid()}>
						<Image
							src="/img/headphones.svg"
							width="20"
							height="16"
							alt="headphones icon"
						></Image>
						<p>{(playlistInfo.followers.total % 100) * 18} Listening</p>
					</div>
				</div>
			</div>
			<div key={uid()} className={styles.playlist}>
				<h3>Playlist</h3>
				{items.map((element) => (
					<div key={uid()} className={styles.trackContainer}>
						<Link key={uid()} href={`/player/${element.track.id}`}>
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
								<Link key={uid()} href={`/player/${element.track.id}`}>
									{element.track.name}
								</Link>
								<p>{convertDurationTimeFormat(element.track.duration_ms)}</p>
							</div>
							<div key={uid()} className={styles.artistContainer}>
								{element.track.artists.map((artist) => (
									<p key={uid()}>{artist.name}</p>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MeditationDetails;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}

	const { meditationId } = context.params;
	const playlistInfo = await getPlaylistInfo(
		session.user.refresh_token,
		meditationId
	);
	const playlistTracks = await getPlaylistTracks(
		session.user.refresh_token,
		meditationId
	);

	return { props: { playlistInfo, playlistTracks } };
}
