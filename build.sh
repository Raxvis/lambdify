#!/bin/bash

if [ "$1" = "" ]; then
	echo "Select a System to Build"
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
