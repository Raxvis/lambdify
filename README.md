# lambdify

[![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/lambdify.svg)](https://greenkeeper.io/)

[![npm pack age](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/lambdify)

[![Version](https://badge.fury.io/js/lambdify.svg)](https://npmjs.org/package/lambidfy) [![Build Status](https://travis-ci.org/Prefinem/lambdify.svg)](https://travis-ci.org/Prefinem/lambdify)

[![Maintainability](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/maintainability)](https://codeclimate.com/github/Prefinem/lambdify/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/test_coverage)](https://codeclimate.com/github/Prefinem/lambdify/test_coverage)

![Weekly Downloads](https://img.shields.io/npm/dw/lambdify.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/lambdify.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/lambdify.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/lambdify.svg)

![Dependencies](https://david-dm.org/Prefinem/lambdify.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)

Lambdify is a set of tools that makes building and consuming AWS Lambda functions easier.

# NOTICE

These docs are awful.  If you are interested in using one of the library and need some help, please create an issue and I will work on the docs for that first.  Thanks

# Getting Started

**ES6 Imports**

```js
import { run } from 'lambdify';

const helloWorld = (request) => {
	return `Hello User, I see that you are coming from IP: ${request.ip}`;
};

exports.handler = (event, context) => run(event, context, helloWorld);
```

**Old School**

```js
const lambdify = require('lambdify');

function helloWorld (request) {
	return 'Hello User, I see that you are coming from IP: ' + request.ip;
}

exports.handler = (event, context) => lambdify.run(event, context, helloWorld);
```

# Installation

    npm i lambdify

or

    yarn add lambdify

# API Docs

## Lambidfy FN

```js
const fn = require('lambdify').fn;

fn.pipe();
```
* constant
* insert
* lens
* log
* pipe

## Lambidfy Runner

```js
const runner = require('lambdify').runner;

runner.request();
```
* binary
* html
* json
* payload
* redirect
* request
* response
* run
* xml

## Lambidfy Utils

```js
const utils = require('lambdify').utils;

utils.retry();
```
* retry
* retry3
* retryImmediately
* retryLineary
* utils
* withRetry

# Packages

Lambdify composes several packages which are documented below.  You can always install just the individual package yourself if you wish.

## Lambdify FN

Lambdify FN is a set of functional methods that are completely Async / Await.  Because they are Async / Await, I highly recommend that you use Lambdify Runner to ensure your lambda functions supports Async / Await (transpile with babel)

**Installation**
`npm install lambdify-fn`

### constant
```js
import { constant } from 'lambdify';
// If you only install this package, use the code below
// import { constant } from 'lambdify-fn';

const response = { foo: 'bar' };
const output = await constant((data) => {
	if (data.foo) {
		console.log('bar');
	}
})(response);

// console will log 'bar'
// output will equal response
```

### insert
### lens
### log
### pipe

## Lambidfy Runner

### binary
### html
### json
### payload
### redirect
### request
### response
### run
### xml

## Lambidfy Utils

### retry
### retry3
### retryImmediately
### retryLineary
### utils
### withRetry