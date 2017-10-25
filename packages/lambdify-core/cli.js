#!/usr/bin/env node

const lambdify = require('./index.js');

/*
	OPTIONS

	deployEvents: boolean
	functionsOnly: boolean
	eventsOnly: boolean
	region: string
	stage: string
	version: string
*/

lambdify.deploy('/Users/william/Dropbox/Work/lambdify/tests/project');