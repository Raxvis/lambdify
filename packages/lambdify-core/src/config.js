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
		SubnetIds: [],
	},
};

const buildLambdaFunctionName = (options) => {
	let { functionName } = options;

	functionName = options.version ? `${functionName}__${options.version}` : functionName;
	functionName = options.stage ? `${options.stage}_${functionName}` : functionName;
	functionName = options.projectName ? `${options.projectName}-${functionName}` : functionName;

	return functionName;
};

const config = (options) => {
	const lambdaConfig = Object.keys(options).reduce((result, key) => {
		if (key in defaultConfig) {
			return {
				...result,
				[key]: options[key],
			};
		}

		return result;
	}, defaultConfig);

	lambdaConfig.FunctionName = buildLambdaFunctionName(options);
	lambdaConfig.Environment.Variables = {
		...lambdaConfig.Environment.Variables,
		name: options.functionName,
		project: options.projectName,
		stage: options.stage,
		version: options.version,
	};

	return lambdaConfig;
};

export default config;