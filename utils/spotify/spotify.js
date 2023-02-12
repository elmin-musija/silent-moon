const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const basicAuthentication = Buffer.from(`${clientId}:${clientSecret}`).toString(
	"base64"
);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_TRACKS_ENDPOINT =
	"https://api.spotify.com/v1/playlists/3pDOlfaY0lXRAW0iwNl7c7/tracks";
const PLAYLIST_INFO_ENDPOINT =
	"https://api.spotify.com/v1/playlists/3pDOlfaY0lXRAW0iwNl7c7";

const getAccessToken = async (refresh_token) => {
	const options = {
		method: "POST",
		headers: {
			Authorization: `Basic ${basicAuthentication}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
	};

	const response = await fetch(TOKEN_ENDPOINT, options);
	const accessToken = await response.json();
	return accessToken;
};

const getUsersPlaylists = async (refresh_token) => {
	const { access_token } = await getAccessToken(refresh_token);
	const response = await fetch(PLAYLISTS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	const playlist = await response.json();
	return playlist;
};

const getPlaylistTracks = async (refresh_token) => {
	const { access_token } = await getAccessToken(refresh_token);
	const response = await fetch(PLAYLIST_TRACKS_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	const playlistTracks = await response.json();
	return playlistTracks;
};

const getPlaylistInfo = async (refresh_token) => {
	const { access_token } = await getAccessToken(refresh_token);
	const response = await fetch(PLAYLIST_INFO_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});
	const playlistInfo = await response.json();
	return playlistInfo;
};

module.exports = {
	getAccessToken,
	getUsersPlaylists,
	getPlaylistTracks,
	getPlaylistInfo,
};
