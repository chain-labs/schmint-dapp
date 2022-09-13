const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({
  webpack(config) {
    config.module.rules.push({
      test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: ["ik.imagekit.io"],
  },
});
