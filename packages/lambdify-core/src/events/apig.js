import aws from './../aws';
import config from './../config';
import cors from './cors';
import fs from 'fs';
import merge from 'lodash.merge';
import path from 'path';
import utils from './../utils';


const formatEvents = (files) => (
	files.map((file) => {
		const listOfEvents = JSON.parse(fs.readFileSync(file).toString());
		const folders = file.split(path.sep);

		folders.pop();

		return {
			functionPath: folders.join(path.sep),
			listOfEvents,
		};
	}).reduce((result, { listOfEvents, functionPath }) => {
		listOfEvents.forEach((event) => {
			if (event.http) {
				result.push({
					...event.http,
					functionPath,
				});
			}
		});

		return result;
	}, [])
);

const buildSwagger = ({ apigName }, paths) => ({
	definitions: {
		Empty: {
			title: 'Empty Schema',
			type: 'object',
		},
	},
	info: { title: apigName },
	paths: { ...paths },
	swagger: '2.0',
});

const getFunctionARN = async (functionPath, options) => {
	const projectOptions = utils.loadJSONFile(path.join(functionPath, '..', 'project.json'));
	const functionOptions = utils.loadJSONFile(path.join(functionPath, 'function.json'));
	const lambda = aws.lambda(options);
	const combinedOptions = merge({}, options, projectOptions, functionOptions);
	const lambdaConfig = config(combinedOptions);
	const lambdaFunction = await lambda.getFunction({ FunctionName: lambdaConfig.FunctionName }).promise();

	return lambdaFunction.Configuration.FunctionArn;
};

const buildSwaggerPath = (event, functionArn, options) => {
	const response = {
		responses: {},
		'x-amazon-apigateway-integration': {
			credentials: options.role,
			httpMethod: 'POST',
			passthroughBehavior: 'when_no_match',
			type: 'aws_proxy',
			uri: `arn:aws:apigateway:${options.region}:lambda:path/2015-03-31/functions/${functionArn}/invocations`,
		},
	};

	if (event.parameters) {
		response.parameters = event.parameters.map((parameter) => ({
			in: "path",
			name: parameter,
			required: true,
			type: "string",
		}));
	}

	return {
		options: event.cors ? cors : undefined,
		[event.method === 'any' ? 'x-amazon-apigateway-any-method' : event.method]: response,
	};
};

const buildSwaggerEvents = (swagger, events, arns, options) => ( // eslint-disable-line max-params
	events.reduce((result, event) => {
		if (result.paths[event.path]) {
			throw new Error(`Duplicate path: ${event.path}`);
		} else {
			result.paths[event.path] = buildSwaggerPath(event, arns[event.functionPath], options);
		}

		return result;
	}, swagger)
);

const getApigID = async (apigName, apig) => {
	const apigs = await apig.getRestApis({ limit: 500 }).promise();
	const apigIDs = apigs.items.filter((apigRecord) => apigRecord.name === apigName).map((apigRecord) => apigRecord.id);

	if (apigIDs.length > 0) {
		return apigIDs.pop();
	}

	const response = await apig.createRestApi({ name: apigName }).promise();

	return response.id;
};

const updateAPIG = async (swagger, options) => {
	const apig = aws.apig(options);
	const apigID = await getApigID(options.apigName, apig);

	await apig.putRestApi({
		body: JSON.stringify(swagger),
		failOnWarnings: true,
		mode: 'merge',
		restApiId: apigID,
	}).promise();

	await apig.createDeployment({
		restApiId: apigID,
		stageName: options.stage,
	}).promise();

	console.log(`APIGatewayID: ${apigID}`);
};

const apigDeploy = async (projectPath, options, files) => {
	const events = formatEvents(files);
	const functionPaths = events.reduce((result, event) => ({
		...result,
		[event.functionPath]: true,
	}), {});
	const arns = await Promise.all(Object.keys(functionPaths).map((functionPath) => getFunctionARN(functionPath, options)));
	const swagger = buildSwagger(options);
	const swaggerEvents = buildSwaggerEvents(swagger, events, arns, options);

	await updateAPIG(swaggerEvents, options);
};

export default apigDeploy;