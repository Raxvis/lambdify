import 'babel-polyfill';

export class LambdaConfig {
	configMapping = {
		description: 'Description',
		environment: 'Environment',
		handler: 'Handler',
		lambdaName: 'FunctionName',
		memory: 'MemorySize',
		role: 'Role',
		runtime: 'Runtime',
		timeout: 'Timeout',
		vpc: 'VpcConfig'
		// tracing: 'TracingConfig'
	}

	lambdaConfig = {
		Description: '',
		Environment: {},
		FunctionName: '',
		Handler: 'index.handler',
		MemorySize: 128,
		Role: '',
		Runtime: 'nodejs6.10',
		Timeout: 15,
		// TracingConfig: 'PassThrough',
		VpcConfig: {
			SecurityGroupIds: [],
			SubnetIds: []
		}
	}

	setLambdaParam (name, value) {
		const key = this.getLambdaKey(name);

		if (!key) {
			return;
		}

		if (key.toLowerCase() === 'environment') {
			this.lambdaConfig[key] = { Variables: value };
		} else if (name.toLowerCase() === 'vpc') {
			this.lambdaConfig[key] = this.createVPC(value);
		} else {
			this.lambdaConfig[key] = value;
		}
	}

	getLambdaKey (name) {
		let key;

		if (typeof this.lambdaConfig[name] !== 'undefined') {
			key = name;
		}
		if (this.configMapping[name.toLowerCase()]) {
			key = this.configMapping[name.toLowerCase()];
		}

		return key;
	}

	getLambdaConfig () {
		return this.lambdaConfig;
	}

	overrideLambdaConfig (overrides) {
		Object.keys(overrides).forEach((key) => {
			this.setLambdaParam(key, overrides[key]);
		});
	}

	createVPC (vpc) {
		const temp = {};

		if (vpc.securityGroups) {
			temp.SecurityGroupIds = vpc.securityGroups;
		}
		if (vpc.subnets) {
			temp.SubnetIds = vpc.subnets;
		}

		return temp;
	}
}


export default LambdaConfig;