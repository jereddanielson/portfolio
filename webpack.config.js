var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: ["./src/js/index.js"],
	output: {
		path: "./public",
		filename: "bundle-[hash].js"
	},
	module: {
		loaders: [
			{
				test: /\.(css|sass|scss)$/,
				loader: ExtractTextPlugin.extract("style", "css!sass")
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg)$/,
				loader: "url-loader"
			},
			{
				test: /\.(jpg|png)$/,
				loader: "file-loader"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(["public"]),
		new HtmlWebpackPlugin({
			template: "html-loader!./src/index.html"
		}),
		new ExtractTextPlugin("styles-[hash].css")		
	]
};