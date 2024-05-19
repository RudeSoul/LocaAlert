module.exports = function (api) {
	api.cache(true);
	return {
		presets: ['babel-preset-expo'],
		plugins: [
			['nativewind/babel'],
			[
				'module-resolver',
				{
					alias: {
						'@Components': './src/components',
						'@Pages': './src/pages',
						'@Assets': './assets',
						'@Icons': './assets/icons'
					},
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				}
			]
		]
	};
};
