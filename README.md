# lambdify
[![npm package](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

[![version](https://badge.fury.io/js/lambdify.svg)](http://badge.fury.io/js/lambdify)
[![issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg)](https://github.com/Prefinem/lambdify/issues)
[![dependencies](https://david-dm.org/Prefinem/lambdify.svg)](https://david-dm.org/Prefinem/lambdify)
[![devDependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)](https://david-dm.org/Prefinem/lambdify#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/lambdify.svg)](https://www.npmjs.com/package/lambdify)

## Installation

    npm i -g lambdify

## Usage

Lambdify is a deployment system for Lambda on AWS.  It offers options to deploy using the CLI or within Node itself.

### CLI

    lfy deploy <projectPath>

#### Options

    -f, --function <name> (Function Name)
    -s, --stage <stage> (Deployment Stage)
    -n, --no_events (Deploy only Functions)
    -p, --profile <profile> (AWS User Profile)

### Node.js

    var lambdify = require('lambdify');

    lambdify.deploy({
            path: './projectFolder/',
            function: 'functionName',
            stage: 'beta',
            verbose: true
        },
        function(message){ console.log(message); },
        function(){ console.log('Done!'); }
    );

#### lambdify.deploy()

Parameters:
    options
        type: object
        description: options that are used for deployment (projectPath, stage, function, verbose)
    feedback
        type: function
        description: messages are passed to this function if defined
    callback
        type: function
        description: to handle async calls


## Project Setup

Each project needs a top level project.json that defines the name of the project, and any default variables.  Variables can also be overwritten the function.json file inside each function folder.  The basic structure of a project is described below.

project/
--project.json
--function/
----function.json

Variables that can be set inside the project.json or function.json.

    {
        "name": "",
        "description": "",
        "memory": 128,
        "timeout": 15,
        "region": "us-east-1",
        "role": "",
        "handler": "index.handler",
        "environment": {
            "key": "value"
        },
        "vpc": {
            "securityGroups": [
                "sg-00000000"
            ],
            "subnets":[
                "subnet-00000000"
            ]
        }
    }

Lambdify Defaults:

* Handler: index.handler
* MemorySize: 128
* Runtime: nodejs6.10
* Timeout: 15


## Events

Make sure your Lambda Role also has these permissions if you wish to allow HTTP Events through API Gateway

https://github.com/awslabs/aws-apigateway-importer/issues/9#issuecomment-129635827

Events will be inside the function.json file

### API Gateway / HTTP

Sample Event

    {
        "events": [
            {
                "http": {
                    "path": "/test",
                    "method": "any",
                    "cors": true
                }
            }
        ]
    }
