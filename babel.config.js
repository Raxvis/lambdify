module.exports = (api) => {
	api.cache(false);

	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '8.10',
				},
			},
		],
	];
	const plugins = ['@babel/plugin-syntax-object-rest-spread', '@babel/plugin-transform-modules-commonjs'];

	return {
		plugins,
		presets,
	};
};
