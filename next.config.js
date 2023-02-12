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
		],
	},
};
