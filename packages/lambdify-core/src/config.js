import merge from 'lodash.merge';
import path from 'path';

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

const buildLambdaFunctionName = (functionPath, options) => {
	let [functionName] = functionPath.split(path.sep).pop().split('.');

	functionName = options.version ? `${functionName}__${options.version}` : functionName;
	functionName = options.stage ? `${options.stage}_${functionName}` : functionName;
	functionName = options.projectName ? `${options.projectName}-${functionName}` : functionName;

	return functionName;
};

const config = (functionPath, options) => {
	const merged = merge({}, defaultConfig, options);

	const lambdaConfig = Object.keys(defaultConfig).reduce((result, key) => ({
		...result,
		[key]: merged[key],
	}), {});

	lambdaConfig.FunctionName = lambdaConfig.FunctionName || buildLambdaFunctionName(functionPath, options);
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