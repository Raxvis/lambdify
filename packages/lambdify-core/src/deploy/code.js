import AWS from 'aws-sdk';
import archiver from 'archiver';
import fs from 'fs';

export class CodeDeployer {
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

	async deploy () {
		this.feedback(`Deploying function ${this.config.get('name')}`);
		const zipPath = await this.zipFolder();
		const functionExists = await this.functionExists();

		this.zippedCode = fs.readFileSync(zipPath);

		if (functionExists) {
			await this.updateLambdaConfiguration();
			await this.updateLambdaFunction();
		} else {
			await this.createLambdaFunction();
		}

		fs.unlinkSync(zipPath);
	}

	zipFolder () {
		this.feedback(`Zipping function ${this.config.get('name')} for uploading`);
		const path = this.config.get('path');
		const name = this.config.getLambdaName();

		return new Promise((resolve, reject) => {
			const output = fs.createWriteStream(`${path}../${name}.zip`);
			const archive = archiver('zip', { store: true });

			output.on('close', () => {
				resolve(`${path}../${name}.zip`);
			});

			archive.on('error', (error) => {
				reject(error);
			});

			archive.pipe(output);
			archive.directory(path, '/');
			archive.finalize();
		});
	}

	async functionExists () {
		try {
			await this.lambda.getFunction({ FunctionName: this.config.getLambdaName() }).promise();

			return true;
		} catch (error) {
			if (error.code !== 'ResourceNotFoundException') {
				this.feedback(`ERROR: ${error.message}`);
				console.log(error);
				throw error;
			}
		}

		return false;
	}

	async createLambdaFunction () {
		const config = this.config.getLambdaConfig();
		const params = {
			...config,
			Code: { ZipFile: this.zippedCode },
			Publish: true
		};

		try {
			await this.lambda.createFunction(params).promise();
		} catch (error) {
			this.feedback(`ERROR: ${error.message}`);
			if (this.options.verbose) {
				console.log(error);
			}
		}
		this.feedback(`SUCCESS: Created function ${this.config.getLambdaName()}`);
	}

	async updateLambdaConfiguration () {
		try {
			await this.lambda.updateFunctionConfiguration(this.config.getLambdaConfig()).promise();
		} catch (error) {
			this.feedback(`ERROR: ${error.message}`);
			if (this.options.verbose) {
				console.log(error);
			}
		}
		this.feedback(`SUCCESS: Updated configuration for ${this.config.getLambdaName()}`);
	}

	async updateLambdaFunction () {
		const params = {
			FunctionName: this.config.getLambdaName(),
			Publish: true,
			ZipFile: this.zippedCode
		};

		try {
			await this.lambda.updateFunctionCode(params).promise();
		} catch (error) {
			this.feedback(`ERROR: ${error.message}`);
			if (this.options.verbose) {
				console.log(error);
			}
		}
		this.feedback(`SUCCESS: Updated function ${this.config.getLambdaName()}`);
	}
}

export default CodeDeployer;