import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
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
import { useSession } from "next-auth/react";
import NotificationContext from "@/context/context";
import { signIn } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./music.module.css";

const MusicPage = ({ playlistInfo, playlistTracks }) => {
	const { data: session, status } = useSession();
	const { resetPhoneRotated } = useContext(NotificationContext);
	const { items } = playlistTracks;
	const router = useRouter();

	const spotifySigninHandler = async () => {
		await signIn("spotify", { callbackUrl: "/music" });
	};

	useEffect(() => {
		resetPhoneRotated();
		const handleRouteChange = () => {
			document.getElementById("top").scrollIntoView();
		};
		router.events.on("routeChangeComplete", handleRouteChange);
	}, []);

	if (!session) {
		return null;
	}

	if (session.user.provider !== "spotify") {
		return (
			<AnimatePresence>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.7 }}
					className={styles.spotifyLoginPage}
					id="top"
				>
					<header>
						<Title />
					</header>
					<main>
						<h2>Spotify Login</h2>
						<p>This function requires you to be logged in with Spotify</p>
						<div className={styles.imageContainer}>
							<Image
								src="/img/buddha.png"
								width="100"
								height="100"
								alt="buddha"
							></Image>
							<Image
								src="/img/right-arrow.svg"
								width="40"
								height="40"
								alt="right arrow"
							></Image>
							<Image
								className={styles.providerLogo}
								onClick={spotifySigninHandler}
								src="/img/spotify.svg"
								width="70"
								height="70"
								alt="spotify logo"
							></Image>
						</div>
					</main>
				</motion.div>
			</AnimatePresence>
		);
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.7 }}
				className={styles.musicPage}
				id="top"
			>
				<header>
					<Title />
				</header>
				<main>
					<Link
						href={`/music-player/q?type=${playlistInfo.type}&offset=0&id=${playlistInfo.id}`}
						className={styles.linkToPlaylistCover}
					>
						<Image
							src={playlistInfo.images[0].url}
							width="160"
							height="160"
							alt="album cover"
							className={styles.albumCover}
						/>
					</Link>
					<Link
						href={`/music-player/q?type=${playlistInfo.type}&offset=0&id=${playlistInfo.id}`}
						className={styles.linkToPlaylist}
					>
						<h2>{playlistInfo.name}</h2>
					</Link>
					<p key={uid()} className={styles.playlistText}>
						Playlist
					</p>
					<p key={uid()} className={styles.playlistDescription}>
						{playlistInfo.description}
					</p>
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
								href={`/music-player/q?type=${playlistInfo.type}&offset=${index}&id=${playlistInfo.id}`}
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
										href={`/music-player/q?type=${playlistInfo.type}&offset=${index}&id=${playlistInfo.id}`}
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
				</main>
			</motion.div>
		</AnimatePresence>
	);
};

export default MusicPage;

export async function getServerSideProps(context) {
	const session = await getServerSession(
		context.req,
		context.res,
		NextAuthOptions
	);

	// if (!session) {
	// 	return { redirect: { destination: "/", permanent: false } };
	// }
	// if (session.user.provider !== "spotify") {
	// 	return { redirect: { destination: "/home", permanent: false } };
	// }

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
