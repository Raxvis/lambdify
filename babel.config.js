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
	const plugins = ['@babel/plugin-syntax-object-rest-spread'];

	return {
		plugins,
		presets,
	};
};
