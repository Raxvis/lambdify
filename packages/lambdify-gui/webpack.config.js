const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'./src/babel-polyfill',
		'./src/index.js'
	],
	module: {
		loaders: [{
			loader: 'babel-loader?presets[]=react&presets[]=stage-2',
			test: /\.jsx?$/
		}, {
			include: /node_modules/,
			loader: 'json-loader',
			test: /\.json$/
		}]
	},
	output: { filename: './dist/bundle.js' },
	// plugins: [
	// 	new webpack.optimize.UglifyJsPlugin()
	// ],
	resolve: { alias: { utils: path.resolve('./src/utils/') } },
	target: 'electron-renderer',
	watch: true
};