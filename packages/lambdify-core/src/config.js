const defaultConfig = {
	Description: '',
	Environment: {},
	FunctionName: '',
	Handler: 'index.handle',
	MemorySize: 128,
	Role: '',
	Runtime: 'nodejs6.10',
	Timeout: 15,
	VpcConfig: {
		SecurityGroupIds: [],
		SubnetIds: []
	}
};

const buildLambdaFunctionName = (options) => {
	let { name } = options;

	name = options.version ? `${name}__${options.version}` : name;
	name = options.stage ? `${options.stage}_${name}` : name;
	name = options.project ? `${options.project}-${name}` : name;

	return name;
};

const config = (options) => {
	const lambdaConfig = Object.keys(options).reduce((result, key) => {
		if (key in defaultConfig) {
			return {
				...result,
				[key]: options[key]
			};
		}

		return result;
	}, defaultConfig);

	lambdaConfig.FunctionName = buildLambdaFunctionName(options);
	lambdaConfig.Environment.Variables = {
		...lambdaConfig.Environment.Variables,
		name: options.name,
		project: options.project,
		stage: options.stage,
		version: options.version
	};

	return lambdaConfig;
};

export default config;