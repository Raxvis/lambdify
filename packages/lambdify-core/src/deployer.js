import archiver from 'archiver';
import aws from './aws';
import config from './config';
import fs from 'fs';
import path from 'path';


const zipFolder = (functionPath, name, feedback) => {
	feedback(`Zipping function ${name} for uploading`);

	return new Promise((resolve, reject) => {
		const zipFile = path.join(functionPath, '../', `${name}.zip`);
		const output = fs.createWriteStream(zipFile);
		const archive = archiver('zip', { store: true });

		output.on('close', () => {
			resolve(zipFile);
		});

		archive.on('error', (error) => {
			reject(error);
		});

		archive.pipe(output);
		archive.directory(functionPath, '/');
		archive.finalize();
	});
};

const checkIfFunctionExists = async (FunctionName, lambda, feedback) => {
	try {
		await lambda.getFunction({ FunctionName }).promise();

		return true;
	} catch (error) {
		if (error.code !== 'ResourceNotFoundException') {
			feedback(`ERROR: ${error.message}`);
			throw error;
		}
	}

	return false;
};

const updateLambdaConfiguration = async (lambda, lambdaConfig, feedback) => {
	try {
		await lambda.updateFunctionConfiguration(lambdaConfig).promise();
	} catch (error) {
		feedback(`ERROR: ${error.message}`);
		throw error;
	}
	feedback(`SUCCESS: Updated configuration for ${lambdaConfig.FunctionName}`);
};

const updateLambdaFunction = async (lambda, lambdaConfig, zipPath, feedback) => { // eslint-disable-line max-params
	await updateLambdaConfiguration(lambda, lambdaConfig, feedback);
	const zippedCode = fs.readFileSync(zipPath);
	const params = {
		FunctionName: lambdaConfig.FunctionName,
		Publish: true,
		ZipFile: zippedCode
	};

	try {
		await lambda.updateFunctionCode(params).promise();
	} catch (error) {
		feedback(`ERROR: ${error.message}`);
		throw error;
	}
	feedback(`SUCCESS: Updated function ${lambdaConfig.FunctionName}`);
};

const createLambdaFunction = async (lambda, lambdaConfig, zipPath, feedback) => { // eslint-disable-line max-params
	const zippedCode = fs.readFileSync(zipPath);
	const params = {
		...lambdaConfig,
		Code: { ZipFile: zippedCode },
		Publish: true
	};

	try {
		await lambda.createFunction(params).promise();
		feedback(`SUCCESS: Created function ${lambdaConfig.FunctionName}`);
	} catch (error) {
		feedback(`ERROR: ${error.message}`);
		throw error;
	}
};

const deployer = async (functionPath, options) => {
	const lambda = aws.lambda(options);
	const lambdaConfig = config(options);
	const zipPath = await zipFolder(functionPath, lambdaConfig.FunctionName, options.feedback);
	const functionExists = await checkIfFunctionExists(lambdaConfig.FunctionName, lambda, options.feedback);

	if (functionExists) {
		await updateLambdaFunction(lambda, lambdaConfig, zipPath, options.feedback);
	} else {
		await createLambdaFunction(lambda, lambdaConfig, zipPath, options.feedback);
	}

	fs.unlinkSync(zipPath);
};

export default deployer;