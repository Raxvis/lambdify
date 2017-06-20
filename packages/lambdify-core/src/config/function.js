import 'babel-polyfill';
import DefaultConfig from './default';
import get from 'lodash/get';
import merge from 'lodash/merge';

export class FunctionConfig extends DefaultConfig {
	constructor (folder, name, projectConfig) {
		super();

		this.config = this.loadConfigJSON(`${folder}function.json`);
		this.config.path = folder;
		this.config.name = this.config.name ? this.config.name : name;
		this.overrideLambdaConfig(this.config);
		this.setProjectConfig(projectConfig);
	}

	setProjectConfig (projectConfig) {
		this.projectConfig = projectConfig;
		const newConfig = projectConfig.getConfig();

		this.config = merge({ ...newConfig }, this.config);
		this.setDefaultEnvironment();
		this.overrideLambdaConfig(this.config);
		this.setLambdaParam('FunctionName', this.getLambdaName());
	}

	getLambdaName () {
		let lambdaName = this.projectConfig.get('name');

		if (this.config.stage) {
			lambdaName += `-${this.config.stage}`;
		}

		lambdaName += `_${this.config.name}`;

		return lambdaName;
	}

	setDefaultEnvironment () {
		this.config.environment = {
			...get(this.config, 'environment', {}),
			function: this.config.name,
			name: this.getLambdaName(),
			project: this.projectConfig.get('name'),
			stage: get(this.config, 'stage', '')
		};
	}
}


export default FunctionConfig;