#!/usr/bin/env node

const path = require('path');
const lambdify = require('./../packages/lambdify-core/src/index.js');

/*
	OPTIONS

	deployEvents: boolean
	functionsOnly: boolean
	eventsOnly: boolean
	region: string
	stage: string
	version: string
*/

lambdify.deploy(path.join(__dirname, 'project'), { profile: 'william' });