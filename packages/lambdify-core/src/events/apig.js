import aws from './../aws';
import config from './../config';
import path from 'path';

const emptySwagger = {
	info: { title: '' },
	paths: {},
	swagger: '2.0'
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
				'Access-Control-Allow-Origin': { 'type': 'string' }
			}
		}
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
					'method.response.header.Access-Control-Allow-Origin': "'*'"
				},
				'statusCode': '200'
			}
		},
		'type': 'mock'
	}
};

const getApigName = (options) => {
	let { apig } = options;

	apig = apig ? apig : options.project;
	apig = options.stage ? `${apig}-${options.stage}` : apig;

	return apig;
};

const buildSwaggerPath = (event, options, FunctionArn) => {
	const response = {
		reponses: {},
		'x-amazon-apigateway-integration': {
			credentials: options.Role,
			httpMethod: 'POST',
			passthroughBehavior: 'when_no_match',
			type: 'aws_proxy',
			uri: `arn:aws:apigateway:${options.region}:lambda:path/2015-03-31/functions/${FunctionArn}/invocations`
		}
	};

	if (event.parameters) {
		response.parameters = event.parameters.map((parameter) => ({
			in: "path",
			name: parameter,
			required: true,
			type: "string"
		}));
	}

	return {
		options: event.cors ? cors : undefined,
		[event.method === 'any' ? 'x-amazon-apigateway-any-method' : event.method]: response
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
		restApiId: apigID
	}).promise();

	options.feedback(`Deploying APIGateway`);
	await apig.createDeployment({
		restApiId: apigID,
		stageName: options.stage || options.project
	}).promise();
	options.feedback(`SUCCESS: Deployed APIGateway`);
};

const getFunctionARN = async (options, functionPath) => {
	const lambda = aws.lambda(options);
	const projectPath = path.join(functionPath, '../');
	const lambdaConfig = config({
		...options,
		name: functionPath.split(path.sep).filter((folder) => Boolean(folder)).pop(),
		project: projectPath.split(path.sep).filter((folder) => Boolean(folder)).pop()
	});
	const lambdaFunction = await lambda.getFunction({ FunctionName: lambdaConfig.FunctionName }).promise();

	return lambdaFunction.Configuration.FunctionArn;
};

export const deployFunction = async (options, functionPath, httpEvents) => {
	const FunctionArn = await getFunctionARN(options, functionPath);
	const apigName = getApigName(options);
	const swagger = {
		...emptySwagger,
		info: { title: apigName }
	};

	swagger.paths = httpEvents.reduce((result, event) => ({
		...result,
		[event.path]: buildSwaggerPath(event, options, FunctionArn)
	}), {});

	await updateAPIG(apigName, swagger, options);
};

export const deployProject = async (options, functions) => {
	const apigName = getApigName(options);
	const swagger = {
		...emptySwagger,
		info: { title: apigName }
	};
	const functionEvents = await Promise.all(functions.map(async (event) => {
		const FunctionArn = await getFunctionARN(options, event.functionPath);

		return {
			...event,
			FunctionArn
		};
	}));

	swagger.paths = functionEvents.reduce((result, { FunctionArn, events }) => (
		events.reduce((currentResult, event) => ({
			...currentResult,
			[event.path]: buildSwaggerPath(event, options, FunctionArn)
		}), result)
	), {});

	await updateAPIG(apigName, swagger, options);
};

export default {
	deployFunction,
	deployProject
};