import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "../api/auth/[...nextauth]";
import { uid } from "uid";
import {
	getUsersPlaylists,
	getPlaylistTracks,
	getPlaylistInfo,
} from "@/utils/spotify/spotify";
import { convertDurationTimeFormat } from "@/utils/convert/convert";

const MusicPage = ({ playlistInfo, playlistTracks }) => {
	const { items } = playlistTracks;

	return (
		<div>
			<h1>Sillent Moon</h1>
			<h2>{playlistInfo.name}</h2>
			<p key={uid()}>Playlist</p>
			<p key={uid()}>{playlistInfo.description}</p>
			{items.map((element) => (
				<div key={uid()}>
					<Link key={uid()} href={`/player/${element.track.id}`}>
						<Image
							src="/img/play_button.svg"
							width="40"
							height="40"
							alt="play icon"
						></Image>
					</Link>
					<div>
						<div key={uid()}>
							<Link key={uid()} href={`/player/${element.track.id}`}>
								{element.track.name}
							</Link>
							<p>{convertDurationTimeFormat(element.track.duration_ms)}</p>
						</div>
						<div key={uid()}>
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
	const playlistInfo = await getPlaylistInfo(session.user.refresh_token);
	const playlistTracks = await getPlaylistTracks(session.user.refresh_token);

	return { props: { playlistInfo, playlistTracks } };
}
