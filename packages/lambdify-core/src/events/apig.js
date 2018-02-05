import aws from './../aws';
import config from './../config';
import path from 'path';
import utils from './../utils';

const emptySwagger = {
	info: { title: '' },
	paths: {},
	swagger: '2.0',
};

const cors = {
	'consumes': ['application/json'],
	'produces': ['application/json'],
	'responses': {
		'200': {
			'description': '200 response',
			'headers': {
				'Access-Control-Allow-Credentials': { 'type': 'string' },
				'Access-Control-Allow-Headers': { 'type': 'string' },
				'Access-Control-Allow-Methods': { 'type': 'string' },
				'Access-Control-Allow-Origin': { 'type': 'string' },
			},
		},
	},
	'x-amazon-apigateway-integration': {
		'passthroughBehavior': 'when_no_match',
		'requestTemplates': { 'application/json': '{statusCode:200}' },
		'responses': {
			'default': {
				'responseParameters': {
					'method.response.header.Access-Control-Allow-Credentials': "'false'",
					'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
					'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE,HEAD'",
					'method.response.header.Access-Control-Allow-Origin': "'*'",
				},
				'statusCode': '200',
			},
		},
		'type': 'mock',
	},
};

const getFunctionARN = async (options, functionPath) => {
	const lambda = aws.lambda(options);
	const lambdaConfig = config(utils.getFunctionOptions(functionPath, options));
	const lambdaFunction = await lambda.getFunction({ FunctionName: lambdaConfig.FunctionName }).promise();

	return lambdaFunction.Configuration.FunctionArn;
};

const getApigName = (options, projectPath) => {
	const { apig, stage } = {
		...utils.loadJSONFile(path.join(projectPath, 'project.json')),
		...options,
	};
	const apigName = apig ? apig : projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop();

	return stage ? `${apigName}-${stage}` : apigName;
};

const buildSwaggerPath = (http, options, FunctionArn) => {
	const response = {
		reponses: {},
		'x-amazon-apigateway-integration': {
			credentials: options.Role,
			httpMethod: 'POST',
			passthroughBehavior: 'when_no_match',
			type: 'aws_proxy',
			uri: `arn:aws:apigateway:${options.region}:lambda:path/2015-03-31/functions/${FunctionArn}/invocations`,
		},
	};

	if (http.parameters) {
		response.parameters = http.parameters.map((parameter) => ({
			in: "path",
			name: parameter,
			required: true,
			type: "string",
		}));
	}

	return {
		options: http.cors ? cors : undefined,
		[http.method === 'any' ? 'x-amazon-apigateway-any-method' : http.method]: response,
	};
};

const getApigID = async (apigName, apig) => {
	const apigs = await apig.getRestApis({ limit: 500 }).promise();
	const apigIDs = apigs.items.filter((apig) => apig.name === apigName).map((apig) => apig.id);

	if (apigIDs.length > 0) {
		return apigIDs.pop();
	}

	const response = await apig.createRestApi({ name: apigName }).promise();

	return response.id;
};

const updateAPIG = async (apigName, swagger, options) => {
	const apig = aws.apig(options);
	const apigID = await getApigID(apigName, apig);

	await apig.putRestApi({
		body: JSON.stringify(swagger),
		failOnWarnings: true,
		mode: 'merge',
		restApiId: apigID,
	}).promise();

	options.feedback(`Deploying APIGateway`);
	await apig.createDeployment({
		restApiId: apigID,
		stageName: options.stage || options.project,
	}).promise();
	options.feedback(`SUCCESS: Deployed APIGateway`);
};

export const deployFunction = async (functionPath, httpEvents, options) => {
	const apigName = getApigName(options, path.join(functionPath, '..'));
	const FunctionArn = await getFunctionARN(options, functionPath);
	const swagger = {
		...emptySwagger,
		info: { title: apigName },
		paths: httpEvents.reduce((result, { http }) => ({
			...result,
			[http.path]: buildSwaggerPath(http, options, FunctionArn),
		}), {}),
	};

	await updateAPIG(apigName, swagger, options);
};

export const deployProject = async (projectPath, httpEvents, options) => {
	const apigName = getApigName(options, projectPath);
	const arns = {};
	const functionEvents = await Promise.all(httpEvents.map(async (event) => ({
		...event,
		FunctionArn: arns[event.functionPath] ? arns[event.functionPath] : await getFunctionARN(options, event.functionPath),
		options: utils.getFunctionOptions(event.functionPath, options),
	})));
	const swagger = {
		...emptySwagger,
		info: { title: apigName },
		paths: functionEvents.reduce((result, { FunctionArn, http, options }) => ({
			...result,
			[http.path]: buildSwaggerPath(http, options, FunctionArn),
		}), {}),
	};

	await updateAPIG(apigName, swagger, utils.getProjectOptions(projectPath, options));
};

export default {
	deployFunction,
	deployProject,
};