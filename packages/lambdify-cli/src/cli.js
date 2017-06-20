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
	.option('-F, --functions_only', 'Deploy only Functions')
	.option('-E, --events_only', 'Deploy only Events')
	.option('-p, --profile <profile>', 'AWS User Profile')
	.action((project, options) => {
		lambdify.deploy({
			eventsOnly: options.events_only,
			function: options.function,
			functionsOnly: options.functions_only,
			path: project,
			profile: options.profile,
			stage: options.stage
		}, feedback);
	});


if (!process.argv.slice(2).length) {
	commander.outputHelp((text) => chalk.red(text));
}

commander.parse(process.argv);