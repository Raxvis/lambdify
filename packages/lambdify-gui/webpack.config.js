const argv = require('minimist')(process.argv.slice(2));
const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: [
		'./packages/lambdify-gui/src/babel-polyfill',
		'./packages/lambdify-gui/src/index.js'
	],
	module: {
		loaders: [
			{
				loader: 'babel-loader?presets[]=react&presets[]=stage-2',
				test: /\.jsx?$/
			},
			{
				include: /node_modules/,
				loader: 'json-loader',
				test: /\.json$/
			}
		]
	},
	output: { filename: './packages/lambdify-gui/dist/bundle.js' },
	plugins: [argv.env.stage === 'prod' ? new webpack.optimize.UglifyJsPlugin() : undefined],
	resolve: { alias: { utils: path.resolve('./packages/lambdify-gui/src/utils/') } },
	target: 'electron-renderer',
	watch: true
};