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
	.command('deploy <project>')
	.option('-f, --function <name>', 'Function Name')
	.option('-s, --stage <stage>', 'Deployment Stage', 'beta')
	.option('-n, --no_events', 'Deploy only Functions')
	.option('-p, --profile <profile>', 'AWS User Profile')
	.action((project, options) => {
		lambdify.deploy({
			function: options.function,
			functionsOnly: options.no_events,
			path: project,
			stage: options.stage
		}, feedback);
	});


if (!process.argv.slice(2).length) {
	commander.outputHelp((text) => chalk.red(text));
}

commander.parse(process.argv);