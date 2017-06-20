import { APIGEventDeployer } from './events';
import AWS from 'aws-sdk';
import { FunctionConfig } from './../config';

const divider = (/^win/).test(process.platform) ? '\\' : '/';

export class EventDeployer {

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
		this.lambda = new AWS.Lambda({ apiVersion: '2015-03-31' });
	}

	async deployFunctionEvent () {
		let events = this.config.get('events');

		if (!events) {
			return;
		}

		const functionARN = await this.getFunctionARN(this.config);

		events = events.map((event) => {
			event.functionARN = functionARN;

			return event;
		});
		const httpEvents = events.filter((event) => event && event.http);

		if (httpEvents.length > 0) {
			const apigEventDeployer = new APIGEventDeployer(this.config, this.feedback);

			await apigEventDeployer.deploy(httpEvents);
		}
	}

	async deployAllEvents (functions) {
		let functionEvents = await Promise.all(functions.map(async (functionName) => {
			const functionPath = `${this.config.get('path')}${functionName}${divider}`;
			const functionConfig = new FunctionConfig(functionPath, functionName, this.config);

			let events = functionConfig.get('events');

			if (!events) {
				return undefined;
			}
			const functionARN = await this.getFunctionARN(functionConfig);

			events = events.map((event) => {
				event.functionARN = functionARN;

				return event;
			});

			return events;
		}));

		functionEvents = functionEvents.filter((event) => event);
		functionEvents = functionEvents.reduce((newEvents, events) => (newEvents.concat(events)), []);

		const httpEvents = functionEvents.filter((event) => event && event.http);

		if (httpEvents.length > 0) {
			const apigEventDeployer = new APIGEventDeployer(this.config, this.feedback);

			await apigEventDeployer.deploy(httpEvents);
		}
	}

	async getFunctionARN (functionConfig) {
		try {
			const lambdaFunction = await this.lambda.getFunction({ FunctionName: functionConfig.getLambdaName() }).promise();

			return lambdaFunction.Configuration.FunctionArn;
		} catch (error) {
			this.feedback(`ERROR: ${error.message}`);
			throw error;
		}
	}

}

export default EventDeployer;