import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ type, offset, id, token }) => {
	return (
		<SpotifyPlayer
			name="Silent Moon Player"
			token={token}
			uris={[`spotify:${type}:${id}`]}
			play={true}
			showSaveIcon={true}
			autoPlay={true}
			offset={offset}
			styles={{
				bgColor: "transparent",
			}}
		/>
	);
};

export default Player;
