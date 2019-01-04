# lambdify

[![npm pack age](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/lambdify)

[![Version](https://badge.fury.io/js/lambdify.svg)](https://npmjs.org/package/lambdify) [![Build Status](https://travis-ci.org/Prefinem/lambdify.svg)](https://travis-ci.org/Prefinem/lambdify)

[![Maintainability](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/maintainability)](https://codeclimate.com/github/Prefinem/lambdify/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/test_coverage)](https://codeclimate.com/github/Prefinem/lambdify/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/lambdify.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/lambdify.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/lambdify.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/lambdify.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/lambdify.svg)

![Dependencies](https://david-dm.org/Prefinem/lambdify.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)

Lambdify is a set of tools that makes building and consuming AWS Lambda functions easier.

# NOTICE

**Master branch is v4 in progress. v4 will be dropping lambdify-fn and lambdify-utils and moving to a single package.**

If you used methods from lambdify-fn, you can use [afpf](https://github.com/Prefinem/afpf) instead

**_WARNING: Version >= 3.0.0 is for Node 8.10 or greater_**

These docs are awful. If you are interested in using one of the library and need some help, please create an issue and I will work on the docs for that first. Thanks

# THESE ARE v4 DOCS. Please see [branch v3](https://github.com/Prefinem/lambdify/tree/v3) for v3 Docs

# Getting Started

Lambdify Standard JSON Payload Response:

```js
const lambdify = require('lambdify');
const { json, request } = require('lambdify/middleware');

function helloWorld(request) {
	return { message: `Hello User, I see that you are coming from IP: ${request.ip}` };
}

exports.handler = lambdify(helloWorld, [request(), json()]);
```

HTML Response:

```js
const lambdify = require('lambdify');
const { html, request } = require('lambdify/middleware');

function helloWorld(request, response) {
	response.html(`Hello User, I see that you are coming from IP: ${request.ip}`);
	return response;
}

exports.handler = lambdify(helloWorld, [request(), html()]);
```

# Installation

    npm i lambdify

or

    yarn add lambdify
