# lambdify
[![npm package](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

[![version](https://badge.fury.io/js/lambdify.svg)](http://badge.fury.io/js/lambdify)
[![issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg)](https://github.com/Prefinem/lambdify/issues)
[![dependencies](https://david-dm.org/Prefinem/lambdify.svg)](https://david-dm.org/Prefinem/lambdify)
[![devDependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)](https://david-dm.org/Prefinem/lambdify#info=devDependencies)
[![downloads](http://img.shields.io/npm/dm/lambdify.svg)](https://www.npmjs.com/package/lambdify)

Lambdify is a deployment system for Lambda on AWS that also managers API Gateway deployements of AWS Lambda functions.

### Why not Serverless

Serverless, because of it's use of Cloud Formation templates, has a hard resource limit that after 20 functions or so, won't allow any more functions.

## Installation

    npm i -g lambdify

## Notes

These are notes that are kept to explain certain parts of lambdify not explained elsewhere in the readme.

Configuration of a function (which is what eventually gets deployed) is a cascade of the defaults, project.json, function.json and the options passed into the deployment call.  That means that settings in project.json will override defaults and settings in function.json will overrride both project.json settings and defaults.

## Usage

Lambdify is a deployment system for Lambda on AWS.  It offers options to deploy using the CLI or within Node itself.

### CLI

    lfy deploy <projectPath> [functionName]

#### Options

    -s, --stage <stage> (Deployment Stage)
    -v, --version <version> (Deployment Version)
    -f, --functionsOnly (Deploy only Functions)
    -e, --eventsOnly (Deploy only Events)
    -r, --region <region> (AWS Region)
    -p, --profile <profile> (AWS User Profile)
    --lambda_description <Description> (Lambda Description)
    --lambda_handler <Handler> (Lambda Handler)
    --lambda_memory <MemorySize> (Lambda Memory)
    --lambda_name <FunctionName> (Lambda Name)
    --lambda_role <Role> (Lambda Role)
    --lambda_runtime <Runtime> (Lambda Runtime)
    --lambda_timeout <Timeout> (Lambda Timeout)

### Node.js

    var lambdify = require('lambdify');

    lambdify.deploy(projectPath, functionName, options, callback);

#### lambdify.deploy()

Parameters:
    projectPath
        type: string
        description: path (absolute) to project folder
    functionName
        type: string
        description: function name to deploy (folder name)
    options
        type: object
        description: options that are used for deployment
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
        "stage": "<stage for deplying independant stages with similar code>",
        "version": "<version for splitting functions>",
        "functionsOnly": "<deploy only the functions>",
        "eventsOnly": "<deploy only the events>",
        "region": "<aws region>",
        "profile": "<aws credentials profile>",
        "Description": "",
        "Environment": {},
        "FunctionName": "",
        "Handler": "index.handle",
        "MemorySize": 128,
        "Role": "",
        "Runtime": "nodejs6.10",
        "Timeout": 15,
        "VpcConfig": {
            "SecurityGroupIds": [],
            "SubnetIds": []
        }
        "APIGateway": "<API Gateway Name - will append stage if stage is present>"
    }

Lambdify Defaults:

* Handler: index.handler
* MemorySize: 128
* Runtime: nodejs6.10
* Timeout: 15


## Events

Make sure your Lambda Role also has these permissions if you wish to allow HTTP Events through API Gateway

https://github.com/awslabs/aws-apigateway-importer/issues/9#issuecomment-129635827

Also ensure that your Lambda Role has a minimum trust relationship of

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": {
                    "Service": [
                        "apigateway.amazonaws.com",
                        "lambda.amazonaws.com"
                    ]
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }

Events will be inside an events.json file

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
