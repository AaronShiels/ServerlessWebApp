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

	devtool: "inline-source-map",

	resolve: {
		extensions: [".ts", ".js"],
	},

	module: {
		rules: [{ test: /\.ts/, loader: "ts-loader" }],
	},
};

module.exports = config;
