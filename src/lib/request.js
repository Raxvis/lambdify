const getAuthToken = require('./getters/getAuthToken');
const getBody = require('./getters/getBody');
const getCookie = require('./getters/getCookie');
const getCookies = require('./getters/getCookies');
const getIp = require('./getters/getIp');
const getMethod = require('./getters/getMethod');
const getPath = require('./getters/getPath');
const getPathParams = require('./getters/getPathParams');
const getQueryParams = require('./getters/getQueryParams');
const getS3 = require('./getters/getS3');
const getSns = require('./getters/getSns');
const getSqs = require('./getters/getSqs');
const getUa = require('./getters/getUa');

module.exports = (event, context) => {
	const data = {};

	return {
		get: (name) => data[name],
		getAuthToken: () => getAuthToken(event),
		getBody: () => getBody(event),
		getContext: () => context,
		getCookie: (name) => getCookie(event, name),
		getCookies: () => getCookies(event),
		getEvent: () => event,
		getHeader: (name) => event.headers[name],
		getHeaders: () => event.headers,
		getIp: () => getIp(event),
		getMethod: () => getMethod(event),
		getPath: () => getPath(event),
		getPathParams: () => getPathParams(event),
		getQueryParams: () => getQueryParams(event),
		getS3: () => getS3(event),
		getSns: () => getSns(event),
		getSqs: () => getSqs(event),
		getUa: () => getUa(event),
		set: (name, value) => {
			data[name] = value;
		},
	};
};
