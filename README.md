# lambdify

[![npm pack age](https://nodei.co/npm/lambdify.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/lambdify)

[![Version](https://badge.fury.io/js/lambdify.svg)](https://npmjs.org/package/lambdify) [![Build Status](https://travis-ci.org/Prefinem/lambdify.svg)](https://travis-ci.org/Prefinem/lambdify)

[![Maintainability](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/maintainability)](https://codeclimate.com/github/Prefinem/lambdify/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/4f911850391938e811f1/test_coverage)](https://codeclimate.com/github/Prefinem/lambdify/test_coverage) [![Greenkeeper badge](https://badges.greenkeeper.io/Prefinem/lambdify.svg)](https://greenkeeper.io/)

![Weekly Downloads](https://img.shields.io/npm/dw/lambdify.svg) ![Monthly Downloads](https://img.shields.io/npm/dm/lambdify.svg) ![Yearly Downloads](https://img.shields.io/npm/dy/lambdify.svg)

![Issues](https://img.shields.io/github/issues/Prefinem/lambdify.svg) ![Pull Requests](https://img.shields.io/github/issues-pr/Prefinem/lambdify.svg)

![Dependencies](https://david-dm.org/Prefinem/lambdify.svg) ![Dev Dependencies](https://david-dm.org/Prefinem/lambdify/dev-status.svg)

Lambdify is a set of tools that makes building and consuming AWS Lambda functions easier.

# NOTICE

** Master branch is v4 in progress. v4 will be dropping lambdify-fn and lambdify-utils and moving to a single package. **

If you used methods from lambdify-fn, you can use [afpf](https://github.com/Prefinem/afpf) instead

**_WARNING: Version >= 3.0.0 is for Node 8.10 or greater_**

These docs are awful. If you are interested in using one of the library and need some help, please create an issue and I will work on the docs for that first. Thanks

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
const { run } = require('lambdify');

function helloWorld(request) {
	return 'Hello User, I see that you are coming from IP: ' + request.ip;
}

exports.handler = (event, context) => run(event, context, helloWorld);
```

# Installation

    npm i lambdify

or

    yarn add lambdify

# API Docs

[DOCS](https://github.com/Prefinem/lambdify/blob/master/DOCS.md)
