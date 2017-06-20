import AWS from 'aws-sdk';

export class APIGEventDeployer {

	swagger = {
		info: { title: '' },
		paths: {},
		swagger: '2.0'
	};

	cors = {
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

	constructor (config, feedback) {
		this.config = config;
		this.feedback = feedback;
		this.setupAWS();
	}

	setupAWS () {
		if (this.config.get('profile')) {
			AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: this.config.get('profile') });
		}

		if (!this.config.get('region')) {
			this.feedback('WARNING: Defaulting to us-east-1 for region. Please define a region using --region or in your project.json file');
			this.config.set('region', 'us-east-1');
		}

		AWS.config.update({ region: this.config.get('region') });
		this.apig = new AWS.APIGateway({ apiVersion: '2015-07-09' });
	}


	async deploy (events) {
		this.getApigName();

		events.forEach((event) => {
			if (event && event.http) {
				this.addPath(event);
			}
		});

		await this.updateSwagger();
	}

	getApigName () {
		this.apigName = this.config.get('apig');

		if (typeof this.config.get('stage') !== 'undefined') {
			this.apigName += `-${this.config.get('stage')}`;
		}
		this.swagger.info.title = this.apigName;
	}

	addPath (event) {
		this.swagger.paths[event.http.path] = this.getMethod(event);

		if (event.http.cors) {
			this.swagger.paths[event.http.path].options = this.cors;
		}
	}

	getMethod (event) {
		const response = {
			reponses: {},
			'x-amazon-apigateway-integration': {
				credentials: this.config.get('role'),
				httpMethod: 'POST',
				passthroughBehavior: 'when_no_match',
				type: 'aws_proxy',
				uri: `arn:aws:apigateway:${this.config.get('region')}:lambda:path/2015-03-31/functions/${event.functionARN}/invocations`
			}
		};

		if (typeof event.http.parameters !== 'undefined') {
			response.parameters = [];
			for (let i = 0; i < event.http.parameters.length; i += 1) {
				response.parameters.push({
					in: "path",
					name: event.http.parameters[i],
					required: true,
					type: "string"
				});
			}
		}

		if (event.http.method === 'any') {
			return { 'x-amazon-apigateway-any-method': response };
		}

		return { [event.http.method]: response };
	}

	async updateSwagger () {
		this.apigID = await this.getApigID();

		await this.apig.putRestApi({
			body: JSON.stringify(this.swagger),
			failOnWarnings: true,
			mode: 'merge',
			restApiId: this.apigID
		}).promise();

		this.feedback(`Deploying APIGateway`);
		await this.apig.createDeployment({
			restApiId: this.apigID,
			stageName: this.config.get('stage')
		}).promise();
		this.feedback(`SUCCESS: Deployed APIGateway`);
	}

	async getApigID () {
		let apigs = await this.apig.getRestApis({ limit: 500 }).promise();

		apigs = apigs.items.filter((apig) => apig.name === this.apigName);

		if (apigs.length > 0) {
			return apigs[0].id;
		}

		this.feedback(`ERROR: Did not find a matching APIGateway.  Please create any APIGateway called ${this.apigName}`);
		throw new Error('Failed to find APIGateway');
	}


}

export default APIGEventDeployer;