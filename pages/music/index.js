import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { uid } from "uid";
import {
	getPlaylistTracks,
	getPlaylistInfo,
} from "@/src/services/utils/spotify/spotify";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import Title from "@/components/title/title";
import styles from "./music.module.css";

const MusicPage = ({ playlistInfo, playlistTracks }) => {
	const { items } = playlistTracks;

	return (
		<div className={styles.musicPage}>
			<Title />
			<Link
				href={`/player/q?type=${playlistInfo.type}&offset=0&id=${playlistInfo.id}`}
			>
				<h2>{playlistInfo.name}</h2>
			</Link>
			<p key={uid()}>Playlist</p>
			<p key={uid()}>{playlistInfo.description}</p>
			<div className={styles.statisticsContainer}>
				<div key={uid()}>
					<Image
						src="/img/red-heart.svg"
						width="18"
						height="16"
						alt="heart icon"
					></Image>
					<p>24.234 Favourites</p>
				</div>
				<div key={uid()}>
					<Image
						src="/img/headphones.svg"
						width="20"
						height="16"
						alt="headphones icon"
					></Image>
					<p>34.972 Listening</p>
				</div>
			</div>
			{items.map((element, index) => (
				<div key={uid()} className={styles.trackContainer}>
					<Link
						key={uid()}
						href={`/player/q?type=${playlistInfo.type}&offset=${index}&id=${playlistInfo.id}`}
					>
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
							<Link
								key={uid()}
								href={`/player/q?type=${playlistInfo.type}&offset=${index}&id=${playlistInfo.id}`}
							>
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
	);
};

export default MusicPage;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	if (!session) {
		return { redirect: { destination: "/", permanent: false } };
	}
	if (session.user.provider !== "spotify") {
		return { redirect: { destination: "/home", permanent: false } };
	}

	const meditationId = process.env.GOOD_VIBE_PLAYLIST_ID;

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
