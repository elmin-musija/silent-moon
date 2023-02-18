/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

module.exports = nextConfig;

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "mosaic.scdn.co",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "plus.unsplash.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "**",
			},
			{
				protocol: "https",
				hostname: "cdn.discordapp.com",
				port: "",
				pathname: "**",
			},
		],
	},
};
