#!/bin/bash

if [ "$1" = "" ]; then
	echo "Select a System to Build"
	exit
fi

if [ "$1" = "prod" ]; then
	cd packages/lambdify-gui/
	yarn
	cd ../../
	webpack --config packages/lambdify-gui/webpack.config.js --env.stage=prod

	cd packages/lambdify/
	yarn
	cd ../../
	gulp --gulpfile packages/lambdify/gulpfile.babel.js --env.stage=prod

	cd packages/lambdify-cli/
	yarn
	cd ../../
	gulp --gulpfile packages/lambdify-cli/gulpfile.babel.js --env.stage=prod

	cd packages/lambdify-core/
	yarn
	cd ../../
	gulp --gulpfile packages/lambdify-core/gulpfile.babel.js --env.stage=prod

	exit
fi

ENV="beta"

if [ "$2" != "" ]; then
	ENV="$2"
fi

SYSTEM="lambdify-$1"

cd packages/$SYSTEM/
yarn
cd ../../

if [ "$1" == "gui" ]; then
	webpack --config packages/$SYSTEM/webpack.config.js --env.stage=$ENV
else
	gulp --gulpfile packages/$SYSTEM/gulpfile.babel.js --env.stage=$ENV
fi
