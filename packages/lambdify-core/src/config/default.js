import 'babel-polyfill';
import LambdaConfig from './lambda';
import _ from 'lodash';
import fs from 'fs';

export class DefaultConfig extends LambdaConfig {
	constructor () {
		super();

		this.config = {};
	}

	loadConfigJSON (file) {
		let config = {};

		if (fs.existsSync(file)) {
			try {
				config = JSON.parse(fs.readFileSync(file).toString());

				if (typeof config !== 'object' || Array.isArray(config)) {
					throw new Error(`ERROR: ${file} file is not valid`);
				}
			} catch (error) {
				throw new Error(`ERROR: ${file} file is not valid`);
			}
		}

		return config;
	}

	override (overrides) {
		_.merge(this.config, overrides);
		this.overrideLambdaConfig(this.config);
	}

	get (key) {
		return this.config[key];
	}

	set (key, value) {
		this.config[key] = value;
	}

	getConfig () {
		return this.config;
	}
}

export default DefaultConfig;