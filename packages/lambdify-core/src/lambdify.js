import 'babel-polyfill';
import { CodeDeployer, EventDeployer } from './deploy';
import { FunctionConfig, ProjectConfig } from './config';
import fs from 'fs';
import glob from 'glob';

const divider = (/^win/).test(process.platform) ? '\\' : '/';

export class Lambdify {

	constructor (options, feedback) {
		this.options = typeof options === 'object' && !Array.isArray(options) ? options : {};
		this.feedback = typeof feedback === 'undefined' ? this.internalFeedback : feedback;
		this.getProjectPath();

		this.feedback('Lambdify Starting up');
		this.loadProject();
		this.projectWarnings();
	}

	getProjectPath () {
		this.projectPath = this.options.path.replace(/\\/g, divider).replace(/\//g, divider);
		this.projectPath += this.projectPath.substr(this.projectPath.length - 1) === divider ? '' : divider;
		this.options.path = this.projectPath;
	}

	internalFeedback (message) {
		this.logs = this.logs || '';
		this.logs += `${message}\n`;
	}

	loadProject () {
		if (!fs.existsSync(this.projectPath)) {
			this.feedback(`ERROR: No project folder exists.  Tried: ${this.projectPath}`);
			throw new Error(`No project folder exists.  Tried: ${this.projectPath}`);
		}

		this.projectConfig = new ProjectConfig(this.projectPath);
		this.projectConfig.override(this.options);
	}

	projectWarnings () {
		if (typeof this.projectConfig.get('stage') === 'undefined') {
			this.feedback('WARNING: No stage defined');
		}
	}

	async run () {
		if (this.options.function) {
			this.functionPath = `${this.projectConfig.get('path')}${this.options.function}${divider}`;
			if (fs.existsSync(this.functionPath)) {
				this.feedback(`Deploying function: ${this.options.function}`);
				await this.deployFunction(this.options.function);
			} else {
				this.feedback(`ERROR: This function '${this.options.function}'' does not exist as path: ${this.functionPath}`);
			}
		} else {
			this.feedback(`Deploying all functions for project: ${this.projectConfig.get('path')}`);
			await this.deployProject();
		}
		this.feedback(`Finished Deployment`);
	}

	async deployFunction (functionName) {
		const functionPath = `${this.projectConfig.get('path')}${functionName}${divider}`;
		const functionConfig = new FunctionConfig(functionPath, functionName, this.projectConfig);

		if (!this.options.eventsOnly) {
			const codeDeployer = new CodeDeployer(functionConfig, this.feedback);

			await codeDeployer.deploy();
		}
		if (!this.options.functionsOnly) {
			const eventDeployer = new EventDeployer(functionConfig, this.feedback);

			await eventDeployer.deployFunctionEvent();
		}
	}

	async deployProject () {
		let functions = [];

		try {
			functions = await this.getFunctions();
		} catch (error) {
			this.feedback(`ERROR: Failed to load functions in path ${this.projectConfig.get('path')}`);
		}

		functions = functions.map((func) => func.replace(this.projectConfig.get('path'), '').replace(divider, ''));

		this.options.functionsOnly = true;

		await Promise.all(functions.map(async (functionName) => {
			await this.deployFunction(functionName);
		}));

		const eventDeployer = new EventDeployer(this.projectConfig, this.feedback);

		await eventDeployer.deployAllEvents(functions);
	}

	getFunctions () {
		return new Promise((resolve, reject) => {
			glob(`${this.projectConfig.get('path')}*${divider}`, (error, functions) => {
				if (error) {
					reject(error);
				}
				resolve(functions);
			});
		});
	}

}

export default Lambdify;