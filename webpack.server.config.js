const path = require("path");
const slsw = require("serverless-webpack");

const config = {
	entry: slsw.lib.entries,
	target: "node",
	output: {
		libraryTarget: "commonjs",
		path: path.resolve(__dirname, "dist/server/"),
		filename: "[name].js",
	},

	devtool: "source-map",

	resolve: {
		extensions: [".ts", ".js"],
	},

	module: {
		rules: [{ test: /\.ts/, loader: "ts-loader" }, { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }],
	},
};

module.exports = config;
