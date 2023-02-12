import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import SpotifyProvider from "next-auth/providers/spotify";

export const NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID,
			clientSecret: process.env.DISCORD_CLIENT_SECRET,
		}),
		SpotifyProvider({
			/**
			 * authorization: Set the scope to read user email und private playlists
			 */
			authorization:
				"https://accounts.spotify.com/authorize?scope=streaming,user-read-email,user-read-private,user-read-playback-state,user-modify-playback-state,playlist-read-private,user-library-read,user-library-modify",
			clientId: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			/**
			 * The arguments user, account, profile and isNewUser are only passed the first time this
			 * callback is called on a new session, after the user signs in. In subsequent calls,
			 * only token will be available.
			 */
			if (account) {
				token.refresh_token = account.refresh_token;
			}
			return token;
		},
		async session(session, token) {
			session.user = session.token;
			return session;
		},
	},
	secret: process.env.NEXT_AUTH_SECRET,
	pages: { signIn: "/signin" },
};

export default NextAuth(NextAuthOptions);
