const isProd = process.env.NODE_ENV === "production";

module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	images: {
		domains: ['ik.imagekit.io'],
		"loader": "akamai",
		"path": "",
	},
	assetPrefix: isProd ? "https://your-domain.com" : "",
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: '/api/projects',
				destination: 'https://chain-labs.github.io/schmint-projects/projects.json',
			},
		];
	},
};
