import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { uid } from "uid";
import { convertDurationTimeFormat } from "@/src/services/utils/convert/convert";
import styles from "./player.module.css";

const Player = ({ type, offset, id, token }) => {
	const [trackName, setTrackName] = useState("");
	const [trackDuration, setTrackDuration] = useState("test");
	const [artists, setArtists] = useState([]);

	return (
		<div className={styles.player}>
			<div className={styles.trackInfoContainer}>
				<h1>{trackName}</h1>
				<div className={styles.artistsContainer}>
					{artists.map((artist) => (
						<p key={uid()}>{artist.name}</p>
					))}
				</div>
				<p className={styles.duration}>
					{convertDurationTimeFormat(trackDuration)} min
				</p>
			</div>

			<div className={styles.spotifyPlayer}>
				<SpotifyPlayer
					name="Silent Moon Player"
					token={token}
					uris={[`spotify:${type}:${id}`]}
					play={true}
					showSaveIcon={true}
					autoPlay={true}
					offset={offset}
					styles={{
						bgColor: "#00000000",
						sliderColor: "#e28f83",
						sliderHandleColor: "#4a503d",
						loaderColor: "#e28f83",
						color: "#4a503d",
						activeColor: "#e28f83",
						trackArtistColor: "#4a503d",
						trackNameColor: "#4a503d",
						height: "220",
					}}
					callback={(state) => {
						setTrackName(state.track.name);
						setArtists(state.track.artists);
						setTrackDuration(state.track.durationMs);
					}}
				/>
			</div>
		</div>
	);
};

export default Player;
