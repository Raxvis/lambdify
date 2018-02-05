#!/usr/bin/env node

import chalk from 'chalk';
import commander from 'commander';
import lambdify from 'lambdify-core';

const pkg = require("./../package.json");
const feedback = (message) => {
	let log = message;

	if (log.indexOf('ERROR: ') > -1) {
		log = chalk.red.bold(log.replace('ERROR: ', ''));
	}
	if (log.indexOf('WARNING: ') > -1) {
		log = chalk.yellow.bold(log.replace('WARNING: ', ''));
	}
	if (log.indexOf('SUCCESS: ') > -1) {
		log = chalk.green.bold(log.replace('SUCCESS: ', ''));
	}

	console.log(`Lambdify CLI: ${log}`);
};

commander.version(pkg.version)
	.command('deploy <projectPath> [functionName]')
	.option('-s, --stage <stage>', 'Deployment Stage')
	.option('-v, --version <version>', 'Deployment Version')
	.option('-f, --functionsOnly', 'Deploy only Functions')
	.option('-e, --eventsOnly', 'Deploy only Events')
	.option('-r, --region <region>', 'AWS Region')
	.option('-p, --profile <profile>', 'AWS User Profile')
	.option('--lambda_description <Description>', 'Lambda Description')
	.option('--lambda_handler <Handler>', 'Lambda Handler')
	.option('--lambda_memory <MemorySize>', 'Lambda Memory')
	.option('--lambda_name <FunctionName>', 'Lambda Name')
	.option('--lambda_role <Role>', 'Lambda Role')
	.option('--lambda_runtime <Runtime>', 'Lambda Runtime')
	.option('--lambda_timeout <Timeout>', 'Lambda Timeout')
	.action((projectPath, functionName, options) => {
		options.feedback = feedback;
		lambdify.deploy(projectPath, functionName, options);
	});


if (!process.argv.slice(2).length) {
	commander.outputHelp((text) => chalk.red(text));
}

commander.parse(process.argv);